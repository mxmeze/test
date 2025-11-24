import { Component, Input } from '@angular/core';

export interface Testimonial {
  text: string;
  author: string;
  role?: string;
  company?: string;
  rating?: number;
}

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [],
  templateUrl: './testimonials-section.html',
  styleUrl: './testimonials-section.scss',
})
export class TestimonialsSection {
  @Input() headline = 'What Our Clients Say';
  @Input() testimonials: Testimonial[] = [];
}

