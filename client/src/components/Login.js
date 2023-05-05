import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';

export default function Login({ setName, setRoom, joinRoom, theme }) {
  const roomOptions = [
    {
      value: 'blank',
      label: '',
    },
    {
      value: 'Namily',
      label: 'Namily',
    },
    {
      value: 'Spring Woods',
      label: 'Spring Woods',
    },
    {
      value: 'LPhiE',
      label: 'LPhiE',
    },
    {
      value: 'SIS',
      label: 'SIS',
    },
  ];

  // resets the name and room
  useEffect(() => {
    setName('');
    setRoom('');
  }, [setName, setRoom]);


  const button = { textAlign: 'center', alignItems: 'center', color: theme.palette.secondary.main, borderColor: theme.palette.secondary.main };

  return (
    <Box>
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
        {roomOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField><br />
      <Button sx={button} variant="outlined" onClick={joinRoom}>Enter</Button>
    </Box>
  )
}