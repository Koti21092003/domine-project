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
    if (data && data.length > 1) {
      const totalColumnIndex = 2; // Assuming "Total" is in the 3rd column (index 2)
      const attendanceCounts = { below65: 0, between65And75: 0, above75: 0 };

      data.slice(1).forEach((row) => { // Skip the header row
        const total = parseFloat(row[totalColumnIndex]);
        if (!isNaN(total)) {
          if (total < 65) {
            attendanceCounts.below65++;
          } else if (total >= 65 && total <= 75) {
            attendanceCounts.between65And75++;
          } else {
            attendanceCounts.above75++;
          }
        }
      });

      setOverallData(attendanceCounts);
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
        <RegionChart data={overallData} />
      </Box>

      <Footer />
    </ChakraProvider>
  );
};

export default OverallAttendance;
