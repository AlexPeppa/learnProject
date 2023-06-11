import React, { useEffect, useState } from "react";
import styles from "./HobbyGeneration.module.css";
import { User } from "./User/User";
import { Activity } from "./Activity/Activity";
import { Alert, Box, Button, CircularProgress, LinearProgress } from "@mui/material";
import { UserData, UserActivityData } from "./models";
import axios from "axios";

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

  const [userActivityState, setUserActivity] = useState<UserActivityData>({
    activity: "",
    price: 0,
    accessibility: 0,
  });

  const [loadingStatusData, setLoadingStatusData] = useState<string>("LOADING");
  const [loadingStatusActivity, setLoadingStatusActivity] =useState<string>("LOADING");
  const loading: boolean = loadingStatusActivity === "LOADING";

  //оставлю здесь как подсказку function sleep(ms: number) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }

  function generateUser() {
    setLoadingStatusData("LOADING");
        axios.get<{ results: UserData[] }>("https://randomuser.me/api/")
      .then((response) => {
        setLoadingStatusData("SUCCESS");
        setUserInfo(response.data.results[0]);
      })

      .catch((error) => {
        setLoadingStatusData("FAILED");
        console.log(error);
      });
  }

  const generateActivity = () => {
    setLoadingStatusActivity("LOADING")
    axios
      .get<UserActivityData>("https:www.boredapi.com/api/activity")
      .then((response) => {
        setLoadingStatusActivity("SUCCESS");
        setUserActivity(response.data);
      })
      .catch((error) => {
        setLoadingStatusActivity("FAILED");
        console.log(error);
      });
  };

  const generateActivityData = () => {
    generateActivity();
  };

  const generateData = () => {
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
            <Box sx={{ width: '90%' }}>
              <LinearProgress color="secondary" />
             </Box>
          </div>
        );
      case "FAILED":
        return (
          <div className={`${styles.errorMessage} ${styles.errorUserMessage}`} >
            <Alert severity="error" style={{width:'100%', justifyContent:'center'}} > Error while User loading  </Alert>
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
         <Box sx={{ width: '90%' }}>
           <LinearProgress color="secondary"/>
         </Box>
          </div>
        );
      case "FAILED":
        return (
          <div className={`${styles.errorMessage} ${styles.errorActivityMessage} `}>
            <Alert severity="error" style={{width:'100%', justifyContent:'center'}}  > Error while User loading  </Alert>
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
      {renderUserDataWithLoadingStatusValidation()}
      {renderUserActivityWithLoadingStatusValidation()}
      <div className={styles.btn}>
        <div>
          <Button variant="outlined"disabled={loading}onClick={generateActivityData}>Generate</Button>
        </div>
        <div>
          <Button variant="outlined" disabled={loading} onClick={generateData}>Access</Button>
        </div>
      </div>
    </div>
  );
};
