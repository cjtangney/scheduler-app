import Workweek from './Workweek.js';

/**
 * Interface for interacting with Workweeks,
 * Workdays, and Shifts. Contains schedule information
 * for the current month.
 *
 * TODO:
 *	=> Include a date argument for initializing DatePickers
 *     in different months.
 */
export default class DatePicker {
  constructor() {
    const RIGHT_NOW = new Date();
    this.month = RIGHT_NOW.getMonth();
    this.firstDay = new Date(
      RIGHT_NOW.getFullYear(),
      RIGHT_NOW.getMonth(),
      1
    );
    this.firstWeekOffset = this.firstDay.getDay();
    this.detailsWindow = document.getElementById('date-details-modal');
    this.detailsContent = this.detailsWindow.children[0];
    this.workweeks = [];

    let currentDay = new Date(this.firstDay);
    if (this.firstWeekOffset > 0) {
      currentDay.setDate(currentDay.getDate() - this.firstWeekOffset);
      let workweekStart = new Date(currentDay);
      let workweek = new Workweek(workweekStart);
      this.workweeks.push(workweek);
      currentDay.setDate(currentDay.getDate() + 7);
    }

    while (currentDay.getMonth() === this.month) {
      let workweekStart = new Date(currentDay);
      let workweek = new Workweek(workweekStart);
      this.workweeks.push(workweek);
      currentDay.setDate(currentDay.getDate() + 7);
    }

    this.init();
  }

  /**
   * Default shift: 8 hours and 10 workers needed
   * per shift.
   *
   * @target {{row, cell}}
   * @hours {Number=}
   * @workersNeeded {Number=}
   * 
   * TODO:
   *  => ADD SHIFT LENGTH SELECTOR TO GUI
   *  => ADD WORKERS NEEDED SELECTOR TO GUI
   */
  addShift(target, hours = 8, workersNeeded = 10) {
    const {
      row,
      cell
    } = target;
    this.workweeks[row].days[cell].addShift();
    this.renderDateDetails(
      this.workweeks[row].days[cell],
      target
    );
    this.redrawCell(target);
  }
  
  /**
   * @target {{row, cell}}
   * @shift {Number} 
   */
  removeShift(target, shift) {
    const {
      row,
      cell
    } = target;
    this.workweeks[row].days[cell].removeShift(shift - 1);
    this.renderDateDetails(
      this.workweeks[row].days[cell],
      target
    );
    this.redrawCell(target);
  }
  
  /**
   * @target {{row, cell}}
   * @shift {Number}
   * @worker {String}
   */
  addWorkerToShift(target, shift, worker) {
    if (target) {
      const {
        row,
        cell
      } = target
      if (shift) {
        shift = this.workweeks[row].days[cell].shifts[shift - 1];
        if (worker) {
          shift.addWorker(worker);
          this.renderDateDetails(this.workweeks[row].days[cell], target);
        } else {
          throw new Error('DatePicker.addWorkerToShift(): Please specify a worker.');
        }
      } else {
        throw new Error('DatePicker.addWorkerToShift(): Ensure the selected date contains active shifts.');
      }
    } else {
      throw new Error('DatePicker.addWorkerToShift(): Please select a date from the current month.');
    }
  }
  
  /**
   * @target {{row, cell}}
   * @shift {Number}
   * @worker {String} 
   */
  removeWorkerFromShift(target, shift, worker) {
    if (target) {
      const {
        row,
        cell
      } = target
      if (shift) {
        shift = this.workweeks[row].days[cell].shifts[shift - 1];
        if (worker) {
          shift.removeWorker(worker);
          this.renderDateDetails(this.workweeks[row].days[cell], target);
        } else {
          throw new Error('DatePicker.removeWorkerFromShift(): Please specify a worker.');
        }
      } else {
        throw new Error('DatePicker.removeWorkerFromShift(): Ensure the selected date contains active shifts.');
      }
    } else {
      throw new Error('DatePicker.removeWorkerFromShift(): Please select a date from the current month.');
    }
  }

