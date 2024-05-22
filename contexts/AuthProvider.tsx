import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { TokenResponse, Token } from "@/constants/Types";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { loginWithGoogle, logout } from "@/services/apiService";

const ACC_TOKEN_KEY = process.env.EXPO_PUBLIC_ACCESS_TOKEN_KEY ?? " ";
const REF_TOKEN_KEY = process.env.EXPO_PUBLIC_REFRESH_TOKEN_KEY ?? " ";
const USER_ID = process.env.EXPO_PUBLIC_USER_ID ?? " ";

const AuthContext = createContext<Partial<AuthProps>>({});
interface AuthProps {
    authState: {
        id: number | null,
        authenticated: boolean | null;
    };
    onGoogleLogin?: () => Promise<any>;
    onLogout?: () => Promise<any>;
}

// AuthProvider bileşeni ile context için bir value sağlıyoruz ve çocuk bileşenleri sarmalıyoruz
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [authState, setAuthState] = useState<{
        authenticated: boolean | null;
        id: number | null;
    }>({
        id: null,
        authenticated: null
    });

    useEffect(() => {
        const bootstrapAsync = async () => {
            try {
                GoogleSignin.configure({
                    webClientId:
                        "413146979081-5hkrg1lhmta52o39m09d2u93cia0llna.apps.googleusercontent.com",
                });
                // AuthState güncelleniyor
                let accToken: string | null = null;
                let refToken: string | null = null;
                let userId: number | null = null;
                try {
                    // Token secure store'dan alınıyor
                    accToken = await SecureStore.getItemAsync(ACC_TOKEN_KEY);
                    refToken = await SecureStore.getItemAsync(REF_TOKEN_KEY);
                    let usid = await SecureStore.getItemAsync(USER_ID)
                    if (usid)
                        userId = parseInt(usid!);

                } catch (e) {
                    console.error(e);
                }
                setAuthState({
                    id: userId ? userId : null,
                    authenticated: !!accToken,
                });
            } catch (error) {
                console.error("Failed to initialize Google Sign-in:", error);
            }
        };
        // Uygulama başladığında token kontrolü yapılıyor
        bootstrapAsync();
    }, []);

    const onGoogleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            let response = await GoogleSignin.signIn();
            if (!response)
                throw Error("google sign in hata");
            const res: TokenResponse = await loginWithGoogle(response.idToken!);
            if (!res)
                throw Error("login with google hata");
            let token: Token = res.token;
            setAuthState({
                id: res.id,
                authenticated: true,
            });
            await SecureStore.setItemAsync(ACC_TOKEN_KEY, token.accessToken);
            await SecureStore.setItemAsync(REF_TOKEN_KEY, token.refreshToken);
            await SecureStore.setItemAsync(USER_ID, res.id.toString());
            // BURADA daha sonra htttp interceptor misali araya girip eger unauthorization hatası alırsak refresh token ile tekrar istek atıcaz
        } catch (e) {
            console.log(e);
        }
    };
    const onLogout = async () => {
        await logout();
        setAuthState({
            id: null,
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
