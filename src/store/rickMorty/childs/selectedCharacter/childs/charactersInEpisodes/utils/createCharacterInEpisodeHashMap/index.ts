import { Character } from 'store/rickMorty/childs/characters';

export const createCharacterInEpisodeHashMap = (array: Character[]) =>
  array.reduce((characters, selectCharacter) => {
    characters[selectCharacter.id] = selectCharacter;
    return characters;
  }, {});
