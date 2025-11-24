import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth.service';
import { TranslationService, Language } from '../../translation.service';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  standalone: true,
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  private auth = inject(AuthService);
  private translation = inject(TranslationService);
  protected menuOpen = signal(false);
  protected currentLang = computed(() => this.translation.getCurrentLanguage());
  
  // Make getTitle reactive to translation changes
  protected getTitle = computed(() => {
    const translations = this.translation.translationsLoaded();
    return (link: NavLink) => translations[link.titleKey] || link.titleKey;
  });

  protected readonly primaryLinks: NavLink[] = [
    { titleKey: 'nav.home', url: '/' },
    { titleKey: 'nav.services', url: '/services' },
    { titleKey: 'nav.contact', url: '/contact' },
    { titleKey: 'nav.impress', url: '/impress' },
  ];

  protected readonly accountLinks: NavLink[] = [];

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected shouldShow(link: NavLink): boolean {
    const isAuthenticated = this.auth.isLoggedIn();
    if (link.requiresAuthentication) {
      return isAuthenticated;
    }
    if (link.hideWhenAuthenticated) {
      return !isAuthenticated;
    }
    return true;
  }

  protected switchLanguage(lang: Language): void {
    this.translation.setLanguage(lang);
  }
}

type NavLink = {
  titleKey: string;
  url: string;
  requiresAuthentication?: boolean;
  hideWhenAuthenticated?: boolean;
  accent?: boolean;
};
