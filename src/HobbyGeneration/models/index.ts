
export interface UserData {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  picture: { medium: string };
  email: string;
  phone: string;
  location: {
    city: string;
    state: string;
    country: string;
    timezone: {
      offset: string;
    };
  };
}

export type UserActivityData = {
  activity: string;
  price: number;
  accessibility: number;
};

export interface OwnPropsUser {
  user: UserData;
  
}

export interface OwnPropsActivity {
    activity: UserActivityData;
}