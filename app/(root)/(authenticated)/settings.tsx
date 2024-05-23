import { useAuth } from '@/contexts/AuthProvider';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, Text, Pressable, Button } from 'react-native';
import i18n from '@/i18n'; // i18n yapılandırma dosyanızı buraya import edin
import { useUser } from '@/contexts/UserProvider';

export default function TabSettingsScreen() {
  const { onLogout } = useAuth();
  const { userState } = useUser();

  const { t } = useTranslation();

  const changeLanguage = (lng: any) => {
    i18n.changeLanguage(lng);
  };
  return (
    <View style={styles.container}>
      <View>
        <Text>{userState?.Email}</Text>
        <Text>{userState?.Id}</Text>
        <Text>{userState?.FullName}</Text>
        <Text>total score : {userState?.TotalScore}</Text>
      </View>
      <Text style={styles.title}>Settings</Text>
      <View>
        <Text>{t('welcome')}</Text>
        <Text>{t('hello')}</Text>
        <Button title="English" onPress={() => changeLanguage('en')} />
        <Button title="Türkçe" onPress={() => changeLanguage('tr')} />
      </View>

      <Pressable onPress={onLogout}>
        <Text>Logout</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
