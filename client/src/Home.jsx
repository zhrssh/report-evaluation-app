import React from 'react';
import './Home.css';

function Home() {   
  return (
    <div className="Home">
      <div className="Logo">
        <img className="A13" src="./src/Pictures/Qwikley.png" alt="Logo" />
        <div className="Line4" />
      </div>
      <div className="NavigationBar">
        <div className="NavigationBarBackground" />
        <div className="Register">Register</div>
      </div>
      <div className="Group1Container">
        <div className="WelcomeBack">Welcome back!</div>
        <div className="PleaseEnterYourDetails">Please enter your details</div>
        <div className="Username">
         <div className="Label">Username</div>
        <input
            type="text"
            className="TextInput"
            placeholder="Enter your username"  />
        </div>
        <div className="Password">
         <div className="Label">Password</div>
        <input
            type="password" 
            className="TextInput"
             placeholder="Enter your password"/>
         </div>
         <div className="AppButton">
         <div className="Frame"></div>
         <div className="Text">Log In</div>
        </div>
        <div className="NeedAnAccountRegisterNow">
        <span>Need an account? </span>
         <span>Register now.</span>
        </div>
        </div>
      <div className="Frame2" />
      <div className="Group1">
        <img className="LaptopImage" src="./src/Pictures/CHED1.png" alt="Laptop" />
      </div>
      <div className="Frame8">
      <div className="Group2">
        <img className="A2" src="./src/Pictures/Ademix.png" alt="Logo" />
      </div>
      </div>
    </div>
  );
}

export default Home;
