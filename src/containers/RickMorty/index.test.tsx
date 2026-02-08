import React from 'react';
import { ApiRequestStatus } from '@store/rickMorty/constants';
import userEvent from '@testing-library/user-event';
import { renderWithProvider } from '@utils/renderWithProvider';
import { generateDataTestId } from '@utils/generateDataTestId';
import { MemoryRouter, Route, Routes } from 'react-router';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { RickMorty } from '.';
import { AppStore, setupStore } from '../../store';
import { SelectedCharacter } from './AllCharacters/SelectedCharacter';

describe('Rick and Morty', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('should render characters in first render', async () => {
    renderWithProvider(
      <MemoryRouter initialEntries={['/Characters']}>
        <RickMorty />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.queryByTestId(generateDataTestId('RickMorty', 'title'))).toBeInTheDocument();
      expect(
        screen.queryByTestId(generateDataTestId('RickMorty', 'searchInput')),
      ).toBeInTheDocument();
      expect(
        screen.queryByTestId(generateDataTestId('RickMorty', 'preloader')),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId(generateDataTestId('RickMorty', 'allCharacters')),
      ).toBeInTheDocument();
      expect(screen.queryByTestId(generateDataTestId('RickMorty', 'breadcrumb'))).toHaveTextContent(
        'Characters',
      );
    });
  });

  test('should render select character after click', async () => {
    renderWithProvider(
      <MemoryRouter initialEntries={['/Characters']}>
        <Routes>
          <Route path='/Characters' element={<RickMorty />} />
          <Route path='/Characters/:name/' element={<SelectedCharacter />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(
        screen.queryByTestId(generateDataTestId('RickMorty', 'allCharacters', '1')),
      ).toBeInTheDocument();
    });

    act(() => {
      userEvent.click(screen.queryByTestId(generateDataTestId('RickMorty', 'allCharacters', '1')));
    });

    await waitFor(() => {
      expect(
        screen.queryByTestId(generateDataTestId('selectCharacter', 'info')),
      ).toBeInTheDocument();
      expect(
        screen.queryByTestId(generateDataTestId('selectCharacter', 'name')),
      ).toBeInTheDocument();
      expect(
        screen.queryByTestId(generateDataTestId('selectCharacter', 'gender')),
      ).toBeInTheDocument();
      expect(
        screen.queryByTestId(generateDataTestId('selectCharacter', 'status')),
      ).toBeInTheDocument();
      expect(
        screen.queryByTestId(generateDataTestId('selectCharacter', 'showEpisodesBtn')),
      ).toBeInTheDocument();
    });
  });

  test('render select character and show episodes after click', async () => {
    const state: Partial<AppStore> = {
      rickMorty: {
        charactersReducer: {
          characters: {},
          loadingStatus: ApiRequestStatus.FULFILLED,
          countPages: 0,
          errorText: '',
          currentPage: 1,
        },
        selectedCharacterChildsReducer: {
          episodeReducer: {
            episodes: [],
            loadingStatusEpisodes: ApiRequestStatus.PENDING,
            errorText: '',
          },
          charactersInEpisodesReducer: {
            charactersInEpisodes: [],
            loadingStatusCharactersInEpisodes: ApiRequestStatus.PENDING,
            errorText: '',
          },
          selectedCharacterReducer: {
            character: {
              id: 1,
              name: 'Rick Sanchez',
              status: 'Alive',
              species: 'Human',
              type: '',
              gender: 'Male',
              origin: { name: 'Earth (C-137)' },
              location: { name: 'Earth (Replacement Dimension)' },
              image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
              episode: [
                'https://rickandmortyapi.com/api/episode/1',
                'https://rickandmortyapi.com/api/episode/2',
                'https://rickandmortyapi.com/api/episode/3',
              ],
              created: '2017-11-04T18:48:46.250Z',
              url: '',
            },
          },
        },
      },
    };
    const store = setupStore(state);
    renderWithProvider(
      <MemoryRouter initialEntries={['/Characters/Rick_Sanchez']}>
        <SelectedCharacter />
      </MemoryRouter>,
      { store },
    );

    await waitFor(() => {
      act(() => {
        fireEvent.click(
          screen.queryByTestId(generateDataTestId('selectCharacter', 'showEpisodesBtn')),
        );
      });
    });

    expect(screen.queryByTestId(generateDataTestId('EpisodeTable', 'table'))).toBeInTheDocument();
    expect(
      screen.queryByTestId(generateDataTestId('EpisodeTable', 'tableCell', 'Pilot')),
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId(generateDataTestId('EpisodeTable', 'tableCell', 'Lawnmower Dog')),
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId(generateDataTestId('EpisodeTable', 'tableCell', 'Anatomy Park')),
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId(generateDataTestId('EpisodeTable', 'showCharactersBtn', '1')),
    ).toBeInTheDocument();
  });

  test('show character in episode after click on selected episode', async () => {
    const state: Partial<AppStore> = {
      rickMorty: {
        charactersReducer: {
          characters: {},
          loadingStatus: ApiRequestStatus.FULFILLED,
          countPages: 0,
          errorText: '',
          currentPage: 1,
        },
        selectedCharacterChildsReducer: {
          episodeReducer: {
            episodes: [],
            loadingStatusEpisodes: ApiRequestStatus.PENDING,
            errorText: '',
          },
          charactersInEpisodesReducer: {
            charactersInEpisodes: [],
            loadingStatusCharactersInEpisodes: ApiRequestStatus.PENDING,
            errorText: '',
          },
          selectedCharacterReducer: {
            character: {
              id: 1,
              name: 'Rick Sanchez',
              status: 'Alive',
              species: 'Human',
              type: '',
              gender: 'Male',
              origin: { name: 'Earth (C-137)' },
              location: { name: 'Earth (Replacement Dimension)' },
              image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
              episode: [
                'https://rickandmortyapi.com/api/episode/1',
                'https://rickandmortyapi.com/api/episode/2',
                'https://rickandmortyapi.com/api/episode/3',
              ],
              created: '2017-11-04T18:48:46.250Z',
              url: '',
            },
          },
        },
      },
    };
    const store = setupStore(state);
    renderWithProvider(
      <MemoryRouter initialEntries={['/Characters/Rick_Sanchez']}>
        <SelectedCharacter />
      </MemoryRouter>,
      { store },
    );

    await waitFor(() => {
      act(() => {
        fireEvent.click(
          screen.queryByTestId(generateDataTestId('selectCharacter', 'showEpisodesBtn')),
        );
      });
    });

    await waitFor(() => {
      act(() => {
        fireEvent.click(
          screen.queryByTestId(generateDataTestId('EpisodeTable', 'showCharactersBtn', '1')),
        );
      });
    });

    expect(
      screen.queryByTestId(generateDataTestId('CharactersInEpisode', 'characters')),
    ).toBeInTheDocument();

    expect(
      screen.queryByTestId(generateDataTestId('CharactersInEpisode', 'selectCharacters', '1')),
    ).toBeInTheDocument();
  });
});
