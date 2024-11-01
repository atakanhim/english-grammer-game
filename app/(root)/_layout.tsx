import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, Tabs, useRouter, Redirect, useSegments, SplashScreen } from "expo-router";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "@/contexts/AuthProvider";
import LoadingScreen from "../../components/LoadingScreen";
import { useFonts } from "expo-font";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

const Layout = () => {
    const { authState } = useAuth();
    const [appReady, setAppReady] = useState(false)
    const [onAnimationFinish, setOnAnimationFinish] = useState(false)
    const [loaded, error] = useFonts({
        SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded && (authState?.authenticated === true || authState?.authenticated === false)) {
            SplashScreen.hideAsync();
            setAppReady(true);
        }
    }, [loaded, authState]);

    /*
    if (!onAnimationFinish) {
        return <LoadingScreen appReady={appReady} setOnAnimationFinish={setOnAnimationFinish} />;
    }

    */
    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    // useEffect(() => {
    //     if (authState?.authenticated == true) {
    //         router.replace("/")
    //     }
    // }, [authState])
    return (
        // <Stack initialRouteName="(unauthenticated)" >
        //     <Stack.Screen redirect={authState?.authenticated !== true} name="(authenticated)" options={{ headerShown: false, animation: "flip" }} />
        //     <Stack.Screen name="(unauthenticated)" options={{ headerShown: false, animation: "flip" }} />
        // </Stack>   
        <Tabs
            initialRouteName='(homepage)'
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: 'light',
                headerShown: true,
                tabBarIcon: ({ color, size }) => {
                    if (route.name === 'profile') {
                        return <FontAwesome name="user" size={size} color={color} />;
                    } else if (route.name === '(homepage)') {
                        return <FontAwesome name="home" size={size} color={color} />;
                    } else if (route.name === 'settings') {
                        return <FontAwesome name="cog" size={size} color={color} />;
                    }
                    return <FontAwesome name={"close"} size={size} color={color} />;
                },
            })}
        >
            <Tabs.Screen
                name="profile"
                options={{
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="(homepage)"
                options={{
                    headerShown: false,
                    title: "Home",
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    headerShown: false
                }}
            />
        </Tabs>


    );
};

export default Layout;