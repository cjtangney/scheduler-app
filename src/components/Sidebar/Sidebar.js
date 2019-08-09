import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

export default function Sidebar() {
  return (
    <nav id='side-bar'>
      <ul>
        <Link to='/home'><li>Home</li></Link>
        <Link to='/calendar'><li>Calendar</li></Link>
        <Link to='/'><li>Profile</li></Link>
      </ul>
    </nav>
  );
};
