import React, { FC } from "react";
import { connect } from "react-redux";
import { AppDispatch, AppStore, selectors } from "src/store";
import style from "./selectedCharacter.module.css";
import { getEpisodes } from "src/store/rickMorty/childs/selectedCharacter";
import { SelectedCharacterProps } from "src/models/rickMorty";
import { EpisodeTable } from "./EpisodeTable/EpisodeTable";
import { Button } from "@mui/material";
import { ApiRequestStatus } from "src/store/rickMorty/constants";
import { Preloader } from "../../Preloader";

const SelectedCharacter: FC<SelectedCharacterProps> = ({
  character,
  episodes,
  loadingStatusEpisodes,
  errorText,
  getEpisode,
}) => {
  return (
    <div className={style.wrapper}>
      {loadingStatusEpisodes === ApiRequestStatus.Rejected && (
        <div className={style.error}>{errorText}</div>
      )}
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
            <Button size="medium" color="secondary" onClick={() => getEpisode(character.episode)}>
              Show episodes
            </Button>
          </div>
        </div>
      </div>
      {loadingStatusEpisodes === ApiRequestStatus.Pending ? (
        <div>
          <Preloader />
        </div>
      ) : (
        <div className={style.episodeBox}>
          <EpisodeTable episodes={episodes} />
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state: AppStore) => ({
  character: selectors.getCharacter(state),
  episodes: selectors.getEpisode(state),
  loadingStatusEpisodes: selectors.getLoadingStatusEpisodes(state),
  errorText: selectors.getErrorTextEpisodes(state),
});
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getEpisode: (episodes: string[]) => dispatch(getEpisodes(episodes)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCharacter);
