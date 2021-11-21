import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlazoComponent } from './plazo.component';

describe('PlazoComponent', () => {
  let component: PlazoComponent;
  let fixture: ComponentFixture<PlazoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlazoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlazoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
