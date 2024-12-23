import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { TokenResponse, Token, GetUserWithIdResponse } from "@/constants/Types";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { getUserWithId, loginWithGoogle, logout } from "@/services/apiService";
import { clearStorage, getUserId, saveCurrentUser, storage, updateUser } from "@/storage/storage";

const ACC_TOKEN_KEY = process.env.EXPO_PUBLIC_ACCESS_TOKEN_KEY ?? " ";
const REF_TOKEN_KEY = process.env.EXPO_PUBLIC_REFRESH_TOKEN_KEY ?? " ";
const AuthContext = createContext<Partial<AuthProps>>({});
interface AuthState {
    authenticated: boolean | null;
}
interface AuthProps {
    authState: AuthState;
    onGoogleLogin?: () => Promise<any>;
    onLogout?: () => Promise<any>;
}
// AuthProvider bileşeni ile context için bir value sağlıyoruz ve çocuk bileşenleri sarmalıyoruz
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [authState, setAuthState] = useState<AuthState>({
        authenticated: null
    });
    useEffect(() => {
        const bootstrapAsync = async () => {
            let state = false;
            try {

                GoogleSignin.configure({
                    webClientId:
                        "413146979081-5hkrg1lhmta52o39m09d2u93cia0llna.apps.googleusercontent.com"
                });
                // burda kontrol etmem lazım aslında token geçerliliğini ve sunucu şuan ayakta mı erişilebiliyor mu 
                saveCurrentUser(await getUserWithId(getUserId()) as any | null | undefined); // locale attım
                // localde olan user en güncel halini çeliyorum bu sırada hata alırsa zaten false donecek
                //hata almaz ise 
                await SecureStore.getItemAsync(ACC_TOKEN_KEY);
                state = true;
            } catch (error) {

                state = false;
            }
            finally {
                setAuthState({
                    authenticated: state,
                });
            }
        };
        bootstrapAsync();
    }, []);

    const onGoogleLogin = async () => {
        let login = false;
        try {
            await GoogleSignin.hasPlayServices();
            let response = await GoogleSignin.signIn();

            const res: TokenResponse = await loginWithGoogle(response.idToken!);


            login = true;
            await SecureStore.setItemAsync(ACC_TOKEN_KEY, res.token.accessToken);
            await SecureStore.setItemAsync(REF_TOKEN_KEY, res.token.refreshToken);
            let result: GetUserWithIdResponse = await getUserWithId(res.id);
            saveCurrentUser(result as any); // locale attım

        } catch (e) {
            console.log(e + "a");
        }
        finally {
            if (login)
                setAuthState({
                    authenticated: true,
                });
        }
    };
    const onLogout = async () => {
        await logout();
        setAuthState({
            authenticated: false
        });
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
            GoogleSignin.revokeAccess();
            GoogleSignin.signOut();
        }
    };

    return (
        <AuthContext.Provider
            value={{ authState, onLogout, onGoogleLogin }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Kendi custom hook'umuzu oluşturuyoruz
export const useAuth = () => useContext(AuthContext);
