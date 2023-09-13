import React, { FC, useEffect } from "react";
import style from "./allCharacters.module.css";
import { ApiRequestStatus } from "src/store/rickMorty/constants";
import { AppDispatch, AppStore, selectors } from "src/store";
import { getAllCharacters } from "src/store/rickMorty/childs/characters";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Preloader } from "../Preloader";
import { RickMortyPagination } from "./Pagination";
import { selectCharacterAction } from "src/store/rickMorty/childs/selectedCharacter";
import { Character } from "src/store/rickMorty/childs/characters/models";
import { AllCharactersProps } from "src/models/rickMorty";

const AllCharacters: FC<AllCharactersProps> = ({
  characters,
  loadingStatus,
  countPages,
  errorText,
  getCharacters,
  getSelectedCharacter,
}) => {
  useEffect(() => {
    getCharacters(1);
  }, []);

  const select = (id: number) => {
    const charactersHashMap = characters.reduce((characters, selectCharacter) => {
      return { ...characters, [selectCharacter.id]: selectCharacter };
    }, {});
    const selectedCharacter: Character = charactersHashMap[id];
    getSelectedCharacter(selectedCharacter);
  };

  return (
    <div>
      {loadingStatus === ApiRequestStatus.Rejected && (
        <div className={style.error}>{errorText}</div>
      )}

      {loadingStatus === ApiRequestStatus.Pending ? (
        <div>
          <Preloader />
        </div>
      ) : (
        <div className={style.infoWrapper}>
          {characters.map((character) => (
            <div key={character.id} onClick={() => select(character.id)}>
              <NavLink className={style.textName} to="/selectedCharacter">
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
                    <img className={style.img} src={character.image} alt="characterPicture" />
                  </div>
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      )}
      <RickMortyPagination countPages={countPages} getCharacters={getCharacters} />
    </div>
  );
};

const mapStateToProps = (state: AppStore) => ({
  characters: selectors.getAllCharacters(state),
  countPages: selectors.getCountPages(state),
  errorText: selectors.getErrorText(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getCharacters: (page: number) => dispatch(getAllCharacters(page)),
  getSelectedCharacter: (character: Character) => dispatch(selectCharacterAction(character)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AllCharacters);
