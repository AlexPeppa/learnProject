import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { AppDispatch, AppStore, selectors } from "src/store";
import style from "./selectedCharacter.module.css";
import { Button } from "@mui/material";
import { StatusValidation } from "../LoadingStatusValidation/StatusValidation";
import { ApiRequestStatus, Visibility } from "src/store/rickMorty/constants";
import { getEpisodes } from "src/store/rickMorty/childs/selectedCharacter/childs/episodes";
import CharactersInEpisode from "./CharactersInEpisode";
import EpisodeTable from "./EpisodeTable";
import { Character } from "src/store/rickMorty/childs/characters";

type Props = StateProps & DispatchProps;

const SelectedCharacter: FC<Props> = ({
  character,
  loadingStatusEpisodes,
  loadingStatusCharacterInEpisode,
  errorText,
  getEpisode,
}) => {
  const [episodesVisibility, setEpisodesVisibility] = useState(Visibility.Hidden);
  const [characterInEpisodesVisibility, setCharacterInEpisodesVisibility] = useState(
    Visibility.Hidden
  );

  return (
    <div className={style.wrapper}>
      <div className={style.infoTextName}>
        <b>{character.name}</b>
      </div>
      <div className={style.info}>
        <div>
          <img className={style.infoImg} src={character.image} alt="" />
        </div>
        <div className={style.infoBox}>
          <div>
            Gender:<b>{character.gender}</b>
          </div>
          <div>
            Status:<b>{character.status}</b>
          </div>
          <div>
            Species:<b>{character.species}</b>
          </div>
          <div>
            Type:<b>{character.type === "" ? "unknown" : character.type}</b>
          </div>
          <div>
            Origin name:<b> {character.origin.name}</b>
          </div>
          <div>
            Location name:<b>{character.location.name}</b>
          </div>
          <div className={style.showEpisodesBtn}>
            <Button
              size="medium"
              color="secondary"
              onClick={() => {
                setEpisodesVisibility(Visibility.Visible);
                getEpisode(character.episode);
              }}
              disabled={episodesVisibility === Visibility.Visible}
            >
              Show episodes
            </Button>
          </div>
        </div>
      </div>
      <div className={style.episodeWrapper}>
        <div className={style.episodeBox} style={{ visibility: episodesVisibility }}>
          <StatusValidation loadingStatus={loadingStatusEpisodes} errorText={errorText}>
            <EpisodeTable setCharacterInEpisodesVisibility={setCharacterInEpisodesVisibility} />
          </StatusValidation>
        </div>
        <div
          className={style.charactersInEpisodeWrapper}
          style={{ visibility: characterInEpisodesVisibility }}
        >
          <StatusValidation loadingStatus={loadingStatusCharacterInEpisode} errorText={errorText}>
            <CharactersInEpisode />
          </StatusValidation>
        </div>
      </div>
    </div>
  );
};

type StateProps = {
  character: Character;
  loadingStatusEpisodes: ApiRequestStatus;
  loadingStatusCharacterInEpisode: ApiRequestStatus;
  errorText: string;
};
type DispatchProps = {
  getEpisode: (episodes: string[]) => void;
};

const mapStateToProps = (state: AppStore): StateProps => ({
  character: selectors.getCharacter(state),
  loadingStatusEpisodes: selectors.getLoadingStatusEpisodes(state),
  loadingStatusCharacterInEpisode: selectors.getLoadingStatusCharacterInEpisodes(state),
  errorText: selectors.getErrorTextEpisodes(state),
});
const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  getEpisode: (episodes: string[]) => dispatch(getEpisodes(episodes)),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(SelectedCharacter);
