import React, { useEffect, useState } from "react";
import styles from "./HobbyGeneration.module.css";
import { User } from "./User/User";
import { Activity } from "./Activity/Activity";
import { Box, Button, CircularProgress } from "@mui/material";
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
  const [loadingStatusActivity, setLoadingStatusActivity] =
    useState<string>("");
  const loading: boolean = loadingStatusActivity === "LOADING";

  function generateUser() {
    setLoadingStatusData("LOADING");
    axios
      .get<{ results: UserData[] }>("https://randomuser.me/api/")
      .then((response) => {
      
        setLoadingStatusData("SUCCESS");
        setUserInfo(response.data.results[0]);
      })
      .catch((error) => {
        setLoadingStatusData('FAILED')
        console.log(error);
      });
  }

  const generateActivity = () => {
    setLoadingStatusActivity("LOADING");
    axios
      .get<UserActivityData>("https:www.boredapi.com/api/activity")
      .then((response) => {
        setLoadingStatusActivity("SUCCESS");
        setUserActivity(response.data);
      })
      .catch((error)=>{
        setLoadingStatusData('FAILED')
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
    access();
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
        return( 
          <img className={styles.errorPicture} src="https://thumbs.dreamstime.com/b/error-rubber-stamp-word-error-inside-illustration-109026446.jpg"/>
        )
      default:
        return (
          <div>
            <User {...userState} />
            <Activity {...userActivityState} />
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
