import React, { FC, useEffect } from "react";
import style from "./rick&morty.module.css";
import AllCharacters from "./AllCharacters";
import { AppDispatch, AppStore, selectors } from "src/store";
import { connect } from "react-redux";
import { StatusValidation } from "./AllCharacters/LoadingStatusValidation/StatusValidation";
import { Character, getAllCharacters } from "src/store/rickMorty/childs/characters";
import { ApiRequestStatus } from "src/store/rickMorty/constants";

type Props = StateProps & DispatchProps;

const RickMorty: FC<Props> = ({
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

type StateProps = {
  loadingStatus: ApiRequestStatus;
  errorText: string;
  currentPage: number;
  characters: Character[];
};
type DispatchProps = {
  getCharacters: (page: number) => void;
};

const mapStateToProps = (state: AppStore): StateProps => ({
  loadingStatus: selectors.allCharactersLoadingStatus(state),
  errorText: selectors.getErrorText(state),
  currentPage: selectors.getCurrentPage(state),
  characters: selectors.getAllCharacters(state),
});
const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  getCharacters: (page: number) => dispatch(getAllCharacters(page)),
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(RickMorty);
