// types.ts

export type TokenResponse = {
    Token:Token 
  };
 export type Token = {
  AccessToken: string;
  RefreshToken: string;
  Expiration: Date;
 }  
