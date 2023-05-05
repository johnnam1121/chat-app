import { Box, Grid, Paper, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ActiveUsers from '../ActiveUsers';
import DarkModeToggle from '../DarkModeToggle';
import MessageBox from '../MessageBox';
import TextInput from '../TextInput';

export default function ChatPage({ socket, name, room }) {
  const [message, setMessage] = useState('')
  const [messageList, setMessageList] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [activeUsers, setActiveUsers] = useState([]);
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      primary: {
        main: darkMode ? '#222831' : '#EEF1FF',
        light: darkMode ? '#0C7D85' : '#AAC4FF',
      },
      secondary: {
        main: darkMode ? '#222831' : '#D2DAFF',
        light: darkMode ? '#0C7D85' : '#B1B2FF',

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
      },
      h6: {
        color: darkMode ? '#EEEEEE' : '#8CC0DE',
      },
      body1: {
        color: darkMode ? '#CCCCCC' : '#393E46',
        fontSize: '3vh',
      },
      body2: {
        color: darkMode ? '#EEEEEE' : '#AAC4FF',
        fontSize: '1.5vh',
      },
    },
  });

  const modeColor = {
    lightModeColor: '#EEEEEE',
    darkModeColor: '#393E46',
  };

  // make sure user logs in first before being able to access chat page
  useEffect(() => {
    if (name == '') {
      navigate('/')
    }
  }, [name]);

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

  // handle disconnect message when user leaves
  useEffect(() => {
    const handleDisconnectMessage = async (disconnectUser) => {
      if (disconnectUser !== '') {
        const messageData = {
          name: 'Chat-bot',
          room: room,
          message: `${disconnectUser} has left the chat.`,
          time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
        }
        setMessageList((list) => [...list, messageData]); // adds new message content to message list
        setMessage(''); // resets the value to an empty string after sending the message  
      }
    };
    socket.on("userDisconnected", handleDisconnectMessage);

    // Clean up the event listener when the component is unmounted
    return () => {
      socket.off("userDisconnected", handleDisconnectMessage);
    };
  }, [socket]);

  // handle connect message when user joins
  useEffect(() => {
    const handleConnectionMessage = async (data) => {
      if (data !== '') {
        const messageData = {
          name: 'Chat-bot',
          room: data.room,
          message: `${data.name} has joined the chat!`,
          time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
        }
        setMessageList((list) => [...list, messageData]); // adds new message content to message list
        setMessage(''); // resets the value to an empty string after sending the message  
      }
    };
    socket.on("newConnection", handleConnectionMessage);

    // Clean up the event listener when the component is unmounted
    return () => {
      socket.off("newConnection", handleConnectionMessage);
    };
  }, [socket]);


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

  // handles activeusers
  useEffect(() => {
    // Update the active users list when it is received from the server
    const handleUpdateActiveUsers = (activeUsers) => {
      setActiveUsers(activeUsers);
    };
    socket.on("updateActiveUsers", handleUpdateActiveUsers);

    // Clean up the event listener when the component is unmounted
    return () => {
      socket.off("updateActiveUsers", handleUpdateActiveUsers);
    };
  }, [socket]);

  const containerStyle = { height: '100vh', display: 'flex', flexGrow: 1 };
  const paperStyles = {
    border: '1px',
    borderStyle: 'solid',
    borderColor: theme.palette.secondary.light,
    backgroundColor: theme.palette.primary.main,
    marginRight: '1vw',
    marginTop: '1vh'
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ bgcolor: theme.palette.primary.main, minHeight: "100vh" }}>
        <Box sx={{ flexGrow: 1, zIndex: '2', display: 'flex', flexDirection: 'column' }}>
          <Grid container sx={containerStyle}>
            <Grid item xs={12} md={12} sx={{ ml: '1vw', height: '10vh' }}>
              <Paper sx={paperStyles}>
                <Typography variant="h1" sx={{ display: "flex", justifyContent: "space-between" }}>
                  <div>Hi {name}!</div>
                  <div><DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} modeColor={modeColor} /></div>
                </Typography>
                <Typography variant="h1" sx={{ display: "flex", justifyContent: "space-between" }}>
                  <div>Current Chat Room: {room}</div>
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <ActiveUsers theme={theme} activeUsers={activeUsers} />
            </Grid>
            <Grid item xs={12} md={9}>
              <MessageBox socket={socket} name={name} room={room} message={message} messageList={messageList} theme={theme} />
            </Grid>
            <Grid item xs={3} md={3}></Grid>
            <Grid item xs={12} md={9} sx={{ height: "10vh" }}>
              <TextInput message={message} sendMessage={sendMessage} setMessage={setMessage} theme={theme} />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </ThemeProvider>
  )
}
