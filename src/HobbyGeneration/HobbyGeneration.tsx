import React, { useEffect, useState } from "react";
import styles from "./HobbyGeneration.module.css";
import { User } from "./User/User";
import { Activity } from "./Activity/Activity";
import { Box, Button, CircularProgress } from "@mui/material";
import { UserData, UserActivityData } from "./models";
import axios from "axios";

export const HobbyGeneration: React.FC = () => {
  const [userState, setUserInfo] = useState<UserData>({
    gender: "men",
    name: {
      title: "Mr",
      first: "Punkin",
      last: "John",
    },
    picture: { medium: "string" },
    email: "string.@mail.ru",
    phone: "8933333323",
    location: {
      city: "Kotlin",
      state: "Nebraska",
      country: "USA",
      timezone: {
        offset: "+ 4/00",
      },
    },
  });

  const [userActivityState, setUserActivity] = useState<UserActivityData>({
    activity: "Swim",
    price: 0.05,
    accessibility: 0.05,
  });

  const [loadingStatusData, setLoadingStatusData] = useState<string>("");
  const [loadingStatusActivity, setLoadingStatusActivity] =
    useState<string>("");
  const loading: boolean = loadingStatusActivity === "LOADING";

  function generateUser() {
    setLoadingStatusData("LOADING");
    axios
      .get<{ results: UserData[] }>("https://randomuser.me/api/")
      .then((response) => {
        // throw new Error()
        setLoadingStatusData("");
        setUserInfo(response.data.results[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const generateActivity = () => {
    setLoadingStatusActivity("LOADING");
    axios
      .get<UserActivityData>("https:www.boredapi.com/api/activity")
      .then((response) => {
        setLoadingStatusActivity("");
        setUserActivity(response.data);
      })
      .catch((error)=>{
        console.log(error)
      })
  };

  const generateData = () => {
    generateActivity();
  };

  const access = () => {
    generateActivity();
    generateUser();
  };

  useEffect(() => {
    generateData();
  }, []);

  const renderUserDataWithLoadingStatusValidation = () => {
    switch (loadingStatusData) {
      case "LOADING":
        return (
          <div className={styles.spinner}>
            <Box component="span"sx={{width: "200px",height: "200px",display: "flex",justifyContent: "center",alignItems: "center",}}>
              <CircularProgress sx={{ color: "#efafaff5" }} />
            </Box>
          </div>
        );
      case "FAILED":
        return "Picture Failed";
      default:
        return (
          <div>
            <User user={userState} />
            <Activity activity={userActivityState} />
          </div>
        );
    }
  };
  return (
    <div className={styles.wrapper}>
      {renderUserDataWithLoadingStatusValidation()}
      <div className={styles.btn}>
        <div>
          <Button variant="outlined" disabled={loading} onClick={generateData}> Generate</Button>
        </div>
        <div>
          <Button variant="outlined" disabled={loading} onClick={access}>Access</Button>
        </div>
      </div>
    </div>
  );
};
