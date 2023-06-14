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

export type userAndActivity = {[name:string]:{
    gender:string
    activity:string
    accessibility :number
    price:number
}}



