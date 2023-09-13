import { charactersSelectors } from "./childs/characters";
import { selectedCharactersSelectors } from "./childs/selectedCharacter";

export const RickMortySelectors = {
  ...charactersSelectors,
  ...selectedCharactersSelectors,
};
