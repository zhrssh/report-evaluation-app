import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import './AdminLogin.css';

const AdminComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Username:', username, 'Password:', password);
  };

  return (
    <Box className="Admin">
      <Box className="Rectangle93"></Box>
      <Box className="NavigationBar">
        <Box className="NavigationBar"></Box>
        <Typography className="Register">Register</Typography>
        <Box className="Logo">
          <img className="A13" src="./src/Pictures/Qwikley.png" alt="Logo" />
          <Box className="Line4"></Box>
          <Typography className="ForUseByChedTcCpe">For use by CHED-TC CpE</Typography>
        </Box>
      </Box>
      <Box className="LoginBlock">
        <Paper className="Frame1">
          <Typography className="AdministratorLogIn">Administrator Log In</Typography>
          <Typography className="PleaseEnterYourDetails">Please enter your details</Typography>
        </Paper>
        <Box className="Login">
          <form onSubmit={handleLogin}>
            <Paper className="Frame1">
              <Box className="Username">
                <Typography className="Label">Username</Typography>
                <TextField
                  type="text"
                  className="TextInput"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Box>
            </Paper>
            <Paper className="Frame1">
              <Box className="Password">
                <Typography className="Label">Password</Typography>
                <TextField
                  type="password"
                  className="TextInput"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>
            </Paper>
            <Box className="AppButton">
              <Paper className="Frame"></Paper>
              <Button type="submit" className="Text">
                Log In
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminComponent;
