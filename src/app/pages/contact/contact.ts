import { Component, inject, computed } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslationService } from '../../translation.service';
import { LoggerService } from '../../services/logger.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private translation = inject(TranslationService);
  private logger = inject(LoggerService);

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
  });

  protected readonly texts = computed(() => {
    this.translation.currentLanguage();
    const translations = this.translation.translationsLoaded();
    const t = (key: string) => translations[key] || key;
    return {
      headline: t('contact.headline'),
      subheadline: t('contact.subheadline'),
      nameLabel: t('contact.form.name'),
      emailLabel: t('contact.form.email'),
      subjectLabel: t('contact.form.subject'),
      messageLabel: t('contact.form.message'),
      submitButton: t('contact.form.submit'),
      namePlaceholder: t('contact.form.namePlaceholder'),
      emailPlaceholder: t('contact.form.emailPlaceholder'),
      subjectPlaceholder: t('contact.form.subjectPlaceholder'),
      messagePlaceholder: t('contact.form.messagePlaceholder'),
      directContact: t('contact.direct.headline'),
      directText: t('contact.direct.text'),
      email: t('contact.direct.email'),
      responseTime: t('contact.direct.responseTime'),
    };
  });

  protected onSubmit(): void {
    if (this.contactForm.valid) {
      // TODO: Implement form submission
      this.logger.log('Contact form submitted', { 
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        subject: this.contactForm.value.subject
      });
      // You can add HTTP call here to send the form data
    }
  }
}
