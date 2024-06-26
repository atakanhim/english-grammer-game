import { MMKV } from 'react-native-mmkv';
import { STORAGE_KEYS } from './storageKeys';
import { Rank } from '@/constants/Enums/GameProgressEnums';
export const storage = new MMKV();


export interface CurrentUserStorage {
  Id: number;
  FullName: string;
  Email: string;    
  GivenName: string;
  FamilyName: string;
  Photo: string;
  TotalScore: number;
  Rank:Rank | null;
}


const defaultCurrentUser: CurrentUserStorage = {
  Id: 0,
  FullName: "",
  Email: "",
  GivenName: "",
  FamilyName: "",
  Photo: "string",
  TotalScore: 0,
  Rank:null
};

export const clearStorage = ()=>{
  storage.clearAll();
}
// Kullanıcı bilgisini depolamak için bir fonksiyon
export const saveCurrentUser = (user: CurrentUserStorage) => {
  storage.set(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
};

// Kullanıcı bilgisini geri yüklemek için bir fonksiyon
export const loadCurrentUser = (): CurrentUserStorage | null => {
  const userData = storage.getString(STORAGE_KEYS.CURRENT_USER);
  if (userData != undefined) {
    return JSON.parse(userData) as CurrentUserStorage;
  }
  return null;
};

// Kullanıcıyı güncelleme ve depolama örneği
export const updateUser = (user: Partial<CurrentUserStorage>) => {
  const currentUser = loadCurrentUser() || defaultCurrentUser;
  const updatedUser = { ...currentUser, ...user };
  saveCurrentUser(updatedUser);
  return updatedUser;
};

// Kullanıcıyı güncelleme ve depolama örneği
export const getUserId = () => {
    const currentUser = loadCurrentUser() || defaultCurrentUser;
    return currentUser.Id 
};


