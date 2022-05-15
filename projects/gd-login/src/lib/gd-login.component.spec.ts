import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GDLoginComponent } from './gd-login.component';

describe('GDLoginComponent', () => {
  let component: GDLoginComponent;
  let fixture: ComponentFixture<GDLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GDLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GDLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
