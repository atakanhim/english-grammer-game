import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, Tabs, useRouter, Redirect, useSegments } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "@/contexts/AuthProvider";
import LoadingScreen from "./LoadingScreen";

const Layout = () => {
    const router = useRouter();


    const { authState } = useAuth();

    useEffect(() => {
        console.log(authState?.authenticated);

        if (authState?.authenticated == true) {
            router.replace("/")
        }
        else if (authState?.authenticated == false) {
            router.replace("(unauthenticated)")
        }
    }, [authState])

    if (authState?.authenticated === null) {
        return (<LoadingScreen />)
    }

    return (
        <Stack initialRouteName="(unauthenticated)" >
            <Stack.Screen redirect={authState?.authenticated !== true} name="(authenticated)" options={{ headerShown: false, animation: "flip" }} />
            <Stack.Screen name="(unauthenticated)" options={{ headerShown: false, animation: "flip" }} />
        </Stack>
    );
};

export default Layout;