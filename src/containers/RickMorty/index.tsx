import React, { FC, useEffect, useState } from 'react';
import { AppDispatch, AppStore, selectors } from '@store/index';
import { connect } from 'react-redux';
import { getAllCharacters } from '@store/rickMorty/childs/characters';
import { ApiRequestStatus } from '@store/rickMorty/constants';
import { StatusValidation } from './AllCharacters/LoadingStatusValidation';
import AllCharacters from './AllCharacters';
import style from './rick&morty.module.css';
import { Breadcrumb } from './BreadCrumbs';
import SearchInput from './AllCharacters/SearchInput';

type StateProps = {
  loadingStatus: ApiRequestStatus;
  errorText: string;
  currentPage: number;
};
type DispatchProps = {
  getCharacters: ({ page, name }: { page: number; name: string }) => void;
};
type Props = StateProps & DispatchProps;

const RickMortyComponent: FC<Props> = ({
  loadingStatus,
  errorText,
  currentPage,
  getCharacters,
}) => {
  useEffect(() => {
    getCharacters({ page: currentPage, name: '' });
  }, []);

  const [searchedCharacter, setSearchedCharacter] = useState('');

  return (
    <div className={style.wrapper}>
      <Breadcrumb name='' />
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

const mapStateToProps = (state: AppStore): StateProps => ({
  loadingStatus: selectors.allCharactersLoadingStatus(state),
  errorText: selectors.getErrorText(state),
  currentPage: selectors.getCurrentPage(state),
});
const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  getCharacters: ({ page, name }: { page: number; name: string }) =>
    dispatch(getAllCharacters({ page, name })),
});

export const RickMorty = connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(RickMortyComponent);
