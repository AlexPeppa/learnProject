import React, { FC } from "react";
import { connect } from "react-redux";
import { AppDispatch, AppStore, selectors } from "src/store";
import { Character } from "src/store/rickMorty/childs/characters";
import style from "./charactersInEpisode.module.css";
import { NavLink } from "react-router-dom";
import { selectCharacterAction } from "src/store/rickMorty/childs/selectedCharacter/childs";
import { Visibility } from "src/store/rickMorty/constants";

type Props = StateProps & DispatchProps & OwnProps;
type OwnProps = {
  setCharacterInEpisodesVisibility: (visibility: Visibility) => void;
  setEpisodesVisibility: (visibility: Visibility) => void;
};

const CharactersInEpisode: FC<Props> = ({
  characters,
  setSelectedCharacter,
  setEpisodesVisibility,
  setCharacterInEpisodesVisibility,
}) => {
  const selectCharacter = (id: number) => {
    setEpisodesVisibility(Visibility.HIDDEN);
    setCharacterInEpisodesVisibility(Visibility.HIDDEN);
    const currentCharacter: Character = characters[id];
    setSelectedCharacter(currentCharacter);
  };
  return (
    <div className={style.charactersInEpisodeWrapper}>
      {Object.values(characters).map((character) => (
        <div
          className={style.wrapper}
          key={character.id}
          onClick={() => selectCharacter(character.id)}
        >
          <NavLink to={`/Characters/${character.name.replaceAll(" ", "_")}`}>
            <img className={style.imgCharacterInEpisode} src={character.image} />
          </NavLink>
          <div className={style.name}>{character.name}</div>
        </div>
      ))}
    </div>
  );
};

type StateProps = {
  characters: Record<number, Character>;
};
type DispatchProps = {
  setSelectedCharacter: (character: Character) => void;
};

const mapStateToProps = (state: AppStore): StateProps => ({
  characters: selectors.getCharactersInEpisode(state),
});
const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  setSelectedCharacter: (character: Character) => dispatch(selectCharacterAction(character)),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(CharactersInEpisode);
