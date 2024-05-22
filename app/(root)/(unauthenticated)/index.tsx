import { View, Text, Pressable, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useRouter } from 'expo-router'
import { useAuth } from '@/contexts/AuthProvider';
import { GoogleSignin, GoogleSigninButton, User } from '@react-native-google-signin/google-signin';

const index = () => {
    const router = useRouter();
    const { authState, onGoogleLogin } = useAuth();
    const [error, setError] = useState<any>()

    const signIn = async () => {
        try {
            await onGoogleLogin!();
            router.replace('(authenticated)');
        } catch (error) {
            setError(error);
        }
    }

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Standard}
                color={GoogleSigninButton.Color.Dark}
                onPress={signIn}
            />
        </View>
    );
}

export default index