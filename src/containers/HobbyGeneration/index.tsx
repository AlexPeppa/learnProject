import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, LinearProgress } from '@mui/material';
import { v4 as uuids4 } from 'uuid';
import { withAxiosServiceErrorHandling } from '@utils/withAxiosServiceErrorHandling';
import styles from './HobbyGeneration.module.css';
import { User } from './User';
import { Activity } from './Activity';
import { UserData, UserActivity, StatusToggle, LoadingStatus, UserStatistic } from './models';
import { Statistic } from './Statistic';
import { api } from './api';

export const HobbyGeneration: React.FC = () => {
  const [userState, setUserInfo] = useState<UserData>({
    gender: '',
    name: {
      title: '',
      first: '',
      last: '',
    },
    picture: { medium: '' },
    email: '',
    phone: '',
    location: {
      city: '',
      state: '',
      country: '',
      timezone: {
        offset: '',
      },
    },
  });

  const [userActivityState, setUserActivity] = useState<UserActivity>({
    activity: '',
    price: 0,
    accessibility: 0,
  });

  const [loadingStatusUser, setLoadingStatusUser] = useState<LoadingStatus>(LoadingStatus.LOADING);
  const [loadingStatusActivity, setLoadingStatusActivity] = useState<LoadingStatus>(
    LoadingStatus.LOADING,
  );
  const disabled = [
    loadingStatusActivity !== LoadingStatus.SUCCESS || loadingStatusUser !== LoadingStatus.SUCCESS,
  ].every(Boolean);

  const [listOfUsers, setListOfUsers] = useState<UserStatistic[]>([]);
  const [statisticToggle, setStatisticToggle] = useState<StatusToggle>(StatusToggle.HIDE);
  const statisticShow = [statisticToggle === StatusToggle.SHOW].some(Boolean);

  const generateUser = () => {
    setLoadingStatusUser(LoadingStatus.LOADING);
    withAxiosServiceErrorHandling(api.getUser, { requestAttempts: 4 })
      .then((response) => {
        setLoadingStatusUser(LoadingStatus.SUCCESS);
        setUserInfo(response.results[0]);
      })
      .catch(() => {
        setLoadingStatusUser(LoadingStatus.FAILED);
      });
  };

  const generateActivity = () => {
    setLoadingStatusActivity(LoadingStatus.LOADING);
    withAxiosServiceErrorHandling(api.getActivity, { requestAttempts: 4 })
      .then((response) => {
        setLoadingStatusActivity(LoadingStatus.SUCCESS);
        setUserActivity(response);
      })
      .catch(() => {
        setLoadingStatusActivity(LoadingStatus.FAILED);
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
    setListOfUsers(() => listOfUsers.concat(userDataForStatistic));
    generateData();
  };

  useEffect(() => {
    generateData();
  }, []);

  const { picture, gender, name, phone, email, location } = userState;
  const { activity, price, accessibility } = userActivityState;

  const renderUserDataWithLoadingStatusValidation = () => {
    switch (loadingStatusUser) {
      case 'LOADING':
        return (
          <div className={styles.spinner}>
            <Box sx={{ width: '90%' }}>
              <LinearProgress color='secondary' />
            </Box>
          </div>
        );
      case 'FAILED':
        return (
          <div className={`${styles.errorMessage} ${styles.errorUserMessage}`}>
            <Alert severity='error' style={{ width: '100%', justifyContent: 'center' }}>
              Error while User loading
            </Alert>
          </div>
        );
      default:
        return (
          <div>
            <User
              picture={picture}
              gender={gender}
              name={name}
              phone={phone}
              email={email}
              location={location}
            />
          </div>
        );
    }
  };
  const renderUserActivityWithLoadingStatusValidation = () => {
    switch (loadingStatusActivity) {
      case 'LOADING':
        return (
          <div className={styles.loadingLine}>
            <Box sx={{ width: '90%' }}>
              <LinearProgress color='secondary' />
            </Box>
          </div>
        );
      case 'FAILED':
        return (
          <div className={`${styles.errorMessage} ${styles.errorActivityMessage} `}>
            <Alert severity='error' style={{ width: '100%', justifyContent: 'center' }}>
              Error while Hobby loading
            </Alert>
          </div>
        );
      default:
        return (
          <div>
            <Activity activity={activity} price={price} accessibility={accessibility} />
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
              <Button variant='outlined' disabled={disabled} onClick={generateActivity}>
                Generate Hobby
              </Button>
            </div>
            <div>
              <Button variant='outlined' disabled={disabled} onClick={generateData}>
                Generate User and Hobby
              </Button>
            </div>
            <div>
              <Button
                variant='outlined'
                color='success'
                disabled={disabled}
                onClick={saveUserAndGenerateData}>
                Access
              </Button>
            </div>
          </div>
        </div>
      )}
      {statisticShow ? (
        <div className={styles.showBtn}>
          <Button variant='outlined' onClick={() => setStatisticToggle(StatusToggle.HIDE)}>
            Back
          </Button>
        </div>
      ) : (
        <div className={styles.showBtn}>
          <Button variant='outlined' onClick={() => setStatisticToggle(StatusToggle.SHOW)}>
            Show statistics
          </Button>
        </div>
      )}
    </div>
  );
};
