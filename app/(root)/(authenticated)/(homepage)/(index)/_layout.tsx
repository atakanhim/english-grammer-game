import { Drawer } from 'expo-router/drawer';
import { useTranslation } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function Layout() {
    const { t } = useTranslation();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>

            <Drawer>
                <Drawer.Screen
                    name="index"
                    options={{
                        drawerLabel: t('practice'),
                        title: t('practice'),
                    }}
                />
                <Drawer.Screen
                    name="challenge"
                    options={{
                        drawerLabel: t('challenge'),
                        title: t('challenge'),
                    }}
                />
                <Drawer.Screen
                    name="createWord"
                    options={{
                        drawerLabel: t('createNewSentences'),
                        title: t('createNewSentences'),
                    }}
                />

            </Drawer>
        </GestureHandlerRootView>
    );
}