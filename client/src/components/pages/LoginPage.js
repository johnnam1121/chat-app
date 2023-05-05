import { Box, Grid, Paper } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DarkModeToggle from '../DarkModeToggle';
import Login from '../Login';


export default function LoginPage({ socket, name, setName, room, setRoom }) {
  const [darkMode, setDarkMode] = useState(false);
  
  const theme = createTheme({
    palette: {
      primary: {
        main: darkMode ? '#222831' : '#EEF1FF',
      },
      secondary: {
        main: darkMode ? '#EEEEEE' : '#AAC4FF',
      },
      mode: darkMode ? 'dark' : 'light'
    },
    typography: {
      fontFamily: 'Quicksand',
      h1: {
        color: darkMode ? '#00ADB5' : '#B1B2FF',
        fontSize: '10vh',
        // '@media (max-width: 768px)': {
        //   fontSize: '10vw',
        // },
      },
      h6: {
        color: darkMode ? '#EEEEEE' : '#8CC0DE',
        // fontSize: '3vh',
        // '@media (max-width: 768px)': {
        //   fontSize: '3vw',
        // },
      },
    },
  });

  const modeColor = {
    lightModeColor: '#EEEEEE',
    darkModeColor: '#393E46',
  };

  const navigate = useNavigate();
  const containerStyle = { height: '100vh', display: 'flex', alignItems: 'center', textAlign: 'center', };

  // once info is filled out, emit JoinedRoom with name and room
  function joinRoom() {
    if (name !== '') {
      if (room !== '') {
        socket.emit('JoinedRoom', { name, room });
        navigate('/chat');
      } else {
        alert('Please choose a chatroom to enter');
      }
    } else {
      alert('Please enter a username');
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ bgcolor: theme.palette.primary.main, minHeight: "100vh" }}>
        <Box sx={{ flexGrow: 1, zIndex: '2' }}>
          <Grid container sx={containerStyle}>
            <Grid item xs={false} sm={3} />
            <Grid item xs={12} sm={6}>
              <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} modeColor={modeColor} />
              <Login setName={setName} setRoom={setRoom} joinRoom={joinRoom} theme={theme} />
            </Grid>
            <Grid item xs={false} sm={3} />
          </Grid>
        </Box>
      </Paper>
    </ThemeProvider >
  )
}