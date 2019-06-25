import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlailComponent } from './flail.component';

describe('FlailComponent', () => {
  let component: FlailComponent;
  let fixture: ComponentFixture<FlailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
