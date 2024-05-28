import React, { useState } from 'react';
import { SlPlus } from 'react-icons/sl';
import './MonthlyDetails.css';

const MonthlyDetails = ({ details, addDetail, onDetailClick }) => {
  const [showModal, setShowModal] = useState(false);
  const [newDetail, setNewDetail] = useState({ date: '', description: '', amount: 0 });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDetail({ ...newDetail, [name]: value });
  };

  const handleAddDetail = () => {
    addDetail(newDetail);
    setShowModal(false);
    setNewDetail({ date: '', description: '', amount: 0 });
  };

  return (
    <div className="monthly-details">
      <div className="header">
        <h3>월별 내역</h3>
        <button className="add-button" onClick={() => setShowModal(true)}>
          <SlPlus />
        </button>
      </div>
      <div className="details-list">
        {details.map((detail, index) => (
          <div className="detail-item" key={index} onClick={() => onDetailClick(index)}>
            <div className="date">{detail.date}</div>
            <div className="description-amount">
              <div className="description">{detail.description}</div>
              <div className={`amount ${detail.amount > 0 ? 'income' : 'expense'}`}>
                {detail.amount > 0 ? `+${detail.amount.toLocaleString()}` : detail.amount.toLocaleString()}원
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>새 항목 추가</h3>
            <label>
              날짜:
              <input type="date" name="date" value={newDetail.date} onChange={handleInputChange} />
            </label>
            <label>
              설명:
              <input type="text" name="description" value={newDetail.description} onChange={handleInputChange} />
            </label>
            <label>
              금액:
              <input type="number" name="amount" value={newDetail.amount} onChange={handleInputChange} />
            </label>
            <div className="modal-buttons">
              <button onClick={handleAddDetail}>추가</button>
              <button onClick={() => setShowModal(false)}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyDetails;
