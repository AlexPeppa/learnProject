import { Character } from '../../models';

export const createHashMapCharacter = (array: Character[]) =>
  array.reduce((characters: Record<number, Character>, selectCharacter: Character) => {
    characters[selectCharacter.id] = selectCharacter;
    return characters;
  }, {});
