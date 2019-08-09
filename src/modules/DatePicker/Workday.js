import Shift from './Shift.js';

/**
 * Building block for a Workweek. Contains one or
 * more Shifts.
 *
 * @date {Date}
 */
export default class Workday {
	constructor(
    date,
    shifts = []
  ) {
  	if (!date) {
    	throw new Error('Workday.constructor(): A date is required when creating a new Workday for the calendar.');
    }
    this.date = date;
    this.shifts = shifts;
  }
  
  /**
   * Add a new Shift to the current Day. Will
   * default to an 8 hour shift and 10 workers needed
   * per shift.
   *
   * @hours {Number=}
   * @workersNeeded {Number=}
   */
  addShift( 
    hours = 8,
    workersNeeded = 10
  ) {
  	this.shifts.push(new Shift(this.date, hours, workersNeeded));
  }
  
  /**
   * Remove specified Shift from the current Day.
   *
   * @shift {Number}
   */
  removeShift(shift) {
    if (this.shifts[shift]) {
      let target = this.shifts[shift];
      this.shifts = this.shifts.filter(shiftObj => shiftObj !== target);
    } else {
			throw new Error('Workday.removeShift(): Specified shift not located.');
    }
  }
}
