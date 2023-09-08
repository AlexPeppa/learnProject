import React, { FC } from "react";
import style from "./rick&morty.module.css";
import { AllCharacters } from "./AllCharacters";
import { AppDispatch, AppStore, selectors } from "src/store";
import { getAllCharacters } from "src/store/rickMorty/childs/characters/actions";
import { connect } from "react-redux";
import { PropsRickMorty } from "src/models/rickMorty";

const RickMorty: FC<PropsRickMorty> = ({ characters, loadingStatus, getCharacters }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.title}>Rick & Morty</div>
      <AllCharacters
        characters={characters}
        loadingStatus={loadingStatus}
        getCharacters={getCharacters}
      />
    </div>
  );
};
const mapStateToProps = (state: AppStore) => ({
  characters: selectors.getAllCharacters(state),
  loadingStatus: selectors.allCharactersLoadingStatus(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getCharacters: (page: number) => dispatch(getAllCharacters(page)),
});
export default connect(mapStateToProps, mapDispatchToProps)(RickMorty);
