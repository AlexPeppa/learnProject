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
  id:string;
  gender: string;
  activity: string;
  accessibility: number;
  price: number;
};

export type UserAndActivity = Record<string, UserStatistic>;

export enum StatusToggle {
  hide = "HIDE",
  show = "SHOW",
}
export enum LoadingStatus {
  success = "SUCCESS",
  loading = "LOADING",
  failed = "FAILED",
}

export type Total = {
  accessibilityTotal:number;
  priceTotal:number;
}
