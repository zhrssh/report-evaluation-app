import React from 'react';
import { Paper, Typography, Box, IconButton } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from './Pictures/tip1.png';
import AppButtonContained from './buttons/AppButtonContained';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    right: 0,
    left: '70%',
    top: '173px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '20px',
  },
  laptopImage: {
    width: '100%',
    maxWidth: '100%',
    height: 'auto',
  },
  details: {
    width: '300px',
  },
  welcomeBack: {
    color: '#000000',
    fontSize: '40px',
    fontFamily: 'Inter',
    fontWeight: 800,
    lineHeight: '19px',
  },
  pleaseEnterDetails: {
    color: '#000000',
    left: '150%',
    fontSize: '14px',
    fontFamily: 'Inter',
    fontWeight: 400,
    wordWrap: 'break-word',
  },
  label: {
    color: '#545f71',
    fontSize: '14px',
    fontFamily: 'Inter',
    fontWeight: 400,
    lineHeight: '19px',
  },
  textInput: {
    width: '100%',
    height: '30px',
    background: '#efefef',
    border: '2px solid #0033a0',
  },
  appButton: {
    position: 'relative',
    width: '50%',
    height: '60px',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  frame: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    background: '#0033a0',
    borderRadius: '30px',
  },
  buttonText: {
    position: 'absolute',
    width: '195.50px',
    left: '50px',
    top: '18px',
    textAlign: 'center',
    color: '#efefef',
    fontSize: '20px',
    fontFamily: 'Inter',
    fontWeight: 700,
    wordWrap: 'break-word',
  },
  registerNow: {
    color: '#545f71',
    left: '-40%',
    fontSize: '14px',
    fontFamily: 'Inter',
    fontWeight: 400,
    wordWrap: 'break-word',
  },
  group1: {
    position: 'absolute',
    top: '60px',
    left: '300px',
  },
  navigationBar: {
    position: 'relative',
    fontSize: '20px',
    fontWeight: 700,
  },
  register: {
    position: 'absolute',
    top: '-80px',
    right: '150px',
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <Paper elevation={2} className="flex-column m-auto p-4 gap-4 justify-between items-center">
      <Box className="flex-row">
        <img src={logo} alt="Logo" className="h-10" />
        <Box className="w-full h-0.5 bg-text" />
        <Typography variant="caption" className="text-text">
          Welcome back! Please enter your details.
        </Typography>
        <Box className="flex-column gap-4">
          <Box className="flex-row gap-4">
            <div className={classes.container}>
              <Typography className={classes.label}>Username</Typography>
              <input type="text" className={classes.textInput} placeholder="Enter your username" />
            </div>
            <div className={classes.details}>
              <Typography className={classes.label}>Password</Typography>
              <input type="password" className={classes.textInput} placeholder="Enter your password" />
            </div>
          </Box>
          <AppButtonContained label="Log In" />
          <Typography className={classes.registerNow}>
            <span>Need an account? </span>
            <span>Register now.</span>
          </Typography>
        </Box>
      </Box>
      <Box className="flex-row gap-4">
        <Box className="flex-row gap-1">
          <IconButton>
            <HelpIcon />
          </IconButton>
          <IconButton>
            <InfoIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </Box>
        <AppButtonContained startIcon={<LogoutIcon />} label="Log out" />
      </Box>
    </Paper>
  );
}

export default Home;
