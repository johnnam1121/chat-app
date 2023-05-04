import React from 'react';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function DarkModeToggle({ darkMode, setDarkMode, modeColor }) {
  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  const { lightModeColor, darkModeColor } = modeColor;

  const scrollbarBackground = darkMode ? '#000000' : '#ffffff';
  const scrollbarTrackShadow = darkMode ? '#000000' : '#ffffff';
  const scrollbarThumbShadow = darkMode ? '#000000' : '#ffffff';

  return (
    <div>
      <IconButton color="inherit" onClick={handleToggle}>
        {darkMode ? (
          <Brightness7Icon style={{ color: lightModeColor }} />
        ) : (
          <Brightness4Icon style={{ color: darkModeColor }} />
        )}
      </IconButton>

      <style jsx>{`
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
