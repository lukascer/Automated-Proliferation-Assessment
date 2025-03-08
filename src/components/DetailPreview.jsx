import { Box } from '@mui/material';
import React, { useState } from 'react';
import NewWindow from 'react-new-window';

const DetailPreview = ({ image, highlightArea }) => {
  const [openWindow, setOpenWindow] = useState(false);

  const handleClick = () => {
    setOpenWindow(true);
  };

  const handleWindowClose = () => {
    setOpenWindow(false);
  };

  return (
    <>
      <Box onClick={handleClick} sx={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}>
        <Box
          component="img"
          src={image}
          alt="Detail Preview"
          sx={{
            height: 200, // fixed preview height
            width: 'auto',
            display: 'block',
          }}
        />
        {highlightArea && (
          <Box
            sx={{
              position: 'absolute',
              top: highlightArea.y,
              left: highlightArea.x,
              width: highlightArea.width,
              height: highlightArea.height,
              backgroundColor: 'rgba(255, 0, 0, 0.3)',
              border: '2px solid red',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />
        )}
      </Box>

      {openWindow && (
        <NewWindow onUnload={handleWindowClose} title="Full Sized Image">
          <Box sx={{ position: 'relative', display: 'inline-block' }}>
            <Box component="img" src={image} alt="Full Sized Image" sx={{ display: 'block' }} />
            {highlightArea && (
              <Box
                sx={{
                  position: 'absolute',
                  top: highlightArea.y,
                  left: highlightArea.x,
                  width: highlightArea.width,
                  height: highlightArea.height,
                  backgroundColor: 'rgba(255, 0, 0, 0.3)',
                  border: '2px solid red',
                  zIndex: 1,
                  pointerEvents: 'none',
                }}
              />
            )}
          </Box>
        </NewWindow>
      )}
    </>
  );
};

export default DetailPreview;
