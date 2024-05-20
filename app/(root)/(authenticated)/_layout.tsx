import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

export default function Layout() {
  return (
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
}
