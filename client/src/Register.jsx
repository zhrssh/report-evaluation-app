import React from 'react';
import './Register.css';

const Register = () => {
  return (
    <div className="Register">
      <div className="NavigationBar">
        <div className="NavigationBar"></div>
        <div className="AlreadyHaveAnAccount">Already have an Account?</div>
        <div className="Logo">
          <img className="A13" src="src/Pictures/Qwikley.png" alt="Logo" />
          <div className="Line4"></div>
          <div className="ForUseByChedTcCpe">For use by CHED-TC CpE</div>
        </div>
      </div>
      <div className="Rectangle93"></div>
      <div className="LoginBlock">
        <div className="Frame1">
          <div className="SignUp">SIGN UP</div>
          <div className="EnterYourDetailsToRegister">Enter your details to register.</div>
        </div>
        <div className="Login">
          <div className="Frame9">
            <div className="Username">
              <div className="Label">First Name</div>
              <div className="TextInput"></div>
            </div>
            <div className="Username">
              <div className="Label">Middle Name</div>
              <div className="TextInput"></div>
            </div>
            <div className="Username">
              <div className="Label">Last Name</div>
              <div className="TextInput"></div>
            </div>
            <div className="Username" style={{width: '64px'}}>
              <div className="Label">Suffix</div>
              <div className="TextInput"></div>
            </div>
          </div>
          <div className="Password">
            <div className="Label">Email Address</div>
            <div className="TextInput"></div>
          </div>
          <div className="Password">
            <div className="Label">Password</div>
            <div className="TextInput"></div>
          </div>
          <div className="Password">
            <div className="Label">Confirm Password</div>
            <div className="TextInput"></div>
          </div>
          <div className="Frame27">
            <div className="AppButton">
              <div className="Frame"></div>
              <div className="Text">Register</div>
            </div>
          </div>
        </div>
      </div>
      <div className="Frame8">
        <div className="DevelopedBy">Developed by:</div>
        <img className="A2" src="src/Pictures/Ademix.png" alt="Developed by" />
      </div>
    </div>
  );
};

export default Register;
