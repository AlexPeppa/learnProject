import { charactersSelectors } from "./childs/characters";
import { selectedCharactersChildsSelectors } from "./childs/selectedCharacter";

export const RickMortySelectors = {
  ...charactersSelectors,
  ...selectedCharactersChildsSelectors,
};
