import React, { FC } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import style from "./pagination.module.css";
import { getAllCharacters, setCurrentPage } from "src/store/rickMorty/childs/characters";
import { AppDispatch, AppStore, selectors } from "src/store";
import { connect } from "react-redux";

type Props = StateProps & DispatchProps & OwnProps;

const RickMortyPagination: FC<Props> = ({
  countPages,
  currentPage,
  getCharacters,
  setSelectedPage,
  searchedCharacter,
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
            getCharacters({ page: num, name: searchedCharacter });
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
  getCharacters: ({ page, name }: { page: number; name: string }) => void;
  setSelectedPage: (page: number) => void;
};

type OwnProps = {
  searchedCharacter: string;
};

const mapStateToProps = (state: AppStore): StateProps => ({
  currentPage: selectors.getCurrentPage(state),
  countPages: selectors.getCountPages(state),
});
const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  setSelectedPage: (page: number) => dispatch(setCurrentPage(page)),
  getCharacters: ({ page, name }: { page: number; name: string }) =>
    dispatch(getAllCharacters({ page, name })),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(RickMortyPagination);
