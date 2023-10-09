import React, { FC, useEffect, useState } from "react";
import style from "./rick&morty.module.css";
import AllCharacters from "./AllCharacters";
import { AppDispatch, AppStore, selectors } from "src/store";
import { connect } from "react-redux";
import { StatusValidation } from "./AllCharacters/LoadingStatusValidation/StatusValidation";
import { getAllCharacters, setCurrentPage } from "src/store/rickMorty/childs/characters";
import { ApiRequestStatus } from "src/store/rickMorty/constants";
import { Breadcrumb } from "./BreadCrumbs";
import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

type Props = StateProps & DispatchProps;

const RickMorty: FC<Props> = ({
  loadingStatus,
  errorText,
  currentPage,
  setSelectedPage,
  getCharacters,
}) => {
  useEffect(() => {
    getCharacters({ page: currentPage, name: "" });
  }, []);

  const [searchedCharacter, setSearchedCharacter] = useState("");

  useEffect(() => {
    if (searchedCharacter.length !== 0) {
      const timerId = setTimeout(() => {
        setSelectedPage((currentPage = 1));
        getCharacters({ page: currentPage, name: searchedCharacter });
      }, 1000);
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [searchedCharacter]);

  const showAllCharacters = () => {
    setSearchedCharacter("");
    setSelectedPage((currentPage = 1));
    getCharacters({ page: currentPage, name: "" });
  };

  return (
    <div className={style.wrapper}>
      <Breadcrumb />
      <div className={style.nameSearch}>
        <div className={style.title}>Rick & Morty</div>
        <Paper
          component="form"
          sx={{
            p: "1px 5px",
            display: "flex",
            alignItems: "center",
            width: 250,
            borderRadius: 3,
          }}
        >
          <InputBase
            onChange={(event) => setSearchedCharacter(event.target.value)}
            value={searchedCharacter}
            sx={{ ml: 2, flex: 1 }}
            placeholder="Search Characters"
          />
          <Divider sx={{ height: 20, m: 0.5 }} orientation="vertical" />
          <IconButton
            onClick={() => showAllCharacters()}
            color="primary"
            sx={{ p: "8px" }}
            aria-label="directions"
          >
            <DeleteForeverOutlinedIcon sx={{ color: "#ff00de" }} />
          </IconButton>
        </Paper>
      </div>
      <StatusValidation loadingStatus={loadingStatus} errorText={errorText}>
        <AllCharacters searchedCharacter={searchedCharacter} />
      </StatusValidation>
    </div>
  );
};

type StateProps = {
  loadingStatus: ApiRequestStatus;
  errorText: string;
  currentPage: number;
};
type DispatchProps = {
  getCharacters: ({ page, name }: { page: number; name: string }) => void;
  setSelectedPage: (page: number) => void;
};

const mapStateToProps = (state: AppStore): StateProps => ({
  loadingStatus: selectors.allCharactersLoadingStatus(state),
  errorText: selectors.getErrorText(state),
  currentPage: selectors.getCurrentPage(state),
});
const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  getCharacters: ({ page, name }: { page: number; name: string }) =>
    dispatch(getAllCharacters({ page, name })),
  setSelectedPage: (page: number) => dispatch(setCurrentPage(page)),
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(RickMorty);
