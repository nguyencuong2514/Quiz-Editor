//Hiển thị phần xem trước của quiz
import React from 'react';
const QuizPreview = ({ quiz }) => {
  return (
    <div className="preview-container">
      <h2>Xem trước: {quiz.name || "(Chưa có tên)"}</h2>
      <p>{quiz.description}</p>
      <hr />
      {quiz.questions.map((q, i) => (
        <div key={q.id} className="preview-item">
          <p><strong>Câu {i+1}: {q.name}</strong></p>
          <ul>
            {q.options.map(opt => (
              <li key={opt.id} style={{ color: q.correctValues.includes(opt.value) ? 'green' : 'black' }}>
                {opt.label} {q.correctValues.includes(opt.value) && "✓"}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default QuizPreview;