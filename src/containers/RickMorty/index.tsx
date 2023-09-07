import React, { FC } from "react";
import style from "./rick&morty.module.css";
import { AllCharacters } from "./AllCharacters";
import { PropsRickMorty } from "src/store/rickMorty/models";
import { AppDispatch, AppStore, selectors } from "src/store";
import { getAllCharacters } from "src/store/rickMorty/childs/characters/actions";
import { connect } from "react-redux";

const RickMorty: FC<PropsRickMorty> = ({ characters, page, isLoading, error, getCharacters }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.title}>Rick & Morty</div>
      <AllCharacters
        characters={characters}
        page={page}
        isLoading={isLoading}
        error={error}
        getCharacters={getCharacters}
      />
    </div>
  );
};
const mapStateToProps = (state: AppStore) => ({
  characters: selectors.getAllCharacters(state),
  isLoading: selectors.allCharactersLoadingStatus(state),
  error: selectors.allCharactersLoadingStatusError(state),
  page: selectors.getPage(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getCharacters: (page: number) => dispatch(getAllCharacters(page)),
});
export default connect(mapStateToProps, mapDispatchToProps)(RickMorty);
