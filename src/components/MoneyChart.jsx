import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const MoneyChart = ({ data, highlightMonth }) => {
  const chartData = {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    datasets: [
      {
        label: '지출',
        data: data,
        fill: false,
        backgroundColor: '#fff', // 배경색을 흰색으로 설정
        borderColor: '#fff', // 선 색상을 흰색으로 설정
        pointBackgroundColor: '#fff', // 점 색상을 흰색으로 설정
        pointRadius: (context) => {
          const index = context.dataIndex;
          return index === highlightMonth - 1 ? 7 : 5;
        },
        pointHoverRadius: (context) => {
          const index = context.dataIndex;
          return index === highlightMonth - 1 ? 9 : 7;
        },
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          borderColor: 'rgba(0,0,0,0)',
        },
        ticks: {
          color: '#fff',
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        display: false,
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          title: (tooltipItems) => tooltipItems[0].label,
          label: (tooltipItem) => `${tooltipItem.raw}원`,
        },
      },
      datalabels: {
        display: (context) => context.dataIndex === highlightMonth - 1,
        align: 'end',
        anchor: 'end',
        color: '#fff',
        formatter: (value) => `${value}원`,
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 10,
        bottom: 10,
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default MoneyChart;
