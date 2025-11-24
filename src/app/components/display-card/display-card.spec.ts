import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCard } from './display-card';

describe('DisplayCard', () => {
  let component: DisplayCard;
  let fixture: ComponentFixture<DisplayCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render headline and subtext', () => {
    component.headline = 'Primary Title';
    component.subtext = 'Helper copy';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.display-card__headline')?.textContent)
      .toContain('Primary Title');
    expect(compiled.querySelector('.display-card__subtext')?.textContent)
      .toContain('Helper copy');
  });
});
