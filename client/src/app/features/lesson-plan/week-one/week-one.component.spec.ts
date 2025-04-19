import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekOneComponent } from './week-one.component';

describe('WeekOneComponent', () => {
  let component: WeekOneComponent;
  let fixture: ComponentFixture<WeekOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeekOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeekOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
