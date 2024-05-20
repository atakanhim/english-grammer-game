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
                    title: 'Giriş yap',
                    headerRight: () => (
                        <Link href="(unauthenticated)/register" asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="info-circle"
                                        size={25}
                                        color="light"
                                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ),
                }}
            />
            <Stack.Screen
                name="register"
                options={{
                    animation: "slide_from_right",
                    title: 'Tab Two',
                    headerLeft: () => (
                        <Link href="(unauthenticated)" asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="info-circle"
                                        size={25}
                                        color="light"
                                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ),
                }}
            />
        </Stack>
    );
}
