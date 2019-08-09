/**
 * Building block for a Workday. Each Workday will
 * consist of one or more Shifts.
 *
 * @date {Date}
 * @hours {Number=}
 * @workersNeeded {Number=}
 * @workersOn {Number=}
 */
export default class Shift {
	constructor(
    date,
    hours = 8,
    workersNeeded = 0,
    workersOn = 0,
  ) {
  	this.hours = hours;
    this.date = date;
    this.workersOn = workersOn;
    this.workersNeeded = workersNeeded;
    this.workers = [];
  }
  
  /**
   * Add a worker to the Shift.
   *
   * @worker {Worker}
   */
  addWorker(worker) {
  	if (worker) {
    	if (!this.workers.includes(worker)) {
      	this.workers.push(worker);
        this.workersOn += 1;
      } else {
      	throw new Error(`Shift.addWorker(): ${worker} is already assigned to this shift.`);
      }
    } else {
    	throw new Error('Shift.addWorker(): Please specify a worker.');
    }
  }
  
  /**
   * Remove a worker from the Shift.
   *
   * @worker {Worker}
   */
  removeWorker(worker) {
  	if (worker) {
     if (this.workers.includes(worker)) {
     	this.workers.pop(worker);
     } else {
     	throw new Error(`Shift.removeWorker(): ${worker} not found in this shift.`);
     }
    } else {
    	throw new Error('Shift.removeWorker(): Please specify a worker.');
    }
  }
  
  /**
   * Return the full list of workers on the Shift.
   *
   */
  readWorkers() {
  	return this.workers;
  }
  
  /**
   * Return the full list of workers on the Shift.
   *
   * @worker {Worker}
   */
  findWorker(worker) {
  	if (worker) {
    	if (this.workers.includes(worker)) {
      	return this.workers[worker];
      } else {
     		console.error(`Shift.removeWorker(): ${worker} not found in this shift.`);
        return -1;
     	}
    } else {
    	throw new Error('Shift.findWorker(): Please specify a worker.');
    }
  }
}
