import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DarkModeToggle from '../DarkModeToggle';
import { Grid, Typography, TextField, Paper, Box, Button } from '@mui/material'

export default function Login({ socket, name, setName, room, setRoom }) {
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

  const currencies = [
    {
      value: 'blank',
      label: '',
    },
    {
      value: 'Option 1',
      label: 'Option 1',
    },
    {
      value: 'Option 2',
      label: 'Option 2',
    },
    {
      value: 'Option 3',
      label: 'Option 3',
    },
    {
      value: 'Option 4',
      label: 'Option 4',
    },
  ];
  const navigate = useNavigate();

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

  const containerStyle = { height: '100vh', display: 'flex', alignItems: 'center', textAlign: 'center', };
  const button = { textAlign: 'center', alignItems: 'center', color: theme.palette.secondary.main, borderColor: theme.palette.secondary.main };

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ bgcolor: theme.palette.primary.main, minHeight: "100vh" }}>
        <Box sx={{ flexGrow: 1, zIndex: '2' }}>
          <Grid container sx={containerStyle}>
            <Grid item xs={false} sm={3} />
            <Grid item xs={12} sm={6}>
              <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} modeColor={modeColor} />
              <Typography variant="h1">
                John's Chat App
              </Typography>
              <Typography variant="h6" sx={{ mb: '3vh' }}>
                Made using Node.js, SocketIO, Express, Cors
              </Typography>
              <TextField
                required
                id="name"
                label="Required"
                helperText="Please enter a username"
                onChange={(event) => {
                  setName(event.target.value);
                }}
                sx={{ mb: '2vh' }}
              />
              <TextField
                id="room"
                select
                label="Chat Room"
                defaultValue="blank"
                SelectProps={{
                  native: true,
                }}
                helperText="Please select a room"
                onChange={(event) => {
                  setRoom(event.target.value);
                }}
                sx={{ mb: '2vh' }}
              >
                {currencies.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField><br />
              <Button sx={button} variant="outlined" onClick={joinRoom}>Enter</Button>
            </Grid>
            <Grid item xs={false} sm={3} />
          </Grid>
        </Box>
      </Paper>
    </ThemeProvider >
  )
}


{/* <h3>Join A Chat</h3>
        <input
          type="text"
          placeholder="UserName"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <select onChange={(event) => {
          setRoom(event.target.value);
        }}
        >
          <option></option>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
        <button onClick={joinRoom}>Join A Room</button> */}
