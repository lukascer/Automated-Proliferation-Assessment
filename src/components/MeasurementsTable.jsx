import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const MeasurementsTable = () => {
  const sampleMeasurements = [
    { id: 'positive', parameter: 'Positive cells', value: 22, unit: 19 },
    { id: 'mild_active', parameter: '+ Mild Positive', value: 1, unit: 1 },
    { id: 'moderate_active', parameter: '+ Moderate Positive', value: 9, unit: 8 },
    { id: 'strong_active', parameter: '+ Strong Positive', value: 12, unit: 11 },
    { id: 'negative', parameter: 'Negative cells', value: 95, unit: 82 },
  ];

  const thresholdValues = {
    positive: { min: 0, max: 15 },
    mild_active: { min: 0, max: 30 },
    moderate_active: { min: 0, max: 30 },
    strong_active: { min: 0, max: 10 },
    negative: 53,
  };

  const checkTreshold = (id, value) => {
    const minMax = thresholdValues[id];

    if (minMax.min > value) {
      return 'lowValue';
    }

    if (minMax.max < value) {
      return 'highValue';
    }
    return null;
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Parameter</TableCell>
            <TableCell align="right">No. of cells</TableCell>
            <TableCell align="right">Ratio (%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sampleMeasurements.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.parameter}</TableCell>
              <TableCell align="right">{row.value}</TableCell>
              <TableCell
                className={checkTreshold(row.id, row.value)}
                align="right"
                sx={{
                  '&.lowValue': {
                    backgroundColor: 'rgba(255,255,0,0.3)',
                  },
                  '&.highValue': {
                    backgroundColor: 'rgba(255,0,0,0.3)',
                  },
                }}
              >
                {row.unit}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MeasurementsTable;
