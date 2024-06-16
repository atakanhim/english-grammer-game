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
            justifyContent: "flex-end",
            alignItems: 'center',
            marginBottom: 100

        }}
        >
            <Pressable style={{ width: 150, height: 75 }} className='flex justify-center items-center'
                onPress={signIn}>

                <GoogleSigninButton
                    style={{ height: "100%", width: '100%' }}
                    size={GoogleSigninButton.Size.Icon}
                    color={GoogleSigninButton.Color.Dark}

                />


            </Pressable>
        </View>

    );
}

export default index