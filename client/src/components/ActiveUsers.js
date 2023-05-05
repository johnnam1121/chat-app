import CircleIcon from '@mui/icons-material/Circle';
import { Box, Paper, Typography, useMediaQuery, List, ListItem } from '@mui/material';
import React, { useEffect, useRef } from 'react';

export default function ActiveUsers({ theme, activeUsers }) {
  const isMobile = useMediaQuery("(max-width: 650px)");
  const boxRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the container when new messages arrive
    const box = boxRef.current;
    box.scrollTop = 0;
  }, [activeUsers]);

  const paperStyles = {
    border: '1px',
    borderStyle: 'solid',
    borderColor: theme.palette.secondary.light,
    backgroundColor: theme.palette.primary.main,
    marginLeft: '1vw',
    marginTop: '1vh',
    minHeight: isMobile ? '10vh' : '70vh',
  };

  const circleIconStyles = {
    fontSize: '0.5rem',
    marginRight: '8px',
    color: theme.palette.primary.light,
    flexShrink: 0,
  };

  const textStyles = {
    wordBreak: "break-word",
    display: 'flex',
    alignItems: 'center',
    marginLeft: '0.5rem',
  };

  return (
    <Paper ref={boxRef} sx={paperStyles}>
      <Box sx={{ maxHeight: isMobile ? '10vh' : '70vh', textAlign: 'left', overflow: 'auto', marginLeft: '3vw', marginRight: '1vw' }}>
        <Typography variant="h2" sx={{ textDecoration: 'underline', marginBottom: '1vh' }}>Active Users</Typography>
        {activeUsers.map((user, index) => (
          <Typography variant="h2" key={index} sx={textStyles}>
            <CircleIcon sx={circleIconStyles} />
            {user.name}
          </Typography>
        ))}
      </Box>
    </Paper>
  )
}