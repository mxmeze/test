import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtaButton } from './cta-button';

describe('CtaButton', () => {
  let component: CtaButton;
  let fixture: ComponentFixture<CtaButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtaButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtaButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the provided label', () => {
    component.label = 'Join now';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Join now');
  });

  it('should emit when clicked', () => {
    spyOn(component.pressed, 'emit');

    const compiled = fixture.nativeElement as HTMLElement;
    compiled.querySelector('button')?.dispatchEvent(new Event('click'));

    expect(component.pressed.emit).toHaveBeenCalled();
  });
});
