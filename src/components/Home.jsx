import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import './Home.css';
import MoneyChart from './MoneyChart';
import MonthlyDetails from './MonthlyDetails';
import Summary from './Summary';

const initialDetails = [
  { date: '2024-05-01', description: '노트 구매', amount: -10500 },
  { date: '2024-05-15', description: '안 입는 옷 중고거래', amount: 35000 },
  { date: '2024-05-23', description: '로또 4등 당첨', amount: 50000 },
  { date: '2024-05-30', description: '친구 생일선물 구매', amount: -48000 },
]; // 예제 데이터

const expenditureData = [300, 500, 400, 600, 700, 800, 650, 700, 750, 800, 850, 900]; // 예제 데이터

function Home() {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date();
    return { year: today.getFullYear(), month: today.getMonth() + 1 };
  });

  const [details, setDetails] = useState(initialDetails);
  const history = useHistory();

  const handleBackMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = prevMonth.month === 1 ? 12 : prevMonth.month - 1;
      const newYear = prevMonth.month === 1 ? prevMonth.year - 1 : prevMonth.year;
      return { year: newYear, month: newMonth };
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = prevMonth.month === 12 ? 1 : prevMonth.month + 1;
      const newYear = prevMonth.month === 12 ? prevMonth.year + 1 : prevMonth.year;
      return { year: newYear, month: newMonth };
    });
  };

  const addDetail = (newDetail) => {
    setDetails([...details, newDetail]);
  };

  const updateDetail = (id, updatedDetail) => {
    const newDetails = details.map((detail, index) => (index === id ? updatedDetail : detail));
    setDetails(newDetails);
  };

  const deleteDetail = (id) => {
    const newDetails = details.filter((detail, index) => index !== id);
    setDetails(newDetails);
  };

  const handleDetailClick = (id) => {
    history.push({
      pathname: `/detail/${id}`,
      state: { details, updateDetail, deleteDetail },
    });
  };

  const calculateTotal = (details, type) => {
    return details
      .filter((detail) => (type === 'income' ? detail.amount > 0 : detail.amount < 0))
      .reduce((total, detail) => total + detail.amount, 0);
  };

  const filterDetailsByMonth = (details, year, month) => {
    return details.filter((detail) => {
      const detailDate = new Date(detail.date);
      return detailDate.getFullYear() === year && detailDate.getMonth() + 1 === month;
    });
  };

  const filteredDetails = filterDetailsByMonth(details, currentMonth.year, currentMonth.month);
  const income = calculateTotal(filteredDetails, 'income');
  const expense = calculateTotal(filteredDetails, 'expense');

  return (
    <div className="home">
      <div className="month-selector">
        <button onClick={handleBackMonth}>
          <SlArrowLeft />
        </button>
        <span>{`${currentMonth.year}년 ${currentMonth.month}월`}</span>
        <button onClick={handleNextMonth}>
          <SlArrowRight />
        </button>
      </div>
      <main>
        <Summary income={income} expense={expense} />
        <h2>{currentMonth.year}년 지출</h2>
        <MoneyChart data={expenditureData} highlightMonth={currentMonth.month} />
        <MonthlyDetails details={filteredDetails} addDetail={addDetail} onDetailClick={handleDetailClick} />
      </main>
    </div>
  );
}

export default Home;
