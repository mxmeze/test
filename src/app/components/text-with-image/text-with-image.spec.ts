import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextWithImage } from './text-with-image';

describe('TextWithImage', () => {
  let component: TextWithImage;
  let fixture: ComponentFixture<TextWithImage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextWithImage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextWithImage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
