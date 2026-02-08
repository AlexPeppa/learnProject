import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://rickandmortyapi.com/api/character', () =>
    HttpResponse.json({
      info: {
        pages: 42,
        next: 'https://rickandmortyapi.com/api/character?page=2&name=',
      },
      results: [
        {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: {
            name: 'Earth (C-137)',
          },
          location: {
            name: 'Citadel of Ricks',
          },
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          episode: [
            'https://rickandmortyapi.com/api/episode/1',
            'https://rickandmortyapi.com/api/episode/2',
            'https://rickandmortyapi.com/api/episode/3',
          ],
          url: 'https://rickandmortyapi.com/api/character/1',
          created: '2017-11-04T18:48:46.250Z',
        },
        {
          id: 2,
          name: 'Morty Smith',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: {
            name: 'unknown',
          },
          location: {
            name: 'Citadel of Ricks',
          },
          image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
          episode: [
            'https://rickandmortyapi.com/api/episode/1',
            'https://rickandmortyapi.com/api/episode/2',
            'https://rickandmortyapi.com/api/episode/3',
          ],
          url: 'https://rickandmortyapi.com/api/character/2',
          created: '2017-11-04T18:50:21.651Z',
        },
        {
          id: 3,
          name: 'Summer Smith',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Female',
          origin: {
            name: 'Earth (Replacement Dimension)',
          },
          location: {
            name: 'Earth (Replacement Dimension)',
          },
          image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
          episode: [
            'https://rickandmortyapi.com/api/episode/6',
            'https://rickandmortyapi.com/api/episode/7',
            'https://rickandmortyapi.com/api/episode/8',
          ],
          url: 'https://rickandmortyapi.com/api/character/3',
          created: '2017-11-04T19:09:56.428Z',
        },
      ],
    }),
  ),
  http.get('https://rickandmortyapi.com/api/episode/1', () =>
    HttpResponse.json({
      id: 1,
      name: 'Pilot',
      air_date: 'December 2, 2013',
      episode: 'S01E01',
      characters: [
        'https://rickandmortyapi.com/api/character/1',
        'https://rickandmortyapi.com/api/character/2',
      ],
      url: 'https://rickandmortyapi.com/api/episode/1',
      created: '2017-11-10T12:56:33.798Z',
    }),
  ),
  http.get('https://rickandmortyapi.com/api/episode/2', () =>
    HttpResponse.json({
      id: 2,
      name: 'Lawnmower Dog',
      air_date: 'December 9, 2013',
      episode: 'S01E02',
      characters: [
        'https://rickandmortyapi.com/api/character/1',
        'https://rickandmortyapi.com/api/character/2',
        'https://rickandmortyapi.com/api/character/38',
      ],
      url: 'https://rickandmortyapi.com/api/episode/2',
      created: '2017-11-10T12:56:33.916Z',
    }),
  ),
  http.get('https://rickandmortyapi.com/api/episode/3', () =>
    HttpResponse.json({
      id: 3,
      name: 'Anatomy Park',
      air_date: 'December 16, 2013',
      episode: 'S01E03',
      characters: [
        'https://rickandmortyapi.com/api/character/1',
        'https://rickandmortyapi.com/api/character/2',
        'https://rickandmortyapi.com/api/character/12',
      ],
      url: 'https://rickandmortyapi.com/api/episode/3',
      created: '2017-11-10T12:56:34.022Z',
    }),
  ),
  http.get('https://rickandmortyapi.com/api/character/1', () =>
    HttpResponse.json({
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: {
        name: 'Earth (C-137)',
        url: 'https://rickandmortyapi.com/api/location/1',
      },
      location: {
        name: 'Citadel of Ricks',
        url: 'https://rickandmortyapi.com/api/location/3',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      episode: [
        'https://rickandmortyapi.com/api/episode/1',
        'https://rickandmortyapi.com/api/episode/2',
      ],
      url: 'https://rickandmortyapi.com/api/character/1',
      created: '2017-11-04T18:48:46.250Z',
    }),
  ),
  http.get('https://rickandmortyapi.com/api/character/2', () =>
    HttpResponse.json({
      id: 2,
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: {
        name: 'unknown',
        url: '',
      },
      location: {
        name: 'Citadel of Ricks',
        url: 'https://rickandmortyapi.com/api/location/3',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
      episode: [
        'https://rickandmortyapi.com/api/episode/1',
        'https://rickandmortyapi.com/api/episode/2',
      ],
      url: 'https://rickandmortyapi.com/api/character/2',
      created: '2017-11-04T18:50:21.651Z',
    }),
  ),
];
