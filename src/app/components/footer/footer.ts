import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../translation.service';

export interface FooterLink {
  titleKey: string;
  url: string;
}

export interface FooterColumn {
  titleKey: string;
  links: FooterLink[];
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private translation = inject(TranslationService);
  protected tagline = computed(() => {
    const translations = this.translation.translationsLoaded();
    return translations['footer.tagline'] || 'footer.tagline';
  });

  protected readonly columns = computed(() => {
    const translations = this.translation.translationsLoaded();
    const t = (key: string) => translations[key] || key;
    return [
      {
        titleKey: 'footer.company',
        links: [
          { titleKey: 'nav.home', url: '/' },
          { titleKey: 'nav.services', url: '/services' },
          { titleKey: 'nav.contact', url: '/contact' },
        ],
      },
      {
        titleKey: 'footer.legal',
        links: [
          { titleKey: 'nav.impress', url: '/impress' },
        ],
      },
    ];
  });

  protected readonly currentYear = new Date().getFullYear();

  protected getTitle(key: string): string {
    const translations = this.translation.translationsLoaded();
    return translations[key] || key;
  }
}
