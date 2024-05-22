// types.ts

export type TokenResponse = {
    token:Token ;
    id:number;
  };
 export type Token = {
  accessToken: string;
  refreshToken: string;
  expiration: Date;
 }  
