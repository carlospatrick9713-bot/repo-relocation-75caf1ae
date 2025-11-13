import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import EN from '@/locales/en.json';
import PT from '@/locales/pt.json';
import ES from '@/locales/es.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: EN },
    pt: { translation: PT },
    es: { translation: ES }
  },
  lng: 'pt',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
