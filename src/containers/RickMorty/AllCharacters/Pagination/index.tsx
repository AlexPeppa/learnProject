import React, { FC } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import style from "./pagination.module.css";
import { getAllCharacters, getCurrentPage } from "src/store/rickMorty/childs/characters";
import { AppDispatch, AppStore, selectors } from "src/store";
import { connect } from "react-redux";
import { RickMortyPaginationProps } from "src/models/rickMorty";

const RickMortyPagination: FC<RickMortyPaginationProps> = ({
  countPages,
  currentPage,
  getCharacters,
  getSelectedPage,
}) => {
  return (
    <div className={style.pagination}>
      <Stack spacing={2}>
        <Pagination
          page={currentPage}
          count={countPages}
          defaultPage={currentPage}
          boundaryCount={1}
          color="secondary"
          onChange={(_, num) => {
            getSelectedPage(num);
            getCharacters(num);
          }}
        />
      </Stack>
    </div>
  );
};

const mapStateToProps = (state: AppStore) => ({
  currentPage: selectors.getCurrentPage(state),
  countPages: selectors.getCountPages(state),
});
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getSelectedPage: (page: number) => dispatch(getCurrentPage(page)),
  getCharacters: (page: number) => dispatch(getAllCharacters(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RickMortyPagination);
