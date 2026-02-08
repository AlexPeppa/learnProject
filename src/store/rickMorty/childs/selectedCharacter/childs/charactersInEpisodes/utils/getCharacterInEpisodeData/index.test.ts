import { AxiosHeaders } from 'axios';
import { getCharacterInEpisode } from '.';

describe('characters in episode', () => {
  test('get characters in episode', () => {
    const response = [
      {
        config: { headers: <AxiosHeaders>{} },
        data: {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' },
          location: {
            name: 'Citadel of Ricks',
            url: 'https://rickandmortyapi.com/api/location/3',
          },
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          episode: ['https://rickandmortyapi.com/api/episode/1'],
          created: '2017-11-04T18:48:46.250Z',
          url: 'https://rickandmortyapi.com/api/character/1',
        },
        headers: <AxiosHeaders>{},
        request: '',
        status: 200,
        statusText: '',
      },
      {
        config: { headers: <AxiosHeaders>{} },
        data: {
          id: 2,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' },
          location: {
            name: 'Citadel of Ricks',
            url: 'https://rickandmortyapi.com/api/location/3',
          },
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          episode: ['https://rickandmortyapi.com/api/episode/1'],
          created: '2017-11-04T18:48:46.250Z',
          url: 'https://rickandmortyapi.com/api/character/1',
        },
        headers: <AxiosHeaders>{},
        request: '',
        status: 200,
        statusText: '',
      },
      {
        config: { headers: <AxiosHeaders>{} },
        data: {
          id: 3,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' },
          location: {
            name: 'Citadel of Ricks',
            url: 'https://rickandmortyapi.com/api/location/3',
          },
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          episode: ['https://rickandmortyapi.com/api/episode/1'],
          created: '2017-11-04T18:48:46.250Z',
          url: 'https://rickandmortyapi.com/api/character/1',
        },
        headers: <AxiosHeaders>{},
        request: '',
        status: 200,
        statusText: '',
      },
    ];
    const result = [
      {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' },
        location: {
          name: 'Citadel of Ricks',
          url: 'https://rickandmortyapi.com/api/location/3',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        episode: ['https://rickandmortyapi.com/api/episode/1'],
        created: '2017-11-04T18:48:46.250Z',
        url: 'https://rickandmortyapi.com/api/character/1',
      },
      {
        id: 2,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' },
        location: {
          name: 'Citadel of Ricks',
          url: 'https://rickandmortyapi.com/api/location/3',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        episode: ['https://rickandmortyapi.com/api/episode/1'],
        created: '2017-11-04T18:48:46.250Z',
        url: 'https://rickandmortyapi.com/api/character/1',
      },
      {
        id: 3,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' },
        location: {
          name: 'Citadel of Ricks',
          url: 'https://rickandmortyapi.com/api/location/3',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        episode: ['https://rickandmortyapi.com/api/episode/1'],
        created: '2017-11-04T18:48:46.250Z',
        url: 'https://rickandmortyapi.com/api/character/1',
      },
    ];
    expect(getCharacterInEpisode(response)).toEqual(result);
  });
});
