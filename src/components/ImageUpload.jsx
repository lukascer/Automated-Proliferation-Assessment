import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Paper, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUpload = ({ onImageUpload, sx }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      // Process the first accepted file (you could handle multiple files if needed)
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        // Optionally, you could add file validation here
        if (onImageUpload) {
          onImageUpload(file);
        }
      }
    },
    [onImageUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  });

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        textAlign: 'center',
        border: '2px dashed #ccc',
        cursor: 'pointer',
        backgroundColor: isDragActive ? '#f0f0f0' : '#fff',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...sx,
      }}
      {...getRootProps()}
    >
      <Box>
        <input {...getInputProps()} />

        <Box mb={1}>
          <CloudUploadIcon fontSize="large" color="action" />
        </Box>
        {isDragActive ? (
          <Typography variant="body1">Drop the image here...</Typography>
        ) : (
          <Typography variant="body1">Drag & drop an image here, or click to select one</Typography>
        )}
      </Box>
    </Paper>
  );
};

export default ImageUpload;