	/**
   * @target {{row, cell}}
   */
	showRemoveShiftDialog(target) {
  	const {
      row,
      cell
    } = target;
    this.detailsContent.innerHTML = '';
    const closeDetailsBtn = document.createElement('span');
    closeDetailsBtn.classList.add('date-details-modal-close');
    closeDetailsBtn.onclick = () => {
      this.toggleDetailsWindow();
    };
    const closeDetailsIcon = document.createElement('i');
    closeDetailsIcon.classList.add('material-icons');
    closeDetailsIcon.innerText = 'close';
    closeDetailsBtn.append(closeDetailsIcon);
    this.detailsContent.append(closeDetailsBtn);
    const detailsHeader = document.createElement('span');
    detailsHeader.setAttribute('class', 'remove-shift-header');
    detailsHeader.innerText = 'Select shift for removal';
    this.detailsContent.append(detailsHeader);
    const shiftSelectWrapper = document.createElement('div');
    shiftSelectWrapper.classList.add('shift-select-wrapper');
    const shiftSelectLabel = document.createElement('span');
    shiftSelectLabel.classList.add('shift-select-label');
    shiftSelectLabel.innerText = 'Select a shift from the dropdown'
    const shiftSelect = document.createElement('select');
    shiftSelect.classList.add('shift-select');
    this.workweeks[row].days[cell].shifts.forEach((shift, i) => {
      const shiftOption = document.createElement('option');
      shiftOption.classList.add('shift-select');
      shiftOption.innerText = i + 1;
      shiftSelect.append(shiftOption);
    });
    shiftSelectWrapper.append(shiftSelectLabel)
    shiftSelectWrapper.append(shiftSelect);    
    this.detailsContent.append(shiftSelectWrapper);
    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('button-wrapper');
    const confirmBtn = document.createElement('button');
    confirmBtn.classList.add('confirm-remove-shift');
    confirmBtn.setAttribute('type', 'button');
    confirmBtn.setAttribute('title', 'Okay');
    confirmBtn.onclick = () => {
      let shift = shiftSelect.value;
      this.removeShift(target, shift);
    }
    confirmBtn.innerText = 'Okay';
    buttonWrapper.append(confirmBtn);
    this.detailsContent.append(buttonWrapper);
  }
  
  /**
   * Renders the Details modal for use with adding workers.
   * 
   * @target {{row, cell}}
   */
  showAddWorkerDialog(target) {
    const {
      row,
      cell
    } = target;
    this.detailsContent.innerHTML = '';
    const closeDetailsBtn = document.createElement('span');
    closeDetailsBtn.classList.add('date-details-modal-close');
    closeDetailsBtn.onclick = () => {
      this.toggleDetailsWindow();
    };
    const closeDetailsIcon = document.createElement('i');
    closeDetailsIcon.classList.add('material-icons');
    closeDetailsIcon.innerText = 'close';
    closeDetailsBtn.append(closeDetailsIcon);
    this.detailsContent.append(closeDetailsBtn);
    const detailsHeader = document.createElement('span');
    detailsHeader.setAttribute('class', 'add-worker-header');
    detailsHeader.innerText = 'Enter Worker';
    const workerInput = document.createElement('input');
    workerInput.setAttribute('id', 'new-worker-input');
    workerInput.setAttribute('type', 'text');
    workerInput.setAttribute('placeholder', 'John Doe');
    this.detailsContent.append(detailsHeader);
    this.detailsContent.append(workerInput);
    const shiftSelectWrapper = document.createElement('div');
    shiftSelectWrapper.classList.add('shift-select-wrapper');
    const shiftSelectLabel = document.createElement('span');
    shiftSelectLabel.classList.add('shift-select-label');
    shiftSelectLabel.innerText = 'Select a shift from the dropdown'
    const shiftSelect = document.createElement('select');
    shiftSelect.classList.add('shift-select');
    this.workweeks[row].days[cell].shifts.forEach((shift, i) => {
      const shiftOption = document.createElement('option');
      shiftOption.classList.add('shift-select');
      shiftOption.innerText = i + 1;
      shiftSelect.append(shiftOption);
    });
    shiftSelectWrapper.append(shiftSelectLabel)
    shiftSelectWrapper.append(shiftSelect);
    this.detailsContent.append(shiftSelectWrapper);
    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('button-wrapper');
    const confirmBtn = document.createElement('button');
    confirmBtn.classList.add('confirm-add-worker');
    confirmBtn.setAttribute('type', 'button');
    confirmBtn.setAttribute('title', 'Okay');
    confirmBtn.onclick = () => {
      let shift = shiftSelect.value;
      let worker = workerInput.value;
      this.addWorkerToShift(target, shift, worker);
    }
    confirmBtn.innerText = 'Okay';
    buttonWrapper.append(confirmBtn);
    this.detailsContent.append(buttonWrapper);
  }
  
