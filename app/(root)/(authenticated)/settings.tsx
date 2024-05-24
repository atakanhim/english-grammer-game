import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, Text, TouchableOpacity, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import i18n from '@/i18n'; // i18n configuration file import here
import { useUser } from '@/contexts/UserProvider';
import { useState } from 'react';

export default function TabSettingsScreen() {
  const { onLogout } = useAuth();
  const { userState } = useUser();
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng).then(() => {
      setModalVisible(false)
      // Actions to update the screen can be done here
    });

  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.languageButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.languageButtonText}>{t("shortLanguage")}</Text>
      </TouchableOpacity>

      <View style={styles.profileContainer}>
        <Image source={{ uri: userState?.Photo }} style={styles.profileImage} />
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.label}>{t('email')}:</Text>
        <Text style={styles.value}>{userState?.Email}</Text>
        <Text style={styles.label}>{t('fullname')}:</Text>
        <Text style={styles.value}>{userState?.FullName}</Text>
        <Text style={styles.label}>{t('totalscore')}:</Text>
        <Text style={styles.value}>{userState?.TotalScore}</Text>
        <Text style={styles.label}>{t('rank')}:</Text>
        <Text style={styles.value}>{userState?.Rank}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutText}>{t('logout')}</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} animationType="fade" >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={() => changeLanguage('en')}>
            <Text style={styles.languageOption}>{t("shortLanguage", { lng: "en" })}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeLanguage('tr')}>
            <Text style={styles.languageOption}>{t("shortLanguage", { lng: "tr" })}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 20,
    backgroundColor: '#f5f5f5',
    position: "relative"
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userInfo: {
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 15,
    backgroundColor: '#ff5c5c',
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
  languageButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 15,
    backgroundColor: '#ddd',
    borderRadius: 30
  },
  languageButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
  },
  modalContent: {
    position: 'absolute',
    top: 75,
    left: 22,
    backgroundColor: '#ddd',
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10

  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  languageOption: {
    padding: 11,
    fontSize: 16,

  },
});
