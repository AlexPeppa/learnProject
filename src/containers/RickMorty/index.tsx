import React, { FC } from "react";
import style from "./rick&morty.module.css";
import AllCharacters from "./AllCharacters";
import { AppStore, selectors } from "src/store";
import { connect } from "react-redux";
import { PropsRickMorty } from "src/models/rickMorty";

const RickMorty: FC<PropsRickMorty> = ({ loadingStatus }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.title}>Rick & Morty</div>
      <AllCharacters loadingStatus={loadingStatus} />
    </div>
  );
};
const mapStateToProps = (state: AppStore) => ({
  loadingStatus: selectors.allCharactersLoadingStatus(state),
});

export default connect(mapStateToProps)(RickMorty);
