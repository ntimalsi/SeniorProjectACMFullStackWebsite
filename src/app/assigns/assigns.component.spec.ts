import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignsComponent } from './assigns.component';

describe('AssignsComponent', () => {
  let component: AssignsComponent;
  let fixture: ComponentFixture<AssignsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
