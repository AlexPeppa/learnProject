import React, { FC, useEffect } from "react";
import style from "./rick&morty.module.css";
import { AllCharacters } from "./AllCharacters";
import { AppDispatch, AppStore, selectors } from "src/store";
import { connect } from "react-redux";
import { RickMortyProps } from "src/models/rickMorty";
import { StatusValidation } from "./AllCharacters/LoadingStatusValidation/StatusValidation";
import { getAllCharacters } from "src/store/rickMorty/childs/characters";

const RickMorty: FC<RickMortyProps> = ({
  loadingStatus,
  errorText,
  currentPage,
  characters,
  getCharacters,
}) => {
  useEffect(() => {
    getCharacters(currentPage);
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.title}>Rick & Morty</div>
      <StatusValidation loadingStatus={loadingStatus} errorText={errorText}>
        <AllCharacters characters={characters} />
      </StatusValidation>
    </div>
  );
};

const mapStateToProps = (state: AppStore) => ({
  loadingStatus: selectors.allCharactersLoadingStatus(state),
  errorText: selectors.getErrorText(state),
  currentPage: selectors.getCurrentPage(state),
  characters: selectors.getAllCharacters(state),
});
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getCharacters: (page: number) => dispatch(getAllCharacters(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RickMorty);
