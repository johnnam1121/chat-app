import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton } from '@mui/material';
import React from 'react';

function DarkModeToggle({ darkMode, setDarkMode, modeColor }) {
  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  const { lightModeColor, darkModeColor } = modeColor;

  const scrollbarBackground = darkMode ? '#eeeeee' : '#EEF1FF';
  const scrollbarTrackShadow = darkMode ? '#0C7D85' : '#AAC4FF';
  const scrollbarThumbShadow = darkMode ? '#222831' : '#B1B2FF';

  return (
    <div>
      <IconButton color="inherit" onClick={handleToggle}>
        {darkMode ? (
          <Brightness7Icon style={{ color: lightModeColor }} />
        ) : (
          <Brightness4Icon style={{ color: darkModeColor }} />
        )}
      </IconButton>

      <style>{`
        ::-webkit-scrollbar {
          background-color: ${scrollbarBackground};
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 15px ${scrollbarTrackShadow};
          border-radius: 25px;
        }

        ::-webkit-scrollbar-thumb {
          border-radius: 25px;
          -webkit-box-shadow: inset 0 0 15px ${scrollbarThumbShadow};
        }
      `}</style>
    </div>
  );
}

export default DarkModeToggle;
