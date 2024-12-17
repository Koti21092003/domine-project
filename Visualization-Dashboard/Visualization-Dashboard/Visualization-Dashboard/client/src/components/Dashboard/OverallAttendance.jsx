import { Box, ChakraProvider } from '@chakra-ui/react';
import React, { useState } from 'react';
import RegionChart from './RegionChart';
import Navbar from './Navbar';
import Footer from './Footer';
import * as XLSX from 'xlsx';

const OverallAttendance = () => {
  const [overallData, setOverallData] = useState({ below65: 0, between65And75: 0, above75: 0 });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Assuming the first sheet for simplicity
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert the worksheet to JSON
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        processOverallAttendance(json);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const processOverallAttendance = (data) => {
    if (data && data.length > 4) { // Ensure sufficient rows
      const headerRowIndex = 3; // Actual headers are on the 4th row (index 3)
      const headerRow = data[headerRowIndex];

      // Adjusted: Dynamically find column index for 'Total' or '%'
      const percentageColumnIndex = headerRow.findIndex((cell) =>
        typeof cell === 'string' && (cell.trim() === '%' || cell.trim().toLowerCase() === 'Total')
      );

      if (percentageColumnIndex === -1) {
        alert('Percentage column not found. Please check the file structure.');
        return;
      }

      const attendanceCounts = { below65: 0, between65And75: 0, above75: 0 };

      // Skip to the data rows after the header row
      data.slice(headerRowIndex + 1).forEach((row) => {
        const percentage = parseFloat(row[percentageColumnIndex]);
        if (!isNaN(percentage)) {
          if (percentage < 65) {
            attendanceCounts.below65++;
          } else if (percentage >= 65 && percentage <= 75) {
            attendanceCounts.between65And75++;
          } else {
            attendanceCounts.above75++;
          }
        }
      });

      setOverallData(attendanceCounts);
    } else {
      alert('Invalid file structure or insufficient data.');
    }
  };

  return (
    <ChakraProvider>
      <Navbar />

      <div style={{ margin: '20px', textAlign: 'center' }}>
        <form>
          <input
            style={{
              padding: '8px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: '#f9f9f9',
              cursor: 'pointer',
              fontSize: '16px',
              color: '#333',
            }}
            type="file"
            id="data"
            name="data"
            onChange={handleFileUpload}
            accept=".xlsx, .xls"
          />
        </form>
      </div>

      <Box
        flex="1"
        maxW="80%"
        p={5}
        m={"auto"}
        boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
        borderRadius={20}
        textAlign="center"
      >
        <RegionChart
          data={Object.entries(overallData).map(([category, value]) => ({
            category,
            value,
          }))}
        />
      </Box>

      <Footer />
    </ChakraProvider>
  );
};

export default OverallAttendance;
