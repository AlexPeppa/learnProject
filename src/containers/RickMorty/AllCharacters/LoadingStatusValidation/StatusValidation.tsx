import React, { FC, PropsWithChildren } from "react";
import { ApiRequestStatus } from "src/store/rickMorty/constants";
import { Preloader } from "../../Preloader/Preloader";
import style from "./statusValidation.module.css";

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
      case ApiRequestStatus.Pending:
        return <Preloader />;
      case ApiRequestStatus.Rejected:
        return <div className={style.error}>{errorText}</div>;
      case ApiRequestStatus.Fulfilled:
        return <>{children}</>;
    }
  };
  return <>{statusValidation()} </>;
};
