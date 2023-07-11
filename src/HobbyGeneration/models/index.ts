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

export type UserActivity = {
  activity: string;
  price: number;
  accessibility: number;
};

export type UserStatistic = {
  name:string,
  id:string;
  gender: string;
  activity: string;
  accessibility: number;
  price: number;
};

export enum StatusToggle {
  HIDE = "HIDE",
  SHOW = "SHOW",
}

export enum LoadingStatus {
  SUCCESS = "SUCCESS",
  LOADING = "LOADING",
  FAILED = "FAILED",
}

export type Total  = {
  accessibilityTotal:number ;
  priceTotal:number;
};

