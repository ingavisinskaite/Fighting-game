import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FistsComponent } from './fists.component';

describe('FistsComponent', () => {
  let component: FistsComponent;
  let fixture: ComponentFixture<FistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
