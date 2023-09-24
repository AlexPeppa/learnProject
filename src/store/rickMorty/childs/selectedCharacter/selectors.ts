import { charactersInEpisodeSelectors, episodeSelectors } from "./childs";
import { selectedCharactersSelectors } from "./childs/selectors";

export const selectedCharactersChildsSelectors = {
  ...selectedCharactersSelectors,
  ...episodeSelectors,
  ...charactersInEpisodeSelectors,
};
