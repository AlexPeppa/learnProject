import React from 'react';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Nope } from 'store/rickMorty/childs/selectedCharacter';

export const Transition = React.forwardRef(
	(
		props: TransitionProps & {
			children: React.ReactElement<Nope>;
		},
		ref: React.Ref<unknown>,
		// eslint-disable-next-line react/jsx-props-no-spreading
	) => <Slide direction='up' ref={ref} {...props} />,
);
