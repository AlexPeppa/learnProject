import React, { useEffect, useState } from "react";
import styles from "./HobbyGeneration.module.css";
import { User } from "./User/User";
import { Activity } from "./Activity/Activity";
import { Alert, Box, Button, LinearProgress } from "@mui/material";
import { UserData, UserActivity, userAndActivity } from "./models";
import axios from "axios";
import { Statistic } from "./Statistic/Statistic";

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

 


  const [loadingStatusUser, setLoadingStatusUser] = useState<string>("LOADING");
  const [loadingStatusActivity, setLoadingStatusActivity] =useState<string>("LOADING");
  const disabled: boolean = (loadingStatusActivity !== "SUCCESS") || (loadingStatusUser !== "SUCCESS")

  const [listOfUsers,setListOfUsers] = useState<userAndActivity[]>([])
  const [statisticToggle, setStatisticToggle] = useState<string>('HIDE')
  const statisticShow: boolean =  (statisticToggle === 'SHOW')


  //оставлю здесь как подсказку function sleep(ms: number) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }
  const userDataForStatistic:userAndActivity = {[`${userState.name.first} ${userState.name.last}`]:{
    gender: userState.gender,
    activity: userActivityState.activity,
    accessibility: userActivityState.accessibility,
    price: userActivityState.price
}}

  const generateUser = () => {
    setLoadingStatusUser("LOADING");
        axios.get<{ results: UserData[] }>("https://randomuser.me/api/")
      .then((response) => {
        setLoadingStatusUser("SUCCESS");
        setUserInfo(response.data.results[0]);
      })
      .catch((error) => {
        setLoadingStatusUser("FAILED");
        console.log(error);
      });
  }

  const generateActivity = () => {
    setLoadingStatusActivity("LOADING")
    axios
      .get<UserActivity>("https:www.boredapi.com/api/activity")
      .then((response) => {
        setLoadingStatusActivity("SUCCESS");
        setUserActivity(response.data);
      })
      .catch((error) => {
        setLoadingStatusActivity("FAILED");
        console.log(error);
      });
  
  };

  const generateData = () => {
    generateActivity();
    generateUser();
    setListOfUsers([...listOfUsers ,userDataForStatistic])
  };

  useEffect(() => {
    generateData();
  }, []);

  const renderUserDataWithLoadingStatusValidation = () => {
    switch (loadingStatusUser) {
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
      { statisticShow ? <Statistic  listOfUsers = {listOfUsers} /> : ( 
        <div>
      {renderUserDataWithLoadingStatusValidation()}
      {renderUserActivityWithLoadingStatusValidation()}
      <div className={styles.btn}>
        <div>
          <Button variant="outlined" disabled={disabled} onClick={generateActivity}>Generate</Button>
        </div>
        <div>
          <Button variant="outlined" disabled={disabled} onClick={generateData}>Access</Button>
        </div>
      </div>
      </div>)}
      { statisticShow ?  
        <div className={styles.showBtn}>
          <Button variant="outlined"  onClick={()=> setStatisticToggle('HIDE')}> Back </Button>
        </div>:
        <div className={styles.showBtn}>
          <Button variant="outlined" onClick={()=> setStatisticToggle('SHOW')}> Show statistics  </Button>
        </div>}
    </div>
  );
};


