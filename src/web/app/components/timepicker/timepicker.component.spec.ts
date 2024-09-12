import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TimepickerComponent } from './timepicker.component';

describe('TimepickerComponent', () => {
  let component: TimepickerComponent;
  let fixture: ComponentFixture<TimepickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
      ],
      declarations: [
        TimepickerComponent,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('Should return true if given minute is less than minTime minute', () => {
    component.minTime = {hour: 12, minute: 59};
    component.minDate = {year: 2023, month: 2, day: 20};
    component.date = {year: 2023, month: 2, day: 20};
    let result = false;
    result = component.isOptionDisabled({hour: 12, minute: 30});
    expect(result).toBe(true);
  });
});
