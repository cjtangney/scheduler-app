import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// modules
import DatePicker from  './modules/DatePicker/DatePicker.js';

// App-level CSS
import './index.css';

// components
import Sidebar from './components/Sidebar';

// pages
import Login from './pages/Login';
import Home from './pages/Home';
import Calendar from './pages/Calendar';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      calendar: DatePicker,
    };
  };

  render() {
    return (
      <Router>
        <Sidebar />
        <section id='app-pane'>
          <Route exact path='/' render={history => (
            <Login {...history} />
          )} />
          <Route exact path='/home' render={history => (
            <Home {...history} />
          )} />
          <Route exact path='/calendar' render={history => (
            <Calendar {...history} calendar={this.state.calendar} />
          )} />
        </section>
      </Router>
    );
  };
};

ReactDOM.render(<App />, document.getElementById('root'));
