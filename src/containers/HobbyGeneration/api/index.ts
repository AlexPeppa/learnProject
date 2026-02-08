import axios from 'axios';
import { UserActivity, UserData } from '../models';

export const api = {
  getActivity: () => axios.get<UserActivity>('https://bored-api.appbrewery.com/random'),
  getUser: () => axios.get<{ results: UserData[] }>('https://randomuser.me/api/'),
};
