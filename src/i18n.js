import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import { translations } from './i18n/index.js';

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: translations,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

// Export the translation function for use in components
export { useTranslation } from 'react-i18next';
