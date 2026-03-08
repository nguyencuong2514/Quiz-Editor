import React from 'react';
// Quản lý thông tin chung của quiz:Tên quiz và mô tả
const QuizForm = ({ quiz, setQuiz }) => {
  const handleChange = (field, value) => {
    setQuiz({ ...quiz, [field]: value });
  };
// Xử lý nhập file JSON để cập nhật quiz
  return (
    <div className="quiz-info-card">
      <input
        type="text"
        placeholder="Nhập tên Quiz..."
        value={quiz.name}
        onChange={(e) => handleChange('name', e.target.value)}
        className="input-title"
      />
      <textarea
        placeholder="Nhập mô tả bộ câu hỏi..."
        value={quiz.description}
        onChange={(e) => handleChange('description', e.target.value)}
      />
    </div>
  );
};

export default QuizForm;