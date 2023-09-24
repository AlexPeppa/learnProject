import React, { FC, useEffect } from "react";
import style from "./allCharacters.module.css";
import RickMortyPagination from "./Pagination/index";
import { Character, setCharacterHashMap } from "src/store/rickMorty/childs/characters";
import { AppDispatch, AppStore, selectors } from "src/store";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectCharacterAction } from "src/store/rickMorty/childs/selectedCharacter/childs";

type Props = StateProps & DispatchProps;

const AllCharacters: FC<Props> = ({
  characters,
  characterHashMapState,
  getSelectedCharacter,
  setCharacterHashMap,
}) => {
  useEffect(() => {
    const charactersHashMap = characters.reduce((characters, selectCharacter) => {
      characters[selectCharacter.id] = selectCharacter;
      return characters;
    }, {});
    setCharacterHashMap(charactersHashMap);
  }, []);

  const selectCharacter = (id: number) => {
    const currentCharacter: Character = characterHashMapState[id];
    getSelectedCharacter(currentCharacter);
  };
  return (
    <div>
      <div className={style.infoWrapper}>
        {characters.map((character: Character) => (
          <div key={character.id} onClick={() => selectCharacter(character.id)}>
            <NavLink className={style.textName} to={`/characters/${character.name}`}>
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

type StateProps = {
  characters: Character[];
  characterHashMapState: Record<number, Character>;
};

type DispatchProps = {
  getSelectedCharacter: (character: Character) => void;
  setCharacterHashMap: (charactersHashMap: Record<string, Character>) => void;
};

const mapStateToProps = (state: AppStore): StateProps => ({
  characters: selectors.getAllCharacters(state),
  characterHashMapState: selectors.getCharacterHashMapState(state),
});

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  getSelectedCharacter: (character: Character) => dispatch(selectCharacterAction(character)),
  setCharacterHashMap: (charactersHashMap: Record<string, Character>) =>
    dispatch(setCharacterHashMap(charactersHashMap)),
});
export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(AllCharacters);
