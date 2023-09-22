import React, { FC } from "react";
import style from "./allCharacters.module.css";
import RickMortyPagination from "./Pagination/index";
import { Character } from "src/store/rickMorty/childs/characters";
import { AppDispatch } from "src/store";
import { selectCharacterAction } from "src/store/rickMorty/childs/selectedCharacter";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

type Props = DispatchProps & OwnProps;

const AllCharacters: FC<Props> = ({ characters, getSelectedCharacter }) => {
  const selectCharacter = (id: number) => {
    const charactersHashMap = characters.reduce((characters, selectCharacter) => {
      return { ...characters, [selectCharacter.id]: selectCharacter };
    }, {});
    const currentCharacter: Character = charactersHashMap[id];
    getSelectedCharacter(currentCharacter);
  };
  return (
    <div>
      <div className={style.infoWrapper}>
        {characters.map((character) => (
          <div key={character.id} onClick={() => selectCharacter(character.id)}>
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
      <RickMortyPagination />
    </div>
  );
};

type OwnProps = {
  characters: Character[];
};
type DispatchProps = {
  getSelectedCharacter: (character: Character) => void;
};

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  getSelectedCharacter: (character: Character) => dispatch(selectCharacterAction(character)),
});
export default connect<null, DispatchProps, OwnProps>(null, mapDispatchToProps)(AllCharacters);
