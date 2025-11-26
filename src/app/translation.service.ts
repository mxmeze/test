import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from './services/logger.service';

export type Language = 'en' | 'de';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translations: Record<string, Record<string, string>> = {};
  public readonly currentLanguage = signal<Language>('en');
  public readonly translationsLoaded = signal<Record<string, string>>({});
  private loadingPromises: Record<string, Promise<void>> = {};
  private logger = inject(LoggerService);
  
  constructor(private http: HttpClient) {
    // Try to get language from localStorage or browser
    const savedLang = localStorage.getItem('language') as Language;
    const initialLang = (savedLang && (savedLang === 'en' || savedLang === 'de')) 
      ? savedLang 
      : (navigator.language.split('-')[0] === 'de' ? 'de' : 'en');
    
    this.currentLanguage.set(initialLang);
    
    // Load only the initial language immediately for faster initial load
    this.loadLanguage(initialLang).then(() => {
      // Preload the other language in the background
      const otherLang = initialLang === 'en' ? 'de' : 'en';
      this.loadLanguage(otherLang).catch(() => {
        // Silently fail if preload doesn't work
      });
    });

    // Update loaded translations when language changes
    effect(() => {
      const lang = this.currentLanguage();
      if (this.translations[lang]) {
        this.translationsLoaded.set(this.translations[lang]);
      } else {
        // If translations not loaded yet, load them
        this.loadLanguage(lang);
      }
    });
  }

  private loadLanguage(lang: Language): Promise<void> {
    if (this.loadingPromises[lang] !== undefined) {
      return this.loadingPromises[lang];
    }

    this.loadingPromises[lang] = new Promise((resolve, reject) => {
      this.http.get<Record<string, any>>(`/i18n/${lang}.json`).subscribe({
        next: (translations) => {
          this.translations[lang] = this.flattenTranslations(translations);
          if (this.currentLanguage() === lang) {
            this.translationsLoaded.set(this.translations[lang]);
          }
          resolve();
        },
        error: (err) => {
          this.logger.error(`Failed to load translations for ${lang}`, err);
          // Provide empty translations as fallback
          this.translations[lang] = {};
          if (this.currentLanguage() === lang) {
            this.translationsLoaded.set({});
          }
          reject(err);
        },
      });
    });

    return this.loadingPromises[lang];
  }

  private flattenTranslations(obj: any, prefix = ''): Record<string, string> {
    const result: Record<string, string> = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          Object.assign(result, this.flattenTranslations(value, newKey));
        } else {
          result[newKey] = String(value);
        }
      }
    }
    return result;
  }

  setLanguage(lang: Language): void {
    this.currentLanguage.set(lang);
    localStorage.setItem('language', lang);
    // Ensure translations are loaded for the new language
    if (!this.translations[lang]) {
      this.loadLanguage(lang);
    } else {
      this.translationsLoaded.set(this.translations[lang]);
    }
  }

  getCurrentLanguage(): Language {
    return this.currentLanguage();
  }

  translate(key: string, params?: Record<string, string>): string {
    const translations = this.translationsLoaded();
    let translation = translations[key];
    
    // If translation not found, try to get it from current language translations
    if (!translation) {
      const lang = this.currentLanguage();
      translation = this.translations[lang]?.[key];
    }
    
    // Fallback to key if still not found
    if (!translation) {
      this.logger.warn(`Translation missing for key: ${key}`);
      return key;
    }
    
    if (params) {
      return translation.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey] || match;
      });
    }
    
    return translation;
  }

  // Reactive translation function that updates when language changes
  t = computed(() => {
    const translations = this.translationsLoaded();
    const lang = this.currentLanguage(); // Depend on language signal
    return (key: string, params?: Record<string, string>) => {
      let translation = translations[key];
      
      // If translation not found, try to get it from current language translations
      if (!translation) {
        translation = this.translations[lang]?.[key];
      }
      
      // Fallback to key if still not found
      if (!translation) {
        this.logger.warn(`Translation missing for key: ${key}`);
        return key;
      }
      
      if (params) {
        return translation.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
          return params[paramKey] || match;
        });
      }
      
      return translation;
    };
  });
}
