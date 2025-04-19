import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekThreeComponent } from './week-three.component';

describe('WeekThreeComponent', () => {
  let component: WeekThreeComponent;
  let fixture: ComponentFixture<WeekThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeekThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeekThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
