import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Box } from '@mui/material';
import './AdminLogin.css';

const AdminComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Username:', username, 'Password:', password);
    // Add your login logic here, using the username and password states
  };

  return (
    <Paper elevation={0} className="Admin">
      <div className="Rectangle93"></div>
      <Box className="NavigationBar">
        <div className="Register">Register</div>
        <div className="Logo">
          <img className="A13" src="./src/Pictures/Qwikley.png" alt="Logo" />
          <div className="Line4"></div>
          <Typography variant="caption" className="ForUseByChedTcCpe">
            For use by CHED-TC CpE
          </Typography>
        </div>
      </Box>
      <Box className="LoginBlock">
        <Box className="Frame1">
          <Typography variant="h4" className="AdministratorLogIn">
            Administrator Log In
          </Typography>
          <Typography variant="body1" className="PleaseEnterYourDetails">
            Please enter your details
          </Typography>
        </Box>
        <Box className="Login">
          <form onSubmit={handleLogin}>
            <Box className="Frame1">
              <Box className="Username">
                <Typography variant="body2" className="Label">
                  Username
                </Typography>
                <TextField
                  type="text"
                  className="TextInput"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Box>
            </Box>
            <Box className="Frame1">
              <Box className="Password">
                <Typography variant="body2" className="Label">
                  Password
                </Typography>
                <TextField
                  type="password"
                  className="TextInput"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>
            </Box>
            <Box className="AppButton">
              <Box className="Frame"></Box>
              <Button type="submit" className="Text">
                Log In
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Paper>
  );
};

export default AdminComponent;
