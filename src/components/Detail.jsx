import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './Detail.css';

const Detail = () => {
  const { id } = useParams();
  const location = useLocation();
  const { details, updateDetail, deleteDetail } = location.state;
  const detail = details.find((detail, index) => index === parseInt(id));
  const [updatedDetail, setUpdatedDetail] = useState(detail);
  const navigate = useNavigate();

  useEffect(() => {
    if (!detail) {
      navigate('/');
    }
  }, [detail, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetail({ ...updatedDetail, [name]: value });
  };

  const handleUpdate = () => {
    updateDetail(parseInt(id), updatedDetail);
    navigate('/');
  };

  const handleDelete = () => {
    deleteDetail(parseInt(id));
    navigate('/');
  };

  if (!detail) return <div>항목을 찾을 수 없습니다.</div>;

  return (
    <div className="detail-page">
      <h2>항목 수정</h2>
      <label>
        날짜:
        <input type="date" name="date" value={updatedDetail.date} onChange={handleInputChange} />
      </label>
      <label>
        설명:
        <input type="text" name="description" value={updatedDetail.description} onChange={handleInputChange} />
      </label>
      <label>
        금액:
        <input type="number" name="amount" value={updatedDetail.amount} onChange={handleInputChange} />
      </label>
      <div className="detail-page-buttons">
        <button onClick={handleUpdate}>수정</button>
        <button onClick={handleDelete}>삭제</button>
      </div>
    </div>
  );
};

export default Detail;
