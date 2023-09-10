import React, { FC } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch } from "react-redux";
import style from "./pagination.module.css";
import { RickMortyPaginationProps } from "src/models/rickMorty";

export const RickMortyPagination: FC<RickMortyPaginationProps> = ({
  countPages,
  getCharacters,
}) => {
  return (
    <div className={style.pagination}>
      <Stack spacing={1}>
        <Pagination
          count={countPages}
          color="secondary"
          onChange={(_, num) => {
            getCharacters(num);
          }}
        />
      </Stack>
    </div>
  );
};
