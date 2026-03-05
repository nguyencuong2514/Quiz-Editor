import React from 'react';

const QuizForm = ({ quiz, setQuiz }) => {
  const handleChange = (field, value) => {
    setQuiz({ ...quiz, [field]: value });
  };

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