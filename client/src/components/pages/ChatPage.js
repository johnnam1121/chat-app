import { Box, Button, Grid, Paper, TextField, Typography, useMediaQuery } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useEffect, useRef, useState } from 'react';
import DarkModeToggle from '../DarkModeToggle';

export default function ChatPage({ socket, name, room }) {
  const isMobile = useMediaQuery("(max-width: 650px)");
  const [message, setMessage] = useState('')
  const [messageList, setMessageList] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the container when new messages arrive
    const box = boxRef.current;
    box.scrollTop = box.scrollHeight;
  }, [messageList]);

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
        fontSize: '5vh',
        '@media (max-width: 768px)': {
          fontSize: '5vw',
        },
      },
      h2: {
        color: darkMode ? '#00ADB5' : '#B1B2FF',
        fontSize: '5vh',
        '@media (max-width: 768px)': {
          fontSize: '5vw',
        },
      },
      h5: {
        color: darkMode ? '#EEEEEE' : '#8CC0DE',
        // fontSize: '3vh',
        // '@media (max-width: 768px)': {
        //   fontSize: '3vw',
        // },
      },
      h6: {
        color: darkMode ? '#EEEEEE' : '#8CC0DE',
        // fontSize: '3vh',
        // '@media (max-width: 768px)': {
        //   fontSize: '3vw',
        // },
      },
      body1: {
        color: darkMode ? '#EEEEEE' : '#AAC4FF',
        fontSize: '3vh',
        // '@media (max-width: 768px)': {
        //   fontSize: '3vw',
        // },
      },
      body2: {
        color: darkMode ? '#EEEEEE' : '#AAC4FF',
        fontSize: '1.3vh',
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

  // send message function used to send the message with some information
  const sendMessage = async () => {
    if (message !== '') {
      const messageData = {
        name: name,
        room: room,
        message: message,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      }

      await socket.emit('newMessage', messageData);
      setMessageList((list) => [...list, messageData]); // adds new message content to message list
      setMessage(''); // resets the value to an empty string after sending the message
    }
  }

  // when displayMessage is emitted from backend, useEffect is called
  useEffect(() => {
    // set the message list
    const handleDisplayMessage = (data) => {
      setMessageList((list) => [...list, data]);
    };
    socket.on("displayMessage", handleDisplayMessage);
    // reset the socket so it doesn't get recieved multiple times
    return () => {
      socket.off("displayMessage", handleDisplayMessage);
    };
  }, [socket]);

  const containerStyle = { height: '100vh', display: 'flex' };
  const button = { color: theme.palette.secondary.main, borderColor: theme.palette.secondary.main };

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ bgcolor: theme.palette.primary.main, minHeight: "100vh" }}>
        <Box sx={{ flexGrow: 1, zIndex: '2', height: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Grid container sx={containerStyle} style={{ flexGrow: 1 }}>
            <Grid item xs={12} sm={12} sx={{ ml: '1vh', height: '10vh' }}>
              <Typography variant="h1" style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Current Chat Room: {room}</div>
                <div><DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} modeColor={modeColor} /></div>
              </Typography>
            </Grid>
            <Grid item xs={0} sm={3} style={{ height: '75vh' }}>
              {isMobile ? null : (
                <Typography variant="h2" sx={{ textAlign: "center" }}>
                  Active Users
                  {name}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={9} style={{ height: '75vh' }}>
              <Box ref={boxRef} sx={{ maxHeight: '70vh', overflow: 'auto' }}>
                {messageList.map((message, index) => {
                  const id = name === message.name ? "you" : "other";
                  return (
                    <div key={index} id={id}>
                      <div style={{ textAlign: id === "you" ? "right" : "left" }}>
                        <Typography variant='body1' sx={{ bgcolor: 'pink' }}>{message.message}</Typography>
                        <Typography variant='body2'>{message.time} {message.name}</Typography>
                      </div>
                    </div>
                  )
                })}
              </Box>
            </Grid>
            <Grid item xs={3} sm={3}></Grid>
            <Grid item xs={12} sm={9} style={{ height: "10vh" }}>
              <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
                <TextField
                  placeholder="Enter your message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && sendMessage()}
                  fullWidth
                  multiline
                  rows={1}
                  variant="outlined"
                  size="small"
                  sx={{ flexGrow: 1, mr: 1 }} // Adjust the margin to create space between the TextField and Button
                />
                <Button variant="contained" color="primary" onClick={sendMessage}>
                  Send
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </ThemeProvider>
  )
}
