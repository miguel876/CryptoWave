import { styled } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  CategoryScale,
  Chart,
  LinearScale,
  LineElement,
  PointElement,
} from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

export const StyledLineChart = styled(Line)`
  margin: 1rem 0;
`;
