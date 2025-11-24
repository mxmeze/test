import { Component, EventEmitter, Input, Output, computed } from '@angular/core';

@Component({
  selector: 'app-cta-button',
  standalone: true,
  imports: [],
  templateUrl: './cta-button.html',
  styleUrl: './cta-button.scss',
})
export class CtaButton {
  @Input() label = 'Call to action';
  @Input() href?: string;
  @Input() target: '_self' | '_blank' = '_self';
  @Input() rel?: string;
  @Input() variant: 'primary' | 'secondary' | 'tertiary' = 'primary';
  @Input() disabled = false;
  @Output() pressed = new EventEmitter<void>();

  // Provide a default rel when opening in a new tab
  protected computedRel = computed(() => {
    if (this.rel) {
      return this.rel;
    }
    return this.target === '_blank' ? 'noopener noreferrer' : null;
  });

  protected handleClick(event: Event): void {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    this.pressed.emit();
  }
}
