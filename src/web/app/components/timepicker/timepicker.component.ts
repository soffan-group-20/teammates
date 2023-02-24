import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateFormat, TimeFormat, getDefaultTimeFormat, getDefaultDateFormat } from '../../../types/datetime-const';

/**
 * Time picker with fixed time to pick.
 */
@Component({
  selector: 'tm-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss'],
})
export class TimepickerComponent {

  @Input()
  isDisabled: boolean = false;

  @Input()
  time: TimeFormat = getDefaultTimeFormat();

  @Input()
  minTime?: TimeFormat;

  @Input()
  maxTime?: TimeFormat;

  @Input()
  date: DateFormat = getDefaultDateFormat();

  @Input()
  minDate?: DateFormat;

  @Input()
  maxDate?: DateFormat;

  @Output()
  timeChange: EventEmitter<TimeFormat> = new EventEmitter();

  /**
   * Triggers time change event.
   */
  triggerTimeChange(newTime: TimeFormat): void {
    this.timeChange.emit(newTime);
  }

  /**
   * Helper function to create a range.
   */
  range(start: number, end: number): number[] {
    const arr: number[] = [];
    for (let i: number = start; i < end; i += 1) {
      arr.push(i);
    }
    return arr;
  }

  /**
   * Compares two TIMEs.
   *
   * <p>Checks whether they are equal or not.
   */
  timeCompareFn(t1: TimeFormat, t2: TimeFormat): boolean {
    return t1 && t2 && t1.hour === t2.hour && t1.minute === t2.minute;
  }

  /**
   * Checks whether the time option should be disabled when a minimum datetime and/or a maximum datetime is/are
   * specified.
   *
   * <p> The valid time option is greater or equal than the minimum datetime and smaller or equal than the maximum
   * datetime.
   */
  isOptionDisabled(t: TimeFormat): boolean {
    if (this.isMinTimeFormatsValid()
        && this.isMinDatesEqual()
        && this.isTimeBeforeMinTime(t, this.minTime)) {
      return true;
    }

    if (this.isMaxTimeFormatsValid()
        && this.isMaxDatesEqual()
        && this.isTimeAfterMaxTime(t, this.maxTime)) {
      return true;
    }

    return false;
  }

  isMinTimeFormatsValid(): boolean {
    if (this.minDate && this.minTime) {
      return true;
    }
    return false;
  }

  isMinDatesEqual(): boolean {
    if (this.date.year === this.minDate?.year
        && this.date.month === this.minDate?.month
        && this.date.day === this.minDate?.day) {
      return true;
    }
    return false;
  }

  isTimeBeforeMinTime(t: TimeFormat, t2?: TimeFormat): boolean {
    if (t2) {
      if(t.hour < t2.hour || t.minute < t2.minute) {
        return true;
      }
    }
    return false;
  }

  isMaxTimeFormatsValid(): boolean {
    if (this.maxDate && this.maxTime) {
      return true;
    }
    return false;
  }

  isMaxDatesEqual(): boolean {
    if (this.date.year === this.maxDate?.year
        && this.date.month === this.maxDate?.month
        && this.date.day === this.maxDate?.day) {
      return true;
    }
    return false;
  }

  isTimeAfterMaxTime(t: TimeFormat, t2?: TimeFormat): boolean {
    if (t2) {
      if((t.hour > t2.hour || t.minute > t2.minute)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Checks whether the time is in the fixed list to select.
   */
  isInFixedList(time: TimeFormat): boolean {
    return (time.hour >= 1 && time.hour <= 23 && time.minute === 0)
        || (time.hour === 23 && time.minute === 59);
  }

  /**
   * Formats number {@code i} and pads leading zeros if its digits are less than {@code n}.
   *
   * <p>e.g. n = 2, i = 1 => "01"
   */
  addLeadingZeros(n: number, i: number): string {
    return ('0'.repeat(n) + i).slice(-n);
  }
}
