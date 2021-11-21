import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcotizacionesComponent } from './ccotizaciones.component';

describe('CcotizacionesComponent', () => {
  let component: CcotizacionesComponent;
  let fixture: ComponentFixture<CcotizacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcotizacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcotizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
