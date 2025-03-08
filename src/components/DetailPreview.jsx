import { Box } from '@mui/material';
import React, { useState } from 'react';
import NewWindow from 'react-new-window';

const DetailPreview = ({ image, highlightArea, sx }) => {
  const [openWindow, setOpenWindow] = useState(false);
  const [naturalDimensions, setNaturalDimensions] = useState({ width: 0, height: 0 });

  const handleClick = () => {
    setOpenWindow(true);
  };

  const handleWindowClose = () => {
    setOpenWindow(false);
  };

  // When the image loads, record its natural dimensions.
  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    setNaturalDimensions({ width: naturalWidth, height: naturalHeight });
  };

  // Calculate the scale factor for the preview.
  // We fix the preview image height to 200px.
  const scale = naturalDimensions.height > 0 ? 200 / naturalDimensions.height : 1;

  // Adjust highlight area coordinates for the preview image.
  const previewHighlightStyle = highlightArea
    ? {
        position: 'absolute',
        top: parseFloat(highlightArea.y) * scale + 'px',
        left: parseFloat(highlightArea.x) * scale + 'px',
        width: parseFloat(highlightArea.width) * scale + 'px',
        height: parseFloat(highlightArea.height) * scale + 'px',
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
        border: '2px solid red',
        zIndex: 1,
        pointerEvents: 'none',
      }
    : {};

  return (
    <>
      <Box onClick={handleClick} sx={{ position: 'relative', display: 'inline-block', cursor: 'pointer', ...sx }}>
        <Box
          component="img"
          src={image}
          alt="Detail Preview"
          onLoad={handleImageLoad}
          sx={{
            height: 200, // fixed preview height
            width: 'auto',
            display: 'block',
          }}
        />
        {highlightArea && <Box sx={previewHighlightStyle} />}
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
