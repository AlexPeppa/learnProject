import React, { FC } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import style from "./episodeTable.module.css";
import { Episode } from "src/store/rickMorty/childs/selectedCharacter/models";

export interface EpisodeTableProps {
  episodes: Episode[];
}

export const EpisodeTable: FC<EpisodeTableProps> = ({ episodes }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.table}>
        <TableContainer sx={{ bgcolor: "rgba(187, 151, 151, 0.030)" }} component={Paper}>
          <Table sx={{ maxWidth: 800 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell width={"200px"} align="center">
                  <h3>Episode</h3>
                </TableCell>
                <TableCell width={"400px"} align="center">
                  <h3>Data</h3>
                </TableCell>
                <TableCell width={"200px"} align="center">
                  <h3>Created</h3>
                </TableCell>
                <TableCell width={"200px"} align="center">
                  <h3>Characters</h3>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {episodes.map((episode) => (
                <TableRow key={episode.id}>
                  <TableCell align="center">{episode.name}</TableCell>
                  <TableCell align="center">{episode.air_date}</TableCell>
                  <TableCell align="center">{episode.created.slice(0, 10)}</TableCell>
                  <TableCell align="center">
                    <button>Show Character</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
