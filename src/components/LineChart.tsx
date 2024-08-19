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
import { AggregationType, DayDataModel, MonthDataModel, YearDataModel } from '../api/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Segmentation Chart',
    },
  },
};



type LineChartProps = {
    aggType: AggregationType,
    allUserData: (DayDataModel | MonthDataModel | YearDataModel)[]
    mobileUserData: (DayDataModel | MonthDataModel | YearDataModel)[]
}
export const LineChart = ({aggType, allUserData} : LineChartProps) => {
    const labels = allUserData.map(data => {
        if(aggType === AggregationType.DAY && 'date' in data){
            return data.date
        }else if(aggType === AggregationType.MONTH && 'month' in data){
            return data.month
        }else if(aggType === AggregationType.WEEK && 'week' in data){
            return data.week
        }
    });
    const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: allUserData.map(data => data.users),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };
    return <Line data={data} options={options}/>
}