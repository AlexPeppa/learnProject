import { charactersInEpisodeSelectors } from "./childs/selectedCharacter/charactersInEpisodes/selectors";
import { episodeSelectors } from "./childs/selectedCharacter/episodes/selectors";
import { charactersSelectors } from "./childs/characters";
import { selectedCharactersSelectors } from "./childs/selectedCharacter";

export const RickMortySelectors = {
  ...charactersSelectors,
  ...selectedCharactersSelectors,
  ...episodeSelectors,
  ...charactersInEpisodeSelectors,
};
