import React from 'react';
import './Summary.css';

const Summary = ({ income, expense }) => {
  return (
    <div className="summary">
      <div className="summary-item">
        <div>수입</div>
        <div className="income">{income.toLocaleString()}원</div>
      </div>
      <div className="divider">|</div>
      <div className="summary-item">
        <div>지출</div>
        <div className="expense">{expense.toLocaleString()}원</div>
      </div>
    </div>
  );
};

export default Summary;
