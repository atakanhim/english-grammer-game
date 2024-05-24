import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { CurrentUserStorage, loadCurrentUser, storage } from "@/storage/storage";
import { useAuth } from "./AuthProvider";

interface CurrentUserState extends CurrentUserStorage {
}

const UserContext = createContext<Partial<UserProps>>({});
interface UserProps {
    userState: CurrentUserState
}
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { authState } = useAuth();
    const [userState, setUserState] = useState<CurrentUserState>({
        Id: 0,
        FullName: "",
        Email: "",
        GivenName: "",
        FamilyName: "",
        Photo: "",
        TotalScore: 0,
        Rank: null
    });
    useEffect(() => {
        const bootstrapAsync = async () => {
            try {
                const user = await loadCurrentUser();
                setUserState(user as any);
            } catch (error) {
                console.error("Failed to initialize Google Sign-in:", error);
            }
        };


        if (authState?.authenticated == true) {
            bootstrapAsync();
        }

    }, [authState]);

    return (
        <UserContext.Provider
            value={{ userState }}
        >
            {children}
        </UserContext.Provider>
    );
};

// Kendi custom hook'umuzu oluşturuyoruz
export const useUser = () => useContext(UserContext);
