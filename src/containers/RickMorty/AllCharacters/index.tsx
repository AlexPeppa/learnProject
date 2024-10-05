import React, { FC } from 'react';
import { Character } from '@store/rickMorty/childs/characters';
import { AppDispatch, AppStore, selectors } from '@store/index';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectCharacterAction } from '@store/rickMorty/childs/selectedCharacter/childs';
import RickMortyPagination from './Pagination/index';
import style from './allCharacters.module.css';

type StateProps = {
  characters: Record<number, Character>;
};

type DispatchProps = {
  setSelectedCharacter: (character: Character) => void;
};

type OwnProps = {
  searchedCharacter: string;
};

type Props = StateProps & DispatchProps & OwnProps;

const AllCharacters: FC<Props> = ({ characters, setSelectedCharacter, searchedCharacter }) => {
  const selectCharacter = (id: number) => {
    const currentCharacter: Character = characters[id];
    setSelectedCharacter(currentCharacter);
  };

  return (
    <div>
      <div className={style.infoWrapper}>
        {Object.values(characters).map((character: Character) => (
          <div
            tabIndex={0}
            role='button'
            key={character.id}
            onClick={() => selectCharacter(character.id)}
            onKeyDown={() => selectCharacter(character.id)}>
            <NavLink
              className={style.textName}
              to={`/Characters/${character.name.replaceAll(' ', '_')}`}>
              <div className={style.info}>
                <div>
                  <div>
                    Name: <b>{character.name}</b>
                  </div>
                  <div>
                    Gender: <b>{character.gender}</b>
                  </div>
                </div>
                <div>
                  <img className={style.img} src={character.image} alt='characterPicture' />
                </div>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
      <RickMortyPagination searchedCharacter={searchedCharacter} />
    </div>
  );
};

const mapStateToProps = (state: AppStore): StateProps => ({
  characters: selectors.getAllCharacters(state),
});

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  setSelectedCharacter: (character: Character) => dispatch(selectCharacterAction(character)),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(AllCharacters);
