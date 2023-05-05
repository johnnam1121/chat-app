import { Box, Paper, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useRef } from 'react';

export default function MessageBox({ socket, name, messageList, theme }) {
  const isMobile = useMediaQuery("(max-width: 650px)");
  const boxRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the container when new messages arrive
    const box = boxRef.current;
    box.scrollTop = box.scrollHeight;
  }, [messageList]);

  const paperStyles = {
    border: '1px',
    borderStyle: 'solid',
    borderColor: theme.palette.secondary.light,
    backgroundColor: theme.palette.primary.main,
    marginLeft: '1vw',
    marginRight: '1vw',
    marginTop: '1vh',
    minHeight: isMobile ? '65vh' : '70vh',
    overflow: 'auto',
  }

  return (
    <Paper sx={paperStyles}>
      <Box ref={boxRef} sx={{ maxHeight: isMobile ? '65vh' : '70vh', overflow: 'auto' }}>
        {messageList.map((message, index) => {
          const id = name === message.name ? "you" : "other";
          const backgroundColor = index % 2 === 0 ? theme.palette.primary.light : theme.palette.secondary.main;
          return (
            <div key={index} id={id}>
              <div style={{ textAlign: id === "you" ? "right" : "left" }}>
                <Typography variant='body1' sx={{ backgroundColor }}>
                  {message.message}
                </Typography>
                <Typography variant='body2'>{message.time} {message.name} &#160; </Typography>
              </div>
            </div>
          );
        })}
      </Box>
    </Paper>
  )
}
