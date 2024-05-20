import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function Layout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>

            <Drawer>
                <Drawer.Screen
                    name="index"
                    options={{
                        drawerLabel: 'Sentences',
                        title: 'Sentences',
                    }}
                />
                <Drawer.Screen
                    name="createWord"
                    options={{
                        drawerLabel: 'Create New Sentence',
                        title: 'Create New Sentence',
                    }}
                />

            </Drawer>
        </GestureHandlerRootView>
    );
}