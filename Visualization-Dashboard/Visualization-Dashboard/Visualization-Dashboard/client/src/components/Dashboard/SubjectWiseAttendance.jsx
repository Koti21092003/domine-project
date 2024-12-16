import { Box, ChakraProvider, SimpleGrid } from '@chakra-ui/react'
import React, { useState } from 'react'
import RegionChart from './RegionChart'
import AdminDashboard from './Sidebar'
import * as XLSX from 'xlsx';
import Navbar from './Navbar';
import Footer from './Footer';
const SubjectWiseAttendance = () => {
  const [jsonData, setJsonData] = useState(null);
    
    
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
        setJsonData(json);
      };

      reader.readAsArrayBuffer(file);
    }
  };


  const subject = jsonData ? jsonData[2].slice(5) : [];
  console.log(subject);

  const subjects = [];

  subject.forEach(element => {
    subjects.push(element)
  });


  return (
     <ChakraProvider>
      <Navbar />

            <div className="">
            <form action="">
              <input style={{
                padding: "8px 12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "#f9f9f9",
                cursor: "pointer",
                fontSize: "16px",
                color: "#333",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }} type="file" id="data" name="data" onChange={handleFileUpload} accept=".xlsx, .xls" />
            </form>
    
          </div>
          <AdminDashboard />
    
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }} // Adjust columns based on screen size
            spacing={5} // Space between items
            m={50}
          >
            {[...Array(6)].map((_, index) => (
              <Box
                key={index}
                flex="1"
                maxW="100%"
                p={5}
                m={2}
                boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
                borderRadius={20}
              >
                <RegionChart data={jsonData} i={index} subject={subjects[index]} />
              </Box>
            ))}
          </SimpleGrid>
        <Footer />
        </ChakraProvider>
  )
}

export default SubjectWiseAttendance