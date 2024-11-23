import React, { FC, PropsWithChildren } from 'react';
import { ApiRequestStatus } from '@store/rickMorty/constants';
import { generateDataTestId } from '@utils/generateDataTestId';
import style from './statusValidation.module.css';
import { Preloader } from '../../Preloader';

type OwnProps = {
  loadingStatus: ApiRequestStatus;
  errorText: string;
};

export const StatusValidation: FC<PropsWithChildren<OwnProps>> = ({
  children,
  loadingStatus,
  errorText,
}) => {
  const statusValidation = () => {
    switch (loadingStatus) {
      case ApiRequestStatus.PENDING:
        return <Preloader data-testid={generateDataTestId('RickMorty', 'preloader')} />;
      case ApiRequestStatus.REJECTED:
        return <div className={style.error}>{errorText}</div>;
      case ApiRequestStatus.FULFILLED:
        return <div>{children}</div>;
      default:
        return <div />;
    }
  };
  return <>{statusValidation()}</>;
};
