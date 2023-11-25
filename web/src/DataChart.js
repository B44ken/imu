import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const dataColors = {
    'gyro_x': 'red',
    'gyro_y': 'green',
    'gyro_z': 'blue',
}

const toSeries = (data, name) => {
    return {
        label: name,
        data: data.map(e => e[name]),
        borderColor: dataColors[name],
        backgroundColor: dataColors[name],
    }
}

export const options = {
  responsive: true,
  aspectRatio: 3,
  elements: {
    point: {
      borderWidth: 0,
      radius: 0,
      backgroundColor: '#00000000',
    }
  },
  plugins: {
    legend: {
      position: 'left',
    },
    title: {
      display: false,
    },
  },
};

const DataChart = ({ data, dataKeys }) => {
  return <Line options={options} data={{
    labels: data.map(i => i.t),
    title: {
        display: false
    },
    animation: {
        duration: 0
    },
    datasets: dataKeys.map(k => toSeries(data, k))
  }} />
}

export { DataChart }