import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-with-image',
  standalone: true,
  imports: [],
  templateUrl: './text-with-image.html',
  styleUrl: './text-with-image.scss',
})
export class TextWithImage {
  @Input() headline = '';
  @Input() text = '';
  @Input() imageUrl = '';
  @Input() imageAlt = '';
  @Input() imagePosition: 'left' | 'right' = 'right';
}
