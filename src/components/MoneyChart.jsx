import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

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
          // 특정 달의 점 크기를 다르게 설정
          const index = context.dataIndex;
          return index === highlightMonth - 1 ? 7 : 5;
        },
        pointHoverRadius: (context) => {
          // 특정 달의 점 크기를 다르게 설정
          const index = context.dataIndex;
          return index === highlightMonth - 1 ? 9 : 7;
        },
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // 차트의 비율을 유지하지 않고 확장 가능하게 설정
    scales: {
      x: {
        grid: {
          display: false, // x축의 그리드 라인 숨김
          borderColor: 'rgba(0,0,0,0)', // x축 선을 투명하게 설정
        },
        ticks: {
          color: '#fff', // x축 라벨 색상을 흰색으로 설정
          autoSkip: false, // 자동 건너뛰기 비활성화
          maxRotation: 0, // 최대 회전 각도 설정
          minRotation: 0, // 최소 회전 각도 설정
        },
      },
      y: {
        display: false, // y축 숨김
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false, // 범례 숨김
      },
      tooltip: {
        enabled: true, // 호버 시 툴팁 표시
        callbacks: {
          title: (tooltipItems) => tooltipItems[0].label, // 툴팁 타이틀을 월로 설정
          label: (tooltipItem) => `${tooltipItem.raw}원`, // 툴팁에 지출 금액만 표시
        },
      },
      datalabels: {
        display: (context) => context.dataIndex === highlightMonth - 1, // 특정 달의 데이터 라벨 표시
        align: 'end',
        anchor: 'end',
        color: '#fff', // 데이터 라벨 색상을 흰색으로 설정
        formatter: (value) => `${value}원`,
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 10,
        bottom: 10, // x축과 그래프의 간격을 좁히기 위해 아래 패딩 추가
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={options} plugins={[ChartDataLabels]} />
    </div>
  );
};

export default MoneyChart;
