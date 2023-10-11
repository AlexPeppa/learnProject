import React, { FC, useEffect, useState } from "react";
import style from "./rick&morty.module.css";
import AllCharacters from "./AllCharacters";
import { AppDispatch, AppStore, selectors } from "src/store";
import { connect } from "react-redux";
import { StatusValidation } from "./AllCharacters/LoadingStatusValidation";
import { getAllCharacters } from "src/store/rickMorty/childs/characters";
import { ApiRequestStatus } from "src/store/rickMorty/constants";
import { Breadcrumb } from "./BreadCrumbs";
import SearchInput from "./AllCharacters/SearchInput";

type Props = StateProps & DispatchProps;

const RickMorty: FC<Props> = ({ loadingStatus, errorText, currentPage, getCharacters }) => {
  useEffect(() => {
    getCharacters({ page: currentPage, name: "" });
  }, []);

  const [searchedCharacter, setSearchedCharacter] = useState("");

  return (
    <div className={style.wrapper}>
      <Breadcrumb />
      <div className={style.nameSearch}>
        <div className={style.title}>Rick & Morty</div>
        <SearchInput
          setSearchedCharacter={setSearchedCharacter}
          searchedCharacter={searchedCharacter}
          currentPage={currentPage}
          getCharacters={getCharacters}
        />
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
};

const mapStateToProps = (state: AppStore): StateProps => ({
  loadingStatus: selectors.allCharactersLoadingStatus(state),
  errorText: selectors.getErrorText(state),
  currentPage: selectors.getCurrentPage(state),
});
const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  getCharacters: ({ page, name }: { page: number; name: string }) =>
    dispatch(getAllCharacters({ page, name })),
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(RickMorty);
