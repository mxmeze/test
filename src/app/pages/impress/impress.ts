import { Component, inject, computed } from '@angular/core';
import { TranslationService } from '../../translation.service';

@Component({
  selector: 'app-impress',
  standalone: true,
  imports: [],
  templateUrl: './impress.html',
  styleUrl: './impress.scss',
})
export class Impress {
  private translation = inject(TranslationService);

  protected readonly texts = computed(() => {
    this.translation.currentLanguage();
    const translations = this.translation.translationsLoaded();
    const t = (key: string) => translations[key] || key;
    return {
      headline: t('impress.headline'),
      responsible: t('impress.responsible'),
      address: t('impress.address'),
      contact: t('impress.contact'),
      email: t('impress.email'),
      phone: t('impress.phone'),
      liability: t('impress.liability.headline'),
      liabilityText: t('impress.liability.text'),
      copyright: t('impress.copyright.headline'),
      copyrightText: t('impress.copyright.text'),
      privacy: t('impress.privacy.headline'),
      privacyText: t('impress.privacy.text'),
    };
  });
}
