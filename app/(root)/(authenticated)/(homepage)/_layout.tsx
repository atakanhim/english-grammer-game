import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen
                name="(index)" // Drawer navigasyonu ana ekran olarak tanımlanır
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="modals/InformationModal" // Modal için tanımlanan ekran
                options={{
                    title: "Ornekk Modal",
                    animation: "slide_from_bottom",
                    presentation: 'modal', // Modal tipi
                    headerShown: true,
                }}
            />
        </Stack>
    );
}