  /**
   * Renders the Details modal for use with removing workers.
   * 
   * @target {{row, cell}}
   */
  showRemoveWorkerDialog(target) {
    const {
      row,
      cell
    } = target;
    this.detailsContent.innerHTML = '';
    const closeDetailsBtn = document.createElement('span');
    closeDetailsBtn.classList.add('date-details-modal-close');
    closeDetailsBtn.onclick = () => {
      this.toggleDetailsWindow();
    };
    const closeDetailsIcon = document.createElement('i');
    closeDetailsIcon.classList.add('material-icons');
    closeDetailsIcon.innerText = 'close';
    closeDetailsBtn.append(closeDetailsIcon);
    this.detailsContent.append(closeDetailsBtn);
    const detailsHeader = document.createElement('span');
    detailsHeader.setAttribute('class', 'remove-worker-header');
    detailsHeader.innerText = 'Enter Worker';
    const workerInput = document.createElement('input');
    workerInput.setAttribute('id', 'remove-worker-input');
    workerInput.setAttribute('type', 'text');
    workerInput.setAttribute('placeholder', 'John Doe');
    this.detailsContent.append(detailsHeader);
    this.detailsContent.append(workerInput);
    const shiftSelectWrapper = document.createElement('div');
    shiftSelectWrapper.classList.add('shift-select-wrapper');
    const shiftSelectLabel = document.createElement('span');
    shiftSelectLabel.classList.add('shift-select-label');
    shiftSelectLabel.innerText = 'Select a shift from the dropdown'
    const shiftSelect = document.createElement('select');
    shiftSelect.classList.add('shift-select');
    this.workweeks[row].days[cell].shifts.forEach((shift, i) => {
      const shiftOption = document.createElement('option');
      shiftOption.classList.add('shift-select');
      shiftOption.innerText = i + 1;
      shiftSelect.append(shiftOption);
    });
    shiftSelectWrapper.append(shiftSelectLabel)
    shiftSelectWrapper.append(shiftSelect);
    this.detailsContent.append(shiftSelectWrapper);
    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('button-wrapper');
    const confirmBtn = document.createElement('button');
    confirmBtn.classList.add('confirm-add-worker');
    confirmBtn.setAttribute('type', 'button');
    confirmBtn.setAttribute('title', 'Okay');
    confirmBtn.onclick = () => {
      let shift = shiftSelect.value;
      let worker = workerInput.value;
      this.removeWorkerFromShift(target, shift, worker);
    }
    confirmBtn.innerText = 'Okay';
    buttonWrapper.append(confirmBtn);
    this.detailsContent.append(buttonWrapper);
  }

  /**
   * Toggles visibilty of the Details modal.
   * 
   * @workday {Workday}
   * @target {{row, cell}} 
   */
  toggleDetailsWindow(workday = {}, target = {}) {
    if (this.detailsWindow.classList.contains('open')) {
      this.detailsWindow.classList.remove('open');
      this.detailsContent.innerHTML = '';
    } else {
      this.detailsWindow.classList.add('open');
      this.renderDateDetails(workday, target);
    }
  }

