import React, { useEffect, useState } from "react";
import styles from "./HobbyGeneration.module.css";
import { User } from "./User/User";
import { Activity } from "./Activity/Activity";
import { Alert, Box, Button, LinearProgress } from "@mui/material";
import {
  UserData,
  UserActivity,
  StatusToggle,
  LoadingStatus,
  UserStatistic,
  RequestError,
} from "./models";
import axios from "axios";
import { Statistic } from "./Statistic/Statistic";
import { v4 as uuids4 } from "uuid";
import { withAxiosServiceErrorHandling } from "../utils/handle";
import { ErrorDialogs } from "../ErrorDialogs/ErrorDialogs";

export const HobbyGeneration: React.FC = () => {
  const [userState, setUserInfo] = useState<UserData>({
    gender: "",
    name: {
      title: "",
      first: "",
      last: "",
    },
    picture: { medium: "" },
    email: "",
    phone: "",
    location: {
      city: "",
      state: "",
      country: "",
      timezone: {
        offset: "",
      },
    },
  });

  const [userActivityState, setUserActivity] = useState<UserActivity>({
    activity: "",
    price: 0,
    accessibility: 0,
  });

  const [loadingStatusUser, setLoadingStatusUser] = useState<LoadingStatus>(LoadingStatus.LOADING);
  const [loadingStatusActivity, setLoadingStatusActivity] = useState<LoadingStatus>(
    LoadingStatus.LOADING
  );
  const disabled = [
    loadingStatusActivity !== LoadingStatus.SUCCESS || loadingStatusUser !== LoadingStatus.SUCCESS,
  ].every(Boolean);

  const [listOfUsers, setListOfUsers] = useState<UserStatistic[]>([]);
  const [statisticToggle, setStatisticToggle] = useState<StatusToggle>(StatusToggle.HIDE);
  const statisticShow = [statisticToggle === StatusToggle.SHOW].some(Boolean);

  const [error, setError] = useState<RequestError>({});
  const userRequestId = "generateUser";
  const activityRequestId = "generateActivity";

  const saveRequestError = (requestId: string, error: Error) => {
    setError((prevState) => ({
      ...prevState,
      [requestId]: error,
    }));
  };
  const deleteError = (requestId: string) => {
    setError((prevState) => ({
      ...prevState,
      [requestId]: null,
    }));
  };

  const generateUser = () => {
    const getUser = () => {
      return axios.get<{ results: UserData[] }>("https://randomuser.me/api/");
    };
    setLoadingStatusUser(LoadingStatus.LOADING);
    withAxiosServiceErrorHandling(getUser, { requestAttempts: 4 })
      .then((response) => {
        setLoadingStatusUser(LoadingStatus.SUCCESS);
        setUserInfo(response.results[0]);
      })
      .catch((error: Error) => {
        setLoadingStatusUser(LoadingStatus.FAILED);
        saveRequestError(userRequestId, error);
      });
  };

  const generateActivity = () => {
    setLoadingStatusActivity(LoadingStatus.LOADING);
    const getActivity = () => {
      return axios.get<UserActivity>("https:www.boredapi.com/api/activity");
    };
    withAxiosServiceErrorHandling(getActivity, { requestAttempts: 4 })
      .then((response) => {
        setLoadingStatusActivity(LoadingStatus.SUCCESS);
        setUserActivity(response);
      })
      .catch((error: Error) => {
        setLoadingStatusActivity(LoadingStatus.FAILED);
        saveRequestError(activityRequestId, error);
      });
  };
  console.log(error);
  const generateData = () => {
    generateActivity();
    generateUser();
  };

  const saveUserAndGenerateData = () => {
    const userDataForStatistic: UserStatistic = {
      name: `${userState.name.first} ${userState.name.last}`,
      id: uuids4(),
      gender: userState.gender,
      activity: userActivityState.activity,
      accessibility: userActivityState.accessibility,
      price: userActivityState.price,
    };
    setListOfUsers(() => {
      return listOfUsers.concat(userDataForStatistic);
    });
    generateData();
  };

  useEffect(() => {
    generateData();
  }, []);

  const renderUserDataWithLoadingStatusValidation = () => {
    switch (loadingStatusUser) {
      case "LOADING":
        return (
          <div className={styles.spinner}>
            <Box sx={{ width: "90%" }}>
              <LinearProgress color="secondary" />
            </Box>
          </div>
        );
      case "FAILED":
        return (
          <div className={`${styles.errorMessage} ${styles.errorUserMessage}`}>
            <ErrorDialogs
              error={error[userRequestId]}
              deleteError={() => deleteError(userRequestId)}
            />
            <Alert severity="error" style={{ width: "100%", justifyContent: "center" }}>
              Error while User loading
            </Alert>
          </div>
        );
      default:
        return (
          <div>
            <User {...userState} />
          </div>
        );
    }
  };
  const renderUserActivityWithLoadingStatusValidation = () => {
    switch (loadingStatusActivity) {
      case "LOADING":
        return (
          <div className={styles.loadingLine}>
            <Box sx={{ width: "90%" }}>
              <LinearProgress color="secondary" />
            </Box>
          </div>
        );
      case "FAILED":
        return (
          <div className={`${styles.errorMessage} ${styles.errorActivityMessage} `}>
            <ErrorDialogs
              error={error[activityRequestId]}
              deleteError={() => deleteError(activityRequestId)}
            />
            <Alert severity="error" style={{ width: "100%", justifyContent: "center" }}>
              Error while Hobby loading
            </Alert>
          </div>
        );
      default:
        return (
          <div>
            <Activity {...userActivityState} />
          </div>
        );
    }
  };
  return (
    <div className={styles.wrapper}>
      {statisticShow ? (
        <Statistic listOfUsers={listOfUsers} />
      ) : (
        <div>
          {renderUserDataWithLoadingStatusValidation()}
          {renderUserActivityWithLoadingStatusValidation()}
          <div className={styles.btn}>
            <div>
              <Button variant="outlined" disabled={disabled} onClick={generateActivity}>
                Generate Hobby
              </Button>
            </div>
            <div>
              <Button variant="outlined" disabled={disabled} onClick={generateData}>
                Generate User and Hobby
              </Button>
            </div>
            <div>
              <Button
                variant="outlined"
                color="success"
                disabled={disabled}
                onClick={saveUserAndGenerateData}
              >
                Access
              </Button>
            </div>
          </div>
        </div>
      )}
      {statisticShow ? (
        <div className={styles.showBtn}>
          <Button variant="outlined" onClick={() => setStatisticToggle(StatusToggle.HIDE)}>
            Back
          </Button>
        </div>
      ) : (
        <div className={styles.showBtn}>
          <Button variant="outlined" onClick={() => setStatisticToggle(StatusToggle.SHOW)}>
            Show statistics
          </Button>
        </div>
      )}
    </div>
  );
};
