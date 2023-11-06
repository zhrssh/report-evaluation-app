import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

const Register = () => {
  return (
    <Box className="Register">
      <Paper elevation={2} className="NavigationBar">
        <Box className="AlreadyHaveAnAccount">Already have an Account?</Box>
        <Box className="Logo">
          <img className="A13" src="src/Pictures/Qwikley.png" alt="Logo" />
          <Box className="Line4"></Box>
          <Typography className="ForUseByChedTcCpe">For use by CHED-TC CpE</Typography>
        </Box>
      </Paper>
      <Box className="Container">
        <Box className="Rectangle93">
          <Box className="LoginBlock">
            <Paper elevation={2} className="Frame1">
              <Typography variant="h4" className="SignUp">SIGN UP</Typography>
              <Typography className="EnterYourDetailsToRegister">Enter your details to register.</Typography>
            </Paper>
            <Paper elevation={2} className="Login">
              <Box className="Frame9">
                <Box className="Username">
                  <Typography className="Label">First Name</Typography>
                  <Box className="TextInput"></Box>
                </Box>
                <Box className="Username">
                  <Typography className="Label">Middle Name</Typography>
                  <Box className="TextInput"></Box>
                </Box>
                <Box className="Username">
                  <Typography className="Label">Last Name</Typography>
                  <Box className="TextInput"></Box>
                </Box>
                <Box className="Username" style={{width: '64px'}}>
                  <Typography className="Label">Suffix</Typography>
                  <Box className="TextInput"></Box>
                </Box>
              </Box>
              <Box className="Password">
                <Typography className="Label">Email Address</Typography>
                <Box className="TextInput"></Box>
              </Box>
              <Box className="Password">
                <Typography className="Label">Password</Typography>
                <Box className="TextInput"></Box>
              </Box>
              <Box className="Password">
                <Typography className="Label">Confirm Password</Typography>
                <Box className="TextInput"></Box>
              </Box>
              <Box className="Frame27">
                <Box className="AppButton">
                  <Box className="Frame"></Box>
                  <Typography className="Text">Register</Typography>
                </Box>
              </Box>
            </Paper>
            
          </Box>

        </Box>
      </Box>
          <Paper elevation={2} className="Frame8">
            <Typography className="DevelopedBy">Developed by:</Typography>
            <img className="A2" src="src/Pictures/Ademix.png" alt="Developed by" />
          </Paper>
    </Box>
  );
};

export default Register;