  /**
   * Renders the Details modal with information on
   * the current Workday.
   * 
   * @workday {Workday}
   * @target {{row, cell}} 
   */
  renderDateDetails(workday = {}, target = {}) {
    this.detailsContent.innerHTML = '';
    const closeDetailsBtn = document.createElement('span');
    closeDetailsBtn.classList.add('date-details-modal-close');
    closeDetailsBtn.onclick = () => {
      this.toggleDetailsWindow();
    };
    const closeDetailsIcon = document.createElement('i');
    closeDetailsIcon.classList.add('material-icons');
    closeDetailsIcon.innerText = 'close';
    closeDetailsBtn.append(closeDetailsIcon);
    this.detailsContent.append(closeDetailsBtn);
    const addShiftBtn = document.createElement('button');
    addShiftBtn.classList.add('add-shift');
    addShiftBtn.setAttribute('type', 'button');
    addShiftBtn.setAttribute('title', 'Add Shift');
    addShiftBtn.onclick = () => {
      this.addShift(target);
    };
    addShiftBtn.innerText = 'Add Shift';
    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('button-wrapper');
    if (workday.shifts.length) {
      const detailsHeader = document.createElement('div');
      detailsHeader.setAttribute('id', 'date-details-header');
      const shiftTables = document.createElement('div');
      shiftTables.setAttribute('id', 'shifts');
      this.detailsContent.append(detailsHeader);
      this.detailsContent.append(shiftTables);
      const dateLabel = document.createElement('span');
      dateLabel.classList.add('date-label');
      dateLabel.innerText = `Date: ${workday.date.toLocaleDateString()}`
      const numShifts = document.createElement('span');
      numShifts.classList.add('num-shifts-label');
      numShifts.innerText = `Number of Shifts: ${workday.shifts.length}`
      detailsHeader.append(dateLabel);
      detailsHeader.append(numShifts);
      let newShift, shiftInfo, shiftLabel, shiftWorkers, workersList;
      workday.shifts.forEach((shift, i) => {
        newShift = document.createElement('div');
        newShift.classList.add(`shift-${i}`);
        shiftInfo = document.createElement('div');
        shiftInfo.classList.add('shift-info');
        shiftLabel = document.createElement('span');
        shiftLabel.classList.add('shift-label');
        shiftLabel.innerText = `Shift #${i+1}`;
        shiftWorkers = document.createElement('span');
        shiftWorkers.classList.add('shift-workers');
        shiftWorkers.innerHTML = `<strong>Workers On:</strong> ${shift.workersOn} | <strong>Workers Needed:</strong> ${shift.workersNeeded}`;
        workersList = document.createElement('ul');
        workersList.classList.add(`workers-${i}`);
        shift.workers.forEach((worker, i) => {
          workersList.append(document.createElement('li'));
          workersList.children[i].classList.add('worker');
          workersList.children[i].innerText = worker;
        });
        shiftInfo.append(shiftLabel);
        shiftInfo.append(shiftWorkers);
        newShift.append(shiftInfo);
        newShift.append(workersList);
        shiftTables.append(newShift);
      });
      const addWorkerBtn = document.createElement('button');
      addWorkerBtn.classList.add('add-worker');
      addWorkerBtn.setAttribute('type', 'button');
      addWorkerBtn.setAttribute('title', 'Add Worker');
      addWorkerBtn.onclick = () => {
        this.showAddWorkerDialog(target);
      }
      addWorkerBtn.innerText = 'Add Worker';
      const removeWorkerBtn = document.createElement('button');
      removeWorkerBtn.classList.add('remove-worker');
      removeWorkerBtn.setAttribute('type', 'button');
      removeWorkerBtn.setAttribute('title', 'Remove Worker');
      removeWorkerBtn.onclick = () => {
        this.showRemoveWorkerDialog(target);
      }
      removeWorkerBtn.innerText = 'Remove Worker';
      const removeShiftBtn = document.createElement('button');
      removeShiftBtn.classList.add('remove-shift');
      removeShiftBtn.setAttribute('type', 'button');
      removeShiftBtn.setAttribute('title', 'Remove Shift');
      removeShiftBtn.onclick = () => {
      	this.showRemoveShiftDialog(target)
      }
      removeShiftBtn.innerText = 'Remove Shift'
      buttonWrapper.append(addShiftBtn);
      buttonWrapper.append(addWorkerBtn);
      buttonWrapper.append(removeShiftBtn);
      buttonWrapper.append(removeWorkerBtn);
      newShift.append(buttonWrapper);
    } else {
      const noShiftsHeader = document.createElement('span');
      noShiftsHeader.classList.add('no-shifts-header');
      noShiftsHeader.innerText = 'There are currently no shifts scheduled on the selected date.';
      this.detailsContent.append(noShiftsHeader);
      buttonWrapper.append(addShiftBtn);
      this.detailsContent.append(buttonWrapper);
    }
  }

  /**
   * Re-renders the grid view contents of a specified 
   * date / cell.
   * 
   * @target {{row, cell}}
   */
  redrawCell(target) {
    const {
      row,
      cell
    } = target;
    const workday = this.workweeks[row].days[cell];
    document.getElementById(`day-${row}-${cell}`).innerHTML = `<span class='date-label'>${workday.date.getDate()}</span>
      <span class='shift-label'>Shifts: ${workday.shifts.length}</span>
		`;
  }

  // TODO
  //  => ignore clicks with no dates on them
  init() {
    let currentWeek = 0;
    this.workweeks.forEach(workweek => {
      workweek.days.forEach(workday => {
        workday.date.getMonth() === this.month && (
          document.getElementById(`day-${currentWeek}-${workday.date.getDay()}`).innerHTML = `<span class='date-label'>${workday.date.getDate()}</span>
            <span class='shift-label'>Shifts: ${workday.shifts.length}</span>
          `
        );
        if (workday.date.getDay() === 6) {
          currentWeek += 1
        }
      });
    });

    document.getElementById('date-picker').addEventListener('click', event => {
      let selectedDay = undefined;
      event.target.tagName.toLowerCase() === 'span' ? selectedDay = event.target.parentNode : selectedDay = event.target;
      const regex = /day-(\d+)-(\d+)/g;
      let target = regex.exec(selectedDay.id);
      const row = target[1];
      const cell = target[2];
      target = {
        row: row,
        cell: cell,
      }

      selectedDay = this.workweeks[row].days[cell];
      this.toggleDetailsWindow(selectedDay, target);
    });

    document.getElementById('date-details-modal').addEventListener('click', event => {
      event.target.id === 'date-details-modal' && this.toggleDetailsWindow();
    });
  }
}