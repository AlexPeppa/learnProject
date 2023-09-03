import React, { useEffect, useState } from "react";
import styles from "./HobbyGeneration.module.css";
import { User } from "./User/User";
import { Activity } from "./Activity/Activity";
import { Alert, Box, Button, LinearProgress } from "@mui/material";
import { UserData, UserActivity, StatusToggle, LoadingStatus, UserStatistic } from "./models";
import axios from "axios";
import { Statistic } from "./Statistic/Statistic";
import { v4 as uuids4 } from "uuid";

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

  //оставлю здесь как подсказку function sleep(ms: number) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }

  const generateUser = () => {
    setLoadingStatusUser(LoadingStatus.LOADING);
    axios
      .get<{ results: UserData[] }>("https://randomuser.me/api/")
      .then((response) => {
        setLoadingStatusUser(LoadingStatus.SUCCESS);
        setUserInfo(response.data.results[0]);
      })
      .catch((error) => {
        setLoadingStatusUser(LoadingStatus.FAILED);
        console.log(error);
      });
  };

  const generateActivity = () => {
    setLoadingStatusActivity(LoadingStatus.LOADING);
    axios
      .get<UserActivity>("https:www.boredapi.com/api/activity")
      .then((response) => {
        setLoadingStatusActivity(LoadingStatus.SUCCESS);
        setUserActivity(response.data);
      })
      .catch((error) => {
        setLoadingStatusActivity(LoadingStatus.FAILED);
        console.log(error);
      });
  };

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
            <Alert severity="error" style={{ width: "100%", justifyContent: "center" }}>
              {" "}
              Error while User loading{" "}
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
            <Alert severity="error" style={{ width: "100%", justifyContent: "center" }}>
              {" "}
              Error while User loading{" "}
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
            {" "}
            Back{" "}
          </Button>
        </div>
      ) : (
        <div className={styles.showBtn}>
          <Button variant="outlined" onClick={() => setStatisticToggle(StatusToggle.SHOW)}>
            {" "}
            Show statistics{" "}
          </Button>
        </div>
      )}
    </div>
  );
};
