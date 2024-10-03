import axios from 'axios';
import { UserActivity, UserData } from '../models';

export const api = {
	getActivity: () => axios.get<UserActivity>('https:www.boredapi.com/api/activity'),
	getUser: () => axios.get<{ results: UserData[] }>('https://randomuser.me/api/'),
};
