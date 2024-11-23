import '@testing-library/jest-dom';
import { renderWithProvider } from '@utils/renderWithProvider';
import React from 'react';
import { generateDataTestId } from '@utils/generateDataTestId';
import { getAllCharacters } from '@rickMorty/childs/characters/actions';
import { MemoryRouter, Route, Routes } from 'react-router';
import { act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RickMorty } from '.';
import { setupStore } from '../../store';
import { SelectedCharacter } from './AllCharacters/SelectedCharacter';

describe('Rick and Morty', () => {
  test('should render after action', async () => {
    const preloadedState = {};
    const store = setupStore(preloadedState);
    const { queryByTestId } = renderWithProvider(
      <MemoryRouter initialEntries={['/Characters']}>
        <Routes>
          <Route path='/Characters/' element={<RickMorty />} />
          <Route path='/Characters/:name/' element={<SelectedCharacter />} />
        </Routes>
      </MemoryRouter>,
      { store },
    );

    expect(queryByTestId(generateDataTestId('RickMorty', 'title'))).toBeInTheDocument();
    expect(queryByTestId(generateDataTestId('RickMorty', 'searchInput'))).toBeInTheDocument();
    expect(queryByTestId(generateDataTestId('RickMorty', 'breadcrumb'))).toBeInTheDocument();
    expect(queryByTestId(generateDataTestId('RickMorty', 'preloader'))).not.toBeInTheDocument();
    expect(queryByTestId(generateDataTestId('RickMorty', 'allCharacters'))).not.toBeInTheDocument();

    await act(() => store.dispatch(getAllCharacters({ page: 1, name: '' })));

    expect(queryByTestId(generateDataTestId('RickMorty', 'allCharacters'))).toBeInTheDocument();
    expect(queryByTestId(generateDataTestId('RickMorty', 'allCharacters', '1'))).toHaveTextContent(
      'Rick Sanchez',
    );
    expect(queryByTestId(generateDataTestId('RickMorty', 'allCharacters', '2'))).toHaveTextContent(
      'Morty Smith',
    );
    expect(queryByTestId(generateDataTestId('RickMorty', 'allCharacters', '3'))).toHaveTextContent(
      'Summer Smith',
    );

    await userEvent.click(queryByTestId(generateDataTestId('RickMorty', 'allCharacters', '2')));

    await waitFor(async () => {
      expect(queryByTestId(generateDataTestId('selectCharacter', 'info'))).toBeInTheDocument();
      expect(queryByTestId(generateDataTestId('selectCharacter', 'name'))).toBeInTheDocument();
      expect(queryByTestId(generateDataTestId('selectCharacter', 'gender'))).toBeInTheDocument();
      expect(queryByTestId(generateDataTestId('selectCharacter', 'status'))).toBeInTheDocument();
    });

    expect(
      queryByTestId(generateDataTestId('selectCharacter', 'showEpisodesBtn')),
    ).toBeInTheDocument();
    await act(() =>
      userEvent.click(queryByTestId(generateDataTestId('selectCharacter', 'showEpisodesBtn'))),
    );

    await waitFor(() => {
      expect(queryByTestId(generateDataTestId('EpisodeTable', 'table'))).toBeInTheDocument();
      expect(queryByTestId(generateDataTestId('EpisodeTable', 'episode'))).toBeInTheDocument();
      expect(queryByTestId(generateDataTestId('EpisodeTable', 'data'))).toBeInTheDocument();
      expect(queryByTestId(generateDataTestId('EpisodeTable', 'created'))).toBeInTheDocument();
      expect(queryByTestId(generateDataTestId('EpisodeTable', 'characters'))).toBeInTheDocument();
      expect(
        queryByTestId(generateDataTestId('EpisodeTable', ' showCharacters', `1`)),
      ).toBeInTheDocument();
    });

    await act(() =>
      userEvent.click(queryByTestId(generateDataTestId('EpisodeTable', ' showCharacters', '1'))),
    );

    await waitFor(() => {
      expect(
        queryByTestId(generateDataTestId('CharactersInEpisode', 'characters')),
      ).toBeInTheDocument();
      expect(
        queryByTestId(generateDataTestId('CharactersInEpisode', 'selectCharacters', '1')),
      ).toBeInTheDocument();
    });

    await act(() =>
      userEvent.click(
        queryByTestId(generateDataTestId('CharactersInEpisode', 'selectCharacters', '92')),
      ),
    );

    expect(queryByTestId(generateDataTestId('selectCharacter', 'name'))).toHaveTextContent('Davin');
  });
});
