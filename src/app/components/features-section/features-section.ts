import { Component, Input } from '@angular/core';

export interface Feature {
  title: string;
  description: string;
  icon?: string;
}

@Component({
  selector: 'app-features-section',
  standalone: true,
  imports: [],
  templateUrl: './features-section.html',
  styleUrl: './features-section.scss',
})
export class FeaturesSection {
  @Input() headline = 'Our Services';
  @Input() subheadline = 'Everything you need to grow your business';
  @Input() features: Feature[] = [];
}
