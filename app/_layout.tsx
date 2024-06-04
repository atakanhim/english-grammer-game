import { AuthProvider } from '@/contexts/AuthProvider';
import { UserProvider } from '@/contexts/UserProvider';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import i18n from '@/i18n';
import { I18nextProvider } from 'react-i18next';





export default function RootLayout() {


  return <RootLayoutNav />;
}

function RootLayoutNav() {

  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <UserProvider>
          <Slot />
        </UserProvider>
      </AuthProvider>
    </I18nextProvider>
  );
}
