import React, { FC } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import style from "./pagination.module.css";
import { getAllCharacters, setCurrentPage } from "src/store/rickMorty/childs/characters";
import { AppDispatch, AppStore, selectors } from "src/store";
import { connect } from "react-redux";

type Props = StateProps & DispatchProps;

const RickMortyPagination: FC<Props> = ({
  countPages,
  currentPage,
  getCharacters,
  setSelectedPage,
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
            setSelectedPage(num);
            getCharacters(num);
          }}
        />
      </Stack>
    </div>
  );
};

type StateProps = {
  countPages: number;
  currentPage: number;
};

type DispatchProps = {
  getCharacters: (page: number) => void;
  setSelectedPage: (page: number) => void;
};

const mapStateToProps = (state: AppStore): StateProps => ({
  currentPage: selectors.getCurrentPage(state),
  countPages: selectors.getCountPages(state),
});
const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  setSelectedPage: (page: number) => dispatch(setCurrentPage(page)),
  getCharacters: (page: number) => dispatch(getAllCharacters(page)),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(RickMortyPagination);
