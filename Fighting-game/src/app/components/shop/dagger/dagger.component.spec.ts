import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaggerComponent } from './dagger.component';

describe('DaggerComponent', () => {
  let component: DaggerComponent;
  let fixture: ComponentFixture<DaggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
