import { useAuth } from '@/contexts/AuthProvider';
import { StyleSheet, View, Text, Pressable } from 'react-native';

export default function TabSettingsScreen() {
  const { authState, onLogout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>


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
