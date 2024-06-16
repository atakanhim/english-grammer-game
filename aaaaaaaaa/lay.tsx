import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Stack, Tabs } from 'expo-router';
import { Pressable } from 'react-native';


export default function Layout() {

    return (
        <Stack
            screenOptions={{
                headerShown: true,
            }}>
            <Stack.Screen
                name="index"
                options={{
                    animation: "slide_from_right",
                    headerShown: false

                }}
            />

        </Stack>
    );
}
