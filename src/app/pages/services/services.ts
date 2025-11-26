import { Component, inject, computed } from '@angular/core';
import { HeroStage } from '../../components/hero-stage/hero-stage';
import { TextWithImage } from '../../components/text-with-image/text-with-image';
import { Footer } from '../../components/footer/footer';
import { DisplayCard } from '../../components/display-card/display-card';
import { CtaButton } from '../../components/cta-button/cta-button';
import { TranslationService } from '../../translation.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    HeroStage,
    TextWithImage,
    Footer,
    DisplayCard,
    CtaButton,
  ],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  private translation = inject(TranslationService);

  protected readonly services = computed(() => {
    const lang = this.translation.currentLanguage(); // Make reactive to language changes
    const translations = this.translation.translationsLoaded();
    const t = (key: string) => translations[key] || key;
    return [
      {
        headline: t('services.consulting.title'),
        subtext: t('services.consulting.description'),
      },
      {
        headline: t('services.implementation.title'),
        subtext: t('services.implementation.description'),
      },
      {
        headline: t('services.enablement.title'),
        subtext: t('services.enablement.description'),
      },
      {
        headline: t('services.support.title'),
        subtext: t('services.support.description'),
      },
    ];
  });

  protected readonly sectionTexts = computed(() => {
    const lang = this.translation.currentLanguage(); // Make reactive to language changes
    const translations = this.translation.translationsLoaded();
    const t = (key: string) => translations[key] || key;
    return {
      heroKicker: t('services.hero.kicker'),
      heroHeadline: t('services.hero.headline'),
      heroMainText: t('services.hero.mainText'),
      heroCta: t('services.hero.cta'),
      introHeadline: t('services.intro.headline'),
      introSubheadline: t('services.intro.subheadline'),
      whyChooseHeadline: t('services.whyChoose.headline'),
      whyChooseText: t('services.whyChoose.text'),
      processHeadline: t('services.process.headline'),
      processText: t('services.process.text'),
      promotionHeadline: t('services.promotion.headline'),
      promotionText: t('services.promotion.text'),
      promotionCta: t('services.promotion.cta'),
      ctaHeadline: t('cta.headline'),
      ctaSubheadline: t('cta.subheadline'),
      ctaButton: t('cta.button'),
    };
  });
}
