import { Box, Button, TextField } from '@mui/material';
import React from 'react';

export default function TextInput({ message, sendMessage, setMessage, theme }) {
  const buttonStyles = {
    flexGrow: 1,
    color: theme.palette.primary.light,
    borderColor: theme.palette.primary.light,
    boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.3)'
  };
  const inputStyles = {
    mr: 1,
    flexGrow: 1,
    color: theme.palette.primary.main,
    outlineColor: theme.palette.primary.main,
    boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.3)'
  };

  return (
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
        sx={inputStyles}
      />
      <Button sx={buttonStyles} variant="contained" color="primary" onClick={sendMessage}>
        Send
      </Button>
    </Box>
  )
}
