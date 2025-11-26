import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../translation.service';
import { CtaButton } from '../cta-button/cta-button';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [RouterLink, CtaButton],
  templateUrl: './cookie-banner.html',
  styleUrl: './cookie-banner.scss',
})
export class CookieBanner {
  private translation = inject(TranslationService);
  
  // Check if consent was already given
  protected isVisible = signal(this.shouldShowBanner());
  protected consentGiven = signal(this.hasConsent());

  protected readonly texts = computed(() => {
    this.translation.currentLanguage();
    const translations = this.translation.translationsLoaded();
    const t = (key: string) => translations[key] || key;
    return {
      headline: t('cookieBanner.headline'),
      text: t('cookieBanner.text'),
      acceptAll: t('cookieBanner.acceptAll'),
      acceptNecessary: t('cookieBanner.acceptNecessary'),
      privacyLink: t('cookieBanner.privacyLink'),
    };
  });

  private shouldShowBanner(): boolean {
    // Show banner if no consent was given
    return !this.hasConsent();
  }

  private hasConsent(): boolean {
    return localStorage.getItem('cookieConsent') === 'true';
  }

  protected acceptAll(): void {
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    this.consentGiven.set(true);
    this.isVisible.set(false);
  }

  protected acceptNecessary(): void {
    // Only accept necessary cookies (technically necessary)
    localStorage.setItem('cookieConsent', 'necessary');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    this.consentGiven.set(true);
    this.isVisible.set(false);
  }
}
