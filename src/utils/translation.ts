/**
 * Utilitaire de traduction pour l'application
 * Cet utilitaire est un wrapper autour du service de traduction
 */

import { SupportedLanguage, getTranslation as getServiceTranslation } from "../services/translationService";

/**
 * Obtenir la traduction pour une clé et une langue donnée
 * @param key - La clé de traduction à utiliser
 * @param language - La langue pour laquelle obtenir la traduction
 * @returns La chaîne traduite
 */
export const getTranslation = (key: string, language: SupportedLanguage = 'fr'): string => {
  return getServiceTranslation(key, language);
};
