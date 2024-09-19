import webpack, { Configuration, HotModuleReplacementPlugin } from "webpack";
import "webpack-dev-server";
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

interface Env {
  mode: Configuration["mode"];
}
module.exports = (env: Env): Configuration => {
  const mode = env.mode;
  const isProduction = mode === "production";
  const isDevelopment = mode === "development";
  return {
    mode,
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: {
      filename: "[name]_[contenthash:8].js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
      publicPath: "/",
      library: {
        name: "project",
        type: "umd",
      },
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin(),
        "...",
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              "default",
              {
                discardComments: {
                  removeAll: true,
                },
              },
            ],
          },
        }),
      ],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          loader: "ts-loader",
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: true,
              },
            },
            {
              loader: "css-loader",
              options: {
                modules: {
                  namedExport: false,
                  localIdentName: "[path][name]_[local]_[hash:base64:8]",
                },
                esModule: true,
              },
            },
          ],
        },
        {
          test: /\.(jpg|jpeg|png|gif|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[path][name]_[contenthash:8].[ext]",
                outputPath: "assets",
                publicPath: "assets",
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve("public/index.html"),
        favicon: path.resolve("public/roseIcon.jpg"),
      }),
      new webpack.ProgressPlugin(),
      new MiniCssExtractPlugin({
        filename: "css/[name]_[contenthash:8].css",
        chunkFilename: "css/[id]_[contenthash:8].css",
      }),
      new ForkTsCheckerWebpackPlugin(),
      new HotModuleReplacementPlugin(),
    ],
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
      alias: {
        "@store": path.resolve(__dirname, "src/store"),
      },
    },
    devServer: isDevelopment
      ? {
          port: 8080,
          host: "local-ip",
          open: true,
          historyApiFallback: true,
          hot: true,
          devMiddleware: {
            writeToDisk: true,
          },
        }
      : undefined,
    devtool: "inline-source-map",
  };
};
