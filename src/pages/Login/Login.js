import React from 'react';

// temp
import { Link } from 'react-router-dom';

import './style.css';

export default function Login() {
  return (
    <div id='login-page'>
      <h1>Login Page</h1>

      <Link to='/home' className='pure-button logon-btn' type='submit' title='Login'>Login</Link>
    </div>
  );
};
