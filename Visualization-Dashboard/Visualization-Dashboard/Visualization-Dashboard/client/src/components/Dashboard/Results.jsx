import React, { useState } from "react";
import * as XLSX from "xlsx";
import {
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Box,
} from "@chakra-ui/react";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [searchBacklog, setSearchBacklog] = useState("");
  const [searchCgpa, setSearchCgpa] = useState("");
  const [searchSgpa, setSearchSgpa] = useState("");
  const [searchStudent, setSearchStudent] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const parsedData = json.slice(9).map((row) => ({
          student: row[2],
          sgpa: row[10],
          cgpa: row[11],
          allBacklog: row[13],
        }));

        setStudentsData(parsedData);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const filteredStudents = studentsData.filter((student) => {
    const backlogMatch = student.allBacklog?.toString().includes(searchBacklog);
    const cgpaMatch = student.cgpa?.toString().includes(searchCgpa);
    const sgpaMatch = student.sgpa?.toString().includes(searchSgpa);
    const studentMatch = student.student?.toString().toLowerCase().includes(searchStudent.toLowerCase());

    return backlogMatch && cgpaMatch && sgpaMatch && studentMatch;
  });

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handlePrint = () => {
    const printContent = document.getElementById("print-section");
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Results</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <ChakraProvider>
      <Box padding="20px">
        <input
          type="file"
          onChange={handleFileUpload}
          accept=".xlsx, .xls"
          style={{
            padding: "8px 12px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        />

        {studentsData.length > 0 && (
          <>
            <Input
              placeholder="Search by All Backlog (e.g., 0)"
              value={searchBacklog}
              onChange={(e) => setSearchBacklog(e.target.value)}
              marginTop="20px"
              marginBottom="10px"
              size="md"
            />
            <Input
              placeholder="Search by CGPA (e.g., 8.5)"
              value={searchCgpa}
              onChange={(e) => setSearchCgpa(e.target.value)}
              marginBottom="10px"
              size="md"
            />
            <Input
              placeholder="Search by SGPA (e.g., 9.0)"
              value={searchSgpa}
              onChange={(e) => setSearchSgpa(e.target.value)}
              marginBottom="10px"
              size="md"
            />
            <Input
              placeholder="Search by Student Name"
              value={searchStudent}
              onChange={(e) => setSearchStudent(e.target.value)}
              marginBottom="20px"
              size="md"
            />
          </>
        )}

        {/* Display filtered data */}
        {filteredStudents.length > 0 ? (
          <Box id="print-section" marginTop="20px">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Student</Th>
                  <Th>SGPA</Th>
                  <Th>CGPA</Th>
                  <Th>All Backlog</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredStudents.map((student, index) => (
                  <Tr key={index}>
                    <Td>{student.student}</Td>
                    <Td>{student.sgpa}</Td>
                    <Td>{student.cgpa}</Td>
                    <Td>{student.allBacklog}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        ) : (
          <Box marginTop="20px">No results found</Box>
        )}
      </Box>

      {/* Print and Back Buttons */}
      <div
        style={{
          backgroundColor: "#f0f4f8",
          padding: "20px",
          borderRadius: "8px",
          textAlign: "center",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <button
          style={{
            backgroundColor: "#007BFF",
            color: "white",
            padding: "10px 20px",
            fontSize: "16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "10px",
          }}
          onClick={handleBack}
        >
          Back
        </button>

        <button
          style={{
            backgroundColor: "#28A745",
            color: "white",
            padding: "10px 20px",
            fontSize: "16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={handlePrint}
        >
          Print
        </button>
      </div>

      <Footer />
    </ChakraProvider>
  );
};

export default Results;