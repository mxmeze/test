import { Component, Input } from '@angular/core';
import { CtaButton } from '../cta-button/cta-button';

@Component({
  selector: 'app-cta-section',
  standalone: true,
  imports: [CtaButton],
  templateUrl: './cta-section.html',
  styleUrl: './cta-section.scss',
})
export class CtaSection {
  @Input() headline = 'Ready to get started?';
  @Input() subheadline = 'Let\'s build something amazing together.';
  @Input() ctaLabel = 'Contact Us';
  @Input() ctaHref = '/contact';
  @Input() variant: 'primary' | 'secondary' = 'primary';
}
