import webpack, { Configuration } from "webpack";
import "webpack-dev-server";
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";

const mode = (process.env.mode as Configuration["mode"]) || "development";

const config: Configuration = {
  mode,
  entry: path.resolve(__dirname, "src", "index.tsx"),
  output: {
    filename: "[name][contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "auto",
    library: {
      name: "project",
      type: "umd",
    },
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          getCustomTransformers: () => ({
            before: [ReactRefreshTypeScript()],
          }),
        },
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
              name: "[path][name][contenthash].[ext]",
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
      filename: "css/[name][contenthash].css",
      chunkFilename: "css/[id][contenthash].css",
    }),
    new ForkTsCheckerWebpackPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    alias: {
      src: path.resolve(__dirname, "src/"),
      store: path.resolve(__dirname, "src/store/"),
    },
  },
  devServer: {
    port: 8080,
    host: "0.0.0.0",
    open: true,
    historyApiFallback: true,
    hot: true,
  },
  devtool: "inline-source-map",
};
module.exports = config;
