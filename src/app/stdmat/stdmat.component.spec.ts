import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StdmatComponent } from './stdmat.component';

describe('StdmatComponent', () => {
  let component: StdmatComponent;
  let fixture: ComponentFixture<StdmatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StdmatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StdmatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
