import React, { FC } from "react";
import { connect } from "react-redux";
import { AppStore, selectors } from "src/store";
import { Character } from "src/store/rickMorty/childs/characters";
import style from "./charactersInEpisode.module.css";

type Props = StateProps;
const CharactersInEpisode: FC<Props> = ({ characters }) => {
  return (
    <>
      {characters.map((character) => (
        <div className={style.wrapper} key={character.id}>
          <img className={style.imgCharacterInEpisode} src={character.image} width={"10px"} />
          <div className={style.name}>{character.name}</div>
        </div>
      ))}
    </>
  );
};
type StateProps = {
  characters: Character[];
};
const mapStateToProps = (state: AppStore): StateProps => ({
  characters: selectors.getCharactersInEpisode(state),
});

export default connect<StateProps>(mapStateToProps)(CharactersInEpisode);
