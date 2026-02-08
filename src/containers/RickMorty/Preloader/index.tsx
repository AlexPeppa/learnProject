import { LinearProgress, Stack } from '@mui/material';
import React, { FC } from 'react';
import style from './preloader.module.css';

export const Preloader: FC = () => (
  <div className={style.wrapperPreloader}>
    <Stack spacing={2} sx={{ flex: 1 }}>
      <LinearProgress variant='indeterminate' color='secondary' />
    </Stack>
  </div>
);
