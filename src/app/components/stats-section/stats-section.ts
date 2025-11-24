import { Component, Input } from '@angular/core';

export interface Stat {
  value: string;
  label: string;
}

@Component({
  selector: 'app-stats-section',
  standalone: true,
  imports: [],
  templateUrl: './stats-section.html',
  styleUrl: './stats-section.scss',
})
export class StatsSection {
  @Input() stats: Stat[] = [];
}
