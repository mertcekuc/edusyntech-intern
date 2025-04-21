export interface User{
    id: string;
    name: string;
    subscriptionStatus: string;
    subscriptionToken: string;
    platform: Platform;

}

export enum Platform {
    ANDROID = 1,
    IOS = 2
  }