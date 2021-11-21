import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinSeComponent } from './sin-se.component';

describe('SinSeComponent', () => {
  let component: SinSeComponent;
  let fixture: ComponentFixture<SinSeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinSeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinSeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
