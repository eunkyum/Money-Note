import React from 'react';
import './Summary.css';

const Summary = ({ income, expense }) => {
  const formatCurrency = (amount) => {
    return `${amount < 0 ? '-' : ''}${Math.abs(amount).toLocaleString()}원`;
  };

  return (
    <div className="summary">
      <div className="summary-item">
        <div>수입</div>
        <div className="income">{formatCurrency(income)}</div>
      </div>
      <div className="divider">|</div>
      <div className="summary-item">
        <div>지출</div>
        <div className="expense">{formatCurrency(expense)}</div>
      </div>
    </div>
  );
};

export default Summary;
