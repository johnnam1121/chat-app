import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';

function Login({ setName, setRoom, joinRoom, theme }) {
  const roomOptions = [
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

export default Login