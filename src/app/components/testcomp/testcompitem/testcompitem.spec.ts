import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testcompitem } from './testcompitem';

describe('Testcompitem', () => {
  let component: Testcompitem;
  let fixture: ComponentFixture<Testcompitem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Testcompitem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Testcompitem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
