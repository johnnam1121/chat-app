import React, { useEffect, useState, useRef } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DarkModeToggle from '../DarkModeToggle';
import { Grid, Typography, TextField, Paper, Box, Button, useMediaQuery } from '@mui/material'

function Chat({ socket, name, room }) {
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
      setMessageList((list) => [...list, messageData.message]); // adds new message to message list
      setMessage(''); // resets the value to an empty string after sending the message
    }
  }

  // when displayMessage is emitted from backend, useEffect is called
  useEffect(() => {
    // set the message list
    const handleDisplayMessage = (data) => {
      setMessageList((list) => [...list, data.message]);
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
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  Active Users
                  <h5>{name}</h5>
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={9} style={{ height: '75vh' }}>
              <Box ref={boxRef} sx={{ maxHeight: '70vh', overflow: 'auto' }}>
                {messageList.map((messages) => {
                  return (
                    <Typography variant='body1'>
                      {messages}
                    </Typography>
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

export default Chat


    // <div>
    //   <h1>{room}</h1>
    //   <input type='text' placeholder='some text' value={message}
    //     onChange={(event) => { setMessage(event.target.value) }}
    //     onKeyDown={(event) => { event.key === 'Enter' && sendMessage() }}
    //   />
    //   <button onClick={sendMessage}>&#9658;</button>
    //   {messageList.map((messages) => {
    //     return <h1>{messages}</h1>
    //   })}
    // </div>

  // useEffect(() => {
  //   console.log("Socket object:", socket); // Check if socket object is defined
  //   console.log("Socket connected:", socket.connected); // Check if socket is connected to server
  //   socket.on("displayMessage", (data) => {
  //     console.log(data)
  //   });
  // }, [socket]);

  // currently wathcing these videos
  // https://www.youtube.com/watch?v=ZKEqqIO7n-k&t=208s&ab_channel=WebDevSimplified
  // https://www.youtube.com/watch?v=NU-HfZY3ATQ&t=1470s&ab_channel=PedroTech
  // https://github.com/machadop1407/react-socketio-chat-app/blob/main/client/src/Chat.js