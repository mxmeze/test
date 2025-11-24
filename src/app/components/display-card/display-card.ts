import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display-card',
  standalone: true,
  imports: [],
  templateUrl: './display-card.html',
  styleUrl: './display-card.scss',
})
export class DisplayCard {
  @Input() headline = 'Headline';
  @Input() subtext = 'Additional details go here.';
}

