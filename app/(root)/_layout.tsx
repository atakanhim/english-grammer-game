import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, Tabs, useRouter, Redirect, useSegments, SplashScreen } from "expo-router";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "@/contexts/AuthProvider";
import LoadingScreen from "./LoadingScreen";
import { useFonts } from "expo-font";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

const Layout = () => {
    const router = useRouter();
    const { authState } = useAuth();
    const [appReady, setAppReady] = useState(false)
    const [loaded, error] = useFonts({
        SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });
    useEffect(() => {
        if (error) throw error;
    }, [error]);
    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    // useEffect(() => {
    //     if (authState?.authenticated == true) {
    //         router.replace("/")
    //     }
    // }, [authState])

    useEffect(() => {
        if (loaded && (authState?.authenticated === true || authState?.authenticated === false)) {

            SplashScreen.hideAsync();
            setAppReady(true);
        }
    }, [loaded, authState]);


    if (!appReady) {
        return <LoadingScreen />;
    }

    return (
        <Stack initialRouteName="(unauthenticated)" >
            <Stack.Screen redirect={authState?.authenticated !== true} name="(authenticated)" options={{ headerShown: false, animation: "flip" }} />
            <Stack.Screen name="(unauthenticated)" options={{ headerShown: false, animation: "flip" }} />
        </Stack>
    );
};

export default Layout;