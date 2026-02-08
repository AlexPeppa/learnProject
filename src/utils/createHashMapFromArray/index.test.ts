import { arrayToMap } from '.';

const person1 = {
  created: '2017-11-04T18:48:46.250Z',
  episode: ['https://rickandmortyapi.com/api/episode/1'],
  gender: 'Male',
  id: 1,
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
  name: 'Rick Sanchez',
  origin: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' },
  species: 'Human',
  status: 'Alive',
  type: '',
  url: 'https://rickandmortyapi.com/api/character/1',
};
const person2 = {
  created: '2018-11-04T18:48:46.250Z',
  episode: ['https://rickandmortyapi.com/api/episode/2'],
  gender: 'Male',
  id: 2,
  image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/2' },
  name: 'Rick Sanchez',
  origin: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/2' },
  species: 'Human',
  status: 'Alive',
  type: '',
  url: 'https://rickandmortyapi.com/api/character/1',
};
const person3 = {
  created: '2019-11-04T18:48:46.250Z',
  episode: ['https://rickandmortyapi.com/api/episode/3'],
  gender: 'Male',
  id: 3,
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
  name: 'Rick Sanchez',
  origin: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/3' },
  species: 'Human',
  status: 'Alive',
  type: '',
  url: 'https://rickandmortyapi.com/api/character/3',
};

describe('createHashMapCharacter', () => {
  test('should return hashmap', () => {
    const array = [person1, person2, person3];
    const result = {
      [person1.id]: person1,
      [person2.id]: person2,
      [person3.id]: person3,
    };
    expect(arrayToMap(array, 'id')).toEqual(result);
  });
});
