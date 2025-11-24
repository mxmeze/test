import { Component, inject, computed } from '@angular/core';
import { HeroStage } from '../../components/hero-stage/hero-stage';
import { FeaturesSection, Feature } from '../../components/features-section/features-section';
import { TestimonialsSection, Testimonial } from '../../components/testimonials-section/testimonials-section';
import { TextWithImage } from '../../components/text-with-image/text-with-image';
import { CtaSection } from '../../components/cta-section/cta-section';
import { Footer } from '../../components/footer/footer';
import { TranslationService } from '../../translation.service';

@Component({
  selector: 'app-home',
  imports: [
    HeroStage,
    FeaturesSection,
    TestimonialsSection,
    TextWithImage,
    CtaSection,
    Footer,
  ],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private translation = inject(TranslationService);
  
  // Make computed signals depend on both language AND translationsLoaded
  protected readonly features = computed(() => {
    this.translation.currentLanguage(); // Make reactive to language changes
    const translations = this.translation.translationsLoaded(); // Make reactive to translations loading
    const t = (key: string) => {
      return translations[key] || key;
    };
    return [
      {
        title: t('features.rapidPrototyping.title'),
        description: t('features.rapidPrototyping.description'),
        icon: '⚡',
      },
      {
        title: t('features.aiSolutions.title'),
        description: t('features.aiSolutions.description'),
        icon: '🤖',
      },
      {
        title: t('features.modernStack.title'),
        description: t('features.modernStack.description'),
        icon: '🚀',
      },
      {
        title: t('features.agile.title'),
        description: t('features.agile.description'),
        icon: '🔄',
      },
      {
        title: t('features.innovationLab.title'),
        description: t('features.innovationLab.description'),
        icon: '🧪',
      },
      {
        title: t('features.startupFriendly.title'),
        description: t('features.startupFriendly.description'),
        icon: '💎',
      },
    ];
  });

  protected readonly heroTexts = computed(() => {
    this.translation.currentLanguage(); // Make reactive to language changes
    const translations = this.translation.translationsLoaded();
    const t = (key: string) => {
      return translations[key] || key;
    };
    return {
      kicker: t('hero.kicker'),
      headline: t('hero.headline'),
      mainText: t('hero.mainText'),
      cta: t('hero.cta'),
    };
  });

  protected readonly sectionTexts = computed(() => {
    this.translation.currentLanguage(); // Make reactive to language changes
    const translations = this.translation.translationsLoaded();
    const t = (key: string) => {
      return translations[key] || key;
    };
    return {
      featuresHeadline: t('features.headline'),
      featuresSubheadline: t('features.subheadline'),
      freshHeadline: t('content.freshPerspective.headline'),
      freshText: t('content.freshPerspective.text'),
      innovatorsHeadline: t('content.builtForInnovators.headline'),
      innovatorsText: t('content.builtForInnovators.text'),
      testimonialsHeadline: t('testimonials.headline'),
      ctaHeadline: t('cta.headline'),
      ctaSubheadline: t('cta.subheadline'),
      ctaButton: t('cta.button'),
    };
  });

  protected readonly testimonials: Testimonial[] = [
    {
      text: 'Everything was as described, or even exceeded my expectations. Furthermore, the communication was friendly, delivery was fast, and even months later I am still more than satisfied with the purchase.',
      author: 'Anonymous',
      rating: 5,
    },
    {
      text: 'Good service and the price is right. Marvin understood my needs and suggested easy-to-integrate solutions.',
      author: 'Anonymous',
      rating: 5,
    },
    {
      text: 'Competent and friendly advice. Reliable and punctual delivery, and the prices are fair. I can highly recommend them.',
      author: 'Anonymous',
      rating: 5,
    },
    {
      text: 'Communication was excellent! He was able to help me with technical issues and quickly present a solution.',
      author: 'Anonymous',
      rating: 5,
    },
    {
      text: 'Quick response, no problems, technical implementation was good, I would do it again.',
      author: 'Anonymous',
      rating: 5,
    },
  ];
}
