import React from 'react';
import { Box, Center, Text } from '@chakra-ui/react';
import { Pie } from 'react-chartjs-2';

const RegionChart = ({ data }) => {
  if (!data || typeof data !== 'object') {
    return <Text>No data available</Text>;
  }

  // Prepare data for the Pie chart
  const chartData = {
    labels: ['Below 65%', '65%-75%', 'Above 75%'],
    datasets: [
      {
        data: [data.below65, data.between65And75, data.above75],
        backgroundColor: ['#FF6384', '#FFCE56', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#FFCE56', '#36A2EB'],
      },
    ],
  };

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Overall Attendance Distribution
      </Text>
      <Center>
        <Box width="300px" height="300px">
          <Pie data={chartData} />
        </Box>
      </Center>
    </Box>
  );
};

export default RegionChart;
