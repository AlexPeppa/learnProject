import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch } from "react-redux";
import { setPage } from "src/store/rickMorty/childs/characters";
import style from "./pagination.module.css";

export const RickMortyPagination = () => {
  const dispatch = useDispatch();
  return (
    <div className={style.pagination}>
      <Stack spacing={1}>
        <Pagination
          count={42}
          color="secondary"
          onChange={(_, num) => {
            dispatch(setPage(num));
          }}
        />
      </Stack>
    </div>
  );
};
