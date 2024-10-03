import React, { FC } from 'react';
import { connect } from 'react-redux';
import { AppDispatch, AppStore, selectors } from '@store/index';
import { Character } from 'store/rickMorty/childs/characters';
import { NavLink } from 'react-router-dom';
import {
	cleanCharacterInEpisodesState,
	selectCharacterAction,
} from '@store/rickMorty/childs/selectedCharacter/childs';
import { Visibility } from '@store/rickMorty/constants';
import style from './charactersInEpisode.module.css';

type StateProps = {
	characters: Record<number, Character>;
};
type DispatchProps = {
	setSelectedCharacter: (character: Character) => void;
	setCharacterInEpisodesState: () => void;
};
type OwnProps = {
	setCharacterInEpisodesVisibility: (visibility: Visibility) => void;
	setEpisodesVisibility: (visibility: Visibility) => void;
};

type Props = StateProps & DispatchProps & OwnProps;

const CharactersInEpisode: FC<Props> = ({
	characters,
	setSelectedCharacter,
	setEpisodesVisibility,
	setCharacterInEpisodesVisibility,
	setCharacterInEpisodesState,
}) => {
	const selectCharacter = (id: number) => {
		setCharacterInEpisodesState();
		setEpisodesVisibility(Visibility.HIDDEN);
		setCharacterInEpisodesVisibility(Visibility.HIDDEN);
		const currentCharacter: Character = characters[id];
		setSelectedCharacter(currentCharacter);
	};
	return (
		<div className={style.charactersInEpisodeWrapper}>
			{Object.values(characters).map((character) => (
				<div
					tabIndex={0}
					role='button'
					className={style.wrapper}
					key={character.id}
					onClick={() => selectCharacter(character.id)}
					onKeyDown={() => selectCharacter(character.id)}
				>
					<NavLink to={`/Characters/${character.name.replaceAll(' ', '_')}`}>
						<img className={style.imgCharacterInEpisode} src={character.image} alt='img' />
					</NavLink>
					<div className={style.name}>{character.name}</div>
				</div>
			))}
		</div>
	);
};

const mapStateToProps = (state: AppStore): StateProps => ({
	characters: selectors.getCharactersInEpisode(state),
});
const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
	setSelectedCharacter: (character: Character) => dispatch(selectCharacterAction(character)),
	setCharacterInEpisodesState: () => dispatch(cleanCharacterInEpisodesState([])),
});

export default connect<StateProps, DispatchProps>(
	mapStateToProps,
	mapDispatchToProps,
)(CharactersInEpisode);
