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

  b: Record<number, boolean> = Object.fromEntries([...new Array(24)].map((_, i) => [i, false]));// Manual branch coverage array

  isOptionDisabled(t: TimeFormat): boolean {

    if(this.minDate) {
      this.b[0] = true;
      if(this.minTime) {
        this.b[1] = true;
        if(this.minDate != null ) {
          this.b[2] = true;
          if(this.date.year === this.minDate.year) {
            this.b[3] = true;
            if (this.minDate != null) {
              this.b[4] = true;
              if (this.date.month === this.minDate.month) {
                this.b[5] = true;
                if (this.minDate != null) {
                  this.b[6] = true;
                  if (this.date.day === this.minDate.day) {
                    this.b[7] = true;
                    if (this.minTime != null) {
                      this.b[8] = true;
                      if (t.hour < this.minTime.hour) {
                        this.b[9] = true;
                      } else if (this.minTime != null) {
                        this.b[10] = true;
                        if (t.minute < this.minTime.minute) {
                          this.b[11] = true;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    if (this.minDate && this.minTime
        && this.date.year === this.minDate?.year && this.date.month === this.minDate?.month
        && this.date.day === this.minDate?.day
        && (t.hour < this.minTime?.hour || t.minute < this.minTime?.minute)) {
      return true;
    }

    if(this.maxDate) {
      this.b[12] = true;
      if(this.maxTime) {
        this.b[13] = true;
        if(this.maxDate != null ) {
          this.b[14] = true;
          if(this.date.year === this.maxDate.year) {
            this.b[15] = true;
            if (this.maxDate != null) {
              this.b[16] = true;
              if (this.date.month === this.maxDate.month) {
                this.b[17] = true;
                if (this.maxDate != null) {
                  this.b[18] = true;
                  if (this.date.day === this.maxDate.day) {
                    this.b[19] = true;
                    if (this.maxTime != null) {
                      this.b[20] = true;
                      if (t.hour < this.maxTime.hour) {
                        this.b[21] = true;
                      } else if (this.maxTime != null) {
                        this.b[22] = true;
                        if (t.minute < this.maxTime.minute) {
                          this.b[23] = true;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    if (this.maxDate && this.maxTime
        && this.date.year === this.maxDate?.year && this.date.month === this.maxDate?.month
        && this.date.day === this.maxDate?.day
        && (t.hour > this.maxTime?.hour || t.minute > this.maxTime?.minute)) {
      return true;
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
