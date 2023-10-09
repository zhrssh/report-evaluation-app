import React, { useState } from 'react';
import './AdminLogin.css';

const AdminComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault(); // Prevents the form from submitting (since it's a single page application)
    // Add your login logic here, using the username and password states
    console.log('Username:', username, 'Password:', password);
  };

  return (
    <div className="Admin">
      <div className="Rectangle93"></div>
      <div className="NavigationBar">
        <div className="NavigationBar"></div>
        <div className="Register">Register</div>
        <div className="Logo">
          <img className="A13" src="./src/Pictures/Qwikley.png" alt="Logo" />
          <div className="Line4"></div>
          <div className="ForUseByChedTcCpe">For use by CHED-TC CpE</div>
        </div>
      </div>
      <div className="LoginBlock">
        <div className="Frame1">
          <div className="AdministratorLogIn">Administrator Log In</div>
          <div className="PleaseEnterYourDetails">Please enter your details</div>
        </div>
        <div className="Login">
          <form onSubmit={handleLogin}>
            <div className="Frame1">
              <div className="Username">
                <div className="Label">Username</div>
                <input
                  type="text"
                  className="TextInput"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="Frame1">
              <div className="Password">
                <div className="Label">Password</div>
                <input
                  type="password"
                  className="TextInput"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="AppButton">
              <div className="Frame"></div>
              <button type="submit" className="Text">
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminComponent;
