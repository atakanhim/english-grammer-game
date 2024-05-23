import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from './locales/en.json';
import tr from './locales/tr.json';

// Cihazın dil ayarını almak için getLocales() kullanın
const locales = Localization.getLocales();
const deviceLanguage = locales.length > 0 ? locales[0].languageCode : 'en';

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3', // Bunu eklemeniz gerekebilir
    lng: deviceLanguage, // Kullanıcının cihaz dilini kullan
    fallbackLng: 'en', // Eğer kullanıcının cihaz dili desteklenmiyorsa 'en' kullan
    resources: {
        en: {
            translation: en
        },
        tr: {
            translation: tr
        }
    },
    interpolation: {
        escapeValue: false // React zaten XSS koruması sağlıyor
    }
});

export default i18n;
