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
      privacyHeadline: t('impress.privacy.headline'),
      dataCollection: t('impress.privacy.dataCollection.headline'),
      dataCollectionText: t('impress.privacy.dataCollection.text'),
      contactForm: t('impress.privacy.contactForm.headline'),
      contactFormText: t('impress.privacy.contactForm.text'),
      storage: t('impress.privacy.storage.headline'),
      storageText: t('impress.privacy.storage.text'),
      cookies: t('impress.privacy.cookies.headline'),
      cookiesText: t('impress.privacy.cookies.text'),
      externalServices: t('impress.privacy.externalServices.headline'),
      externalServicesText: t('impress.privacy.externalServices.text'),
      rights: t('impress.privacy.rights.headline'),
      rightsText: t('impress.privacy.rights.text'),
      rightsList: {
        access: t('impress.privacy.rights.access'),
        rectification: t('impress.privacy.rights.rectification'),
        erasure: t('impress.privacy.rights.erasure'),
        restriction: t('impress.privacy.rights.restriction'),
        portability: t('impress.privacy.rights.portability'),
        objection: t('impress.privacy.rights.objection'),
        complaint: t('impress.privacy.rights.complaint'),
      },
      contactDataProtection: t('impress.privacy.contactDataProtection'),
    };
  });
}
