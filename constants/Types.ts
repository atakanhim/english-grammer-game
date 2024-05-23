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
 export interface GetUserWithIdResponse {
     Id:number;
     Email:string;
     UserName:string;
     GivenName:string;
     FamilyName:string;
     Photo:string;
 }
