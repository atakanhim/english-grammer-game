import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
// // import { GoogleSignin } from "@react-native-google-signin/google-signin";
const TOKEN_KEY = process.env.EXPO_PUBLIC_TOKEN_KEY ?? " ";
const API_URL = process.env.EXPO_PUBLIC_API_URL ?? " ";

const AuthContext = createContext<Partial<AuthProps>>({});



interface AuthProps {
    authState: {
        accessToken: string | null;
        refreshToken: string | null;
        authenticated: boolean | null;
    };
    loading?: boolean;
    setLoadingScreen?: React.Dispatch<React.SetStateAction<boolean>>
    onGoogleLogin?: () => Promise<any>;
    onLogout?: () => Promise<any>;
}

// AuthProvider bileşeni ile context için bir value sağlıyoruz ve çocuk bileşenleri sarmalıyoruz
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [authState, setAuthState] = useState<{
        accessToken: string | null;
        refreshToken: string | null;
        authenticated: boolean | null;
    }>({
        accessToken: null,
        refreshToken: null,
        authenticated: null,
    });
    const [loading, setLoadingScreen] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setAuthState({
                accessToken: "",
                authenticated: true,
                refreshToken: ""
            })
        }, 1000);
    }, []);




    const onGoogleLogin = async () => {

        try {

            setAuthState((prev) => {
                return { ...prev, authenticated: true }
            });


        } catch (e) {
            console.log(e);
        }
    };

    const onLogout = async () => {
        // Kullanıcı çıkış işlemleri...
        console.log("gule gule");
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        setAuthState({
            accessToken: null,
            refreshToken: null,
            authenticated: false,
        });


        //google ile girdiyse -
        // const isSignedIn = await GoogleSignin.isSignedIn();
        // if (isSignedIn) {
        //   GoogleSignin.revokeAccess();
        //   GoogleSignin.signOut();
        // }
        console.log("gule 2gule");
    };

    return (
        <AuthContext.Provider
            value={{ authState, onLogout, onGoogleLogin, setLoadingScreen, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Kendi custom hook'umuzu oluşturuyoruz
export const useAuth = () => useContext(AuthContext);