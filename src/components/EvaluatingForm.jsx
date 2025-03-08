import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

const MuiTumorForm = () => {
  const [formData, setFormData] = useState({
    stage: '',
    ungioinvasion: '',
    perineuralInvasion: '',
    necrorsis: '',
    resectionBorder: '',
    clinicalReport: '',
    macroDescription: '',
    microDescription: '',
    conclusion: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // Add your submit logic here (e.g., API call)
  };

  return (
    <Paper elevation={3} sx={{ width: '100%', padding: 3, boxSizing: 'border-box', marginTop: 2 }}>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6" component="h2" align="center">
          Evaluation Form
        </Typography>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <TextField
          label="Stage"
          name="stage"
          value={formData.stage}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          size="small"
        />

        <FormControl component="fieldset" size="small">
          <FormLabel component="legend">Ungioinvasion</FormLabel>
          <RadioGroup row name="ungioinvasion" value={formData.ungioinvasion} onChange={handleChange}>
            <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
            <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" size="small">
          <FormLabel component="legend">Perineural Invasion</FormLabel>
          <RadioGroup row name="perineuralInvasion" value={formData.perineuralInvasion} onChange={handleChange}>
            <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
            <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" size="small">
          <FormLabel component="legend">Necrorsis</FormLabel>
          <RadioGroup row name="necrorsis" value={formData.necrorsis} onChange={handleChange}>
            <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
            <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" size="small">
          <FormLabel component="legend">Resection Border</FormLabel>
          <RadioGroup row name="resectionBorder" value={formData.resectionBorder} onChange={handleChange}>
            <FormControlLabel value="positive" control={<Radio size="small" />} label="Positive" />
            <FormControlLabel value="negative" control={<Radio size="small" />} label="Negative" />
          </RadioGroup>
        </FormControl>

        <TextField
          label="Clinical Report"
          name="clinicalReport"
          value={formData.clinicalReport}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          size="small"
        />

        <TextField
          label="Macro Description"
          name="macroDescription"
          value={formData.macroDescription}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          size="small"
        />

        <TextField
          label="Micro Description"
          name="microDescription"
          value={formData.microDescription}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          size="small"
        />

        <TextField
          label="Conclusion"
          name="conclusion"
          value={formData.conclusion}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          size="small"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="small"
          sx={{ alignSelf: 'flex-end', marginTop: 2 }}
        >
          Save
        </Button>
      </Box>
    </Paper>
  );
};

export default MuiTumorForm;
