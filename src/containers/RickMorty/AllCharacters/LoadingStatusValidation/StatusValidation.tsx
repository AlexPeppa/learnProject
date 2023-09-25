import React, { FC, PropsWithChildren } from "react";
import { ApiRequestStatus } from "src/store/rickMorty/constants";
import style from "./statusValidation.module.css";
import { Preloader } from "../../Preloader";

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
        return <Preloader />;
      case ApiRequestStatus.REJECTED:
        return <div className={style.error}>{errorText}</div>;
      case ApiRequestStatus.FULFILLED:
        return <>{children}</>;
    }
  };
  return <>{statusValidation()} </>;
};
