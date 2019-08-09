import React, { Component } from 'react';

import './style.css';

export default class Calendar extends Component{
  constructor(props) {
    super(props);

    this.state = {
      calendar: props.calendar,
    };
  }

  componentDidMount() {
    let { calendar } = this.state;
    calendar = new calendar();
  }

  render() {
    return (
      <>
        <h1>Calendar Page</h1>
        <div id='date-picker'>
          <div id='days-of-week' className='row'>
            <div>SUN</div>
            <div>MON</div>
            <div>TUE</div>
            <div>WED</div>
            <div>THU</div>
            <div>FRI</div>
            <div>SAT</div>
          </div>
          <div id='row0' className='row'>
            <div id='day-0-0'></div>
            <div id='day-0-1'></div>
            <div id='day-0-2'></div>
            <div id='day-0-3'></div>
            <div id='day-0-4'></div>
            <div id='day-0-5'></div>
            <div id='day-0-6'></div>
          </div>
          <div id='row1' className='row'>
            <div id='day-1-0'></div>
            <div id='day-1-1'></div>
            <div id='day-1-2'></div>
            <div id='day-1-3'></div>
            <div id='day-1-4'></div>
            <div id='day-1-5'></div>
            <div id='day-1-6'></div>
          </div>
          <div id='row2' className='row'>
            <div id='day-2-0'></div>
            <div id='day-2-1'></div>
            <div id='day-2-2'></div>
            <div id='day-2-3'></div>
            <div id='day-2-4'></div>
            <div id='day-2-5'></div>
            <div id='day-2-6'></div>
          </div>
          <div id='row3' className='row'>
            <div id='day-3-0'></div>
            <div id='day-3-1'></div>
            <div id='day-3-2'></div>
            <div id='day-3-3'></div>
            <div id='day-3-4'></div>
            <div id='day-3-5'></div>
            <div id='day-3-6'></div>
          </div>
          <div id='row4' className='row'>
            <div id='day-4-0'></div>
            <div id='day-4-1'></div>
            <div id='day-4-2'></div>
            <div id='day-4-3'></div>
            <div id='day-4-4'></div>
            <div id='day-4-5'></div>
            <div id='day-4-6'></div>
          </div>
          <div id='row5' className='row'>
            <div id='day-5-0'></div>
            <div id='day-5-1'></div>
            <div id='day-5-2'></div>
            <div id='day-5-3'></div>
            <div id='day-5-4'></div>
            <div id='day-5-5'></div>
            <div id='day-5-6'></div>
          </div>
        </div>
  
        <div id='date-details-modal'>
          <div className='date-details-content'>
          </div>
        </div>
      </>
    );
  };  
};
