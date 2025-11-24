import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testcompform } from './testcompform';

describe('Testcompform', () => {
  let component: Testcompform;
  let fixture: ComponentFixture<Testcompform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Testcompform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Testcompform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
