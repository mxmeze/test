import { Component, EventEmitter, Input, Output, computed } from '@angular/core';
import { CtaButton } from '../cta-button/cta-button';

@Component({
  selector: 'app-hero-stage',
  standalone: true,
  imports: [CtaButton],
  templateUrl: './hero-stage.html',
  styleUrl: './hero-stage.scss',
})
export class HeroStage {
  @Input() kicker?: string;
  @Input() headline = 'Tell your story with confidence.';
  @Input() mainText = 'Use this hero stage to align your headline, supporting copy, and call-to-action on top of a bold background image.';
  @Input() ctaLabel = 'Get started';
  @Input() ctaHref?: string;
  @Input() backgroundUrl = 'https://www.mckinsey.com/~/media/mckinsey/industries/technology%20media%20and%20telecommunications/high%20tech/our%20insights/unlocking%20the%20value%20of%20ai%20in%20software%20development/unlocking-the-value-of-ai-in-software-thumb-1536x1536.jpg?cq=50&mw=767&car=16:9&cpy=Center';
  @Input() fullWidth = false;
  @Output() ctaClicked = new EventEmitter<void>();

  protected backgroundImage = computed(() =>
    `linear-gradient(120deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 64, 175, 0.55) 60%, rgba(37, 99, 235, 0.45) 100%), url('${this.backgroundUrl}')`
  );

  protected onCtaPressed(): void {
    this.ctaClicked.emit();
  }
}
