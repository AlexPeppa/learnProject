import React, { FC } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AppDispatch, AppStore, selectors } from '@store/index';
import { connect } from 'react-redux';
import { Button } from '@mui/material';
import { getCharactersInEpisodes } from '@rickMorty/childs/selectedCharacter/childs/charactersInEpisodes';
import { Episode } from '@rickMorty/childs/selectedCharacter';
import { Visibility } from '@rickMorty/constants';
import { generateDataTestId } from '@utils/generateDataTestId';
import style from './episodeTable.module.css';

type StateProps = {
  episodes: Episode[];
};
type DispatchProps = {
  getCharactersInEpisode: (charactersLinks: string[]) => void;
};
type OwnProps = {
  setCharacterInEpisodesVisibility: (visibility: Visibility) => void;
};

type Props = StateProps & DispatchProps & OwnProps;

const EpisodeTable: FC<Props> = ({
  episodes,
  getCharactersInEpisode,
  setCharacterInEpisodesVisibility,
}) => (
  <div className={style.wrapper}>
    <div data-testid={generateDataTestId('EpisodeTable', 'table')}>
      <TableContainer sx={{ bgcolor: 'rgba(187, 151, 151, 0.030)' }} component={Paper}>
        <Table sx={{ maxWidth: 800 }} size='small' aria-label='a dense table'>
          <TableHead>
            <TableRow>
              <TableCell
                data-testid={generateDataTestId('EpisodeTable', 'episode')}
                width='200px'
                align='center'>
                <h3>Episode</h3>
              </TableCell>
              <TableCell width='400px' align='center'>
                <h3>Data</h3>
              </TableCell>
              <TableCell width='200px' align='center'>
                <h3>Created</h3>
              </TableCell>
              <TableCell width='200px' align='center'>
                <h3>Characters</h3>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {episodes.map((episode) => (
              <TableRow key={episode.id}>
                <TableCell
                  data-testid={generateDataTestId('EpisodeTable', 'tableCell', `${episode.name}`)}
                  align='center'>
                  {episode.name}
                </TableCell>
                <TableCell align='center'>{episode.air_date}</TableCell>
                <TableCell align='center'>{episode.created.slice(0, 10)}</TableCell>
                <TableCell align='center'>
                  <Button
                    data-testid={generateDataTestId(
                      'EpisodeTable',
                      'showCharactersBtn',
                      `${episode.id}`,
                    )}
                    size='small'
                    color='secondary'
                    onClick={() => {
                      setCharacterInEpisodesVisibility(Visibility.VISIBLE);
                      getCharactersInEpisode(episode.characters);
                    }}>
                    Show Characters
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  </div>
);

const mapStateToProps = (state: AppStore): StateProps => ({
  episodes: selectors.getEpisode(state),
});
const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  getCharactersInEpisode: (charactersLinks: string[]) =>
    dispatch(getCharactersInEpisodes(charactersLinks)),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(EpisodeTable);
