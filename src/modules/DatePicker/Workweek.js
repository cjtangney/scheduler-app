import Workday from './Workday.js';

/**
 * The Workweek is a collection of Workdays, containing
 * one or more Shifts.
 *
 * @weekStart {Date}
 * @weekEnd {Date=}
 */
export default class Workweek {
	constructor(
  	weekStart,
    weekEnd,
    days = []
  ) {
  	if (weekStart !== undefined) {
    	this.weekStart = weekStart;
      if (weekEnd === undefined) {
        weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
      }
      this.weekEnd = weekEnd;
    	this.newWorkweek(weekStart, weekEnd);
    } else {
    	throw new Error('Workweek.constructor(): A start date must be provided when creating a new Workweek.');
    }
  }
  
  /**
   * Initializes a the Workweek with new
   * Workdays for each day of the week.
   * 
   * @weekStart {Date}
   * @weekEnd {Date}
   */
  newWorkweek(weekStart, weekEnd) {
    let days = [];
    let date = new Date(weekStart);
    while (date <= weekEnd) {
    	days.push(new Workday(new Date(date)));
      date.setDate(date.getDate() + 1);
    }
    this.days = days;
  }
}
