import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroStage } from './hero-stage';

describe('HeroStage', () => {
  let component: HeroStage;
  let fixture: ComponentFixture<HeroStage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroStage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroStage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass label down to CTA button', () => {
    component.ctaLabel = 'Try it free';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-cta-button')?.textContent)
      .toContain('Try it free');
  });

  it('should emit when CTA is clicked', () => {
    spyOn(component.ctaClicked, 'emit');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    compiled.querySelector('button')?.dispatchEvent(new Event('click'));

    expect(component.ctaClicked.emit).toHaveBeenCalled();
  });
});
