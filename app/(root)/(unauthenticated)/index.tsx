import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Link, useRouter } from 'expo-router'
import { useAuth } from '@/contexts/AuthProvider';

const index = () => {
    const router = useRouter();
    const { authState, onGoogleLogin } = useAuth();

    const handleLoginPress = async () => {
        await onGoogleLogin!();
        router.replace('(authenticated)');
    };
    return (
        <View>

            <Pressable onPress={handleLoginPress}>
                {({ pressed }) => (
                    <Text style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}>login</Text>
                )}
            </Pressable>

        </View>
    )
}

export default index