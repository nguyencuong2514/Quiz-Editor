import React from 'react';

// Quản lý từng đáp án trong câu hỏi: nội dung ,giá trị,đáp án đúng và thao tác thêm sửa xóa
const OptionEditor = ({ option, isCorrect, onUpdate, onDelete, onToggle }) => {
  return (
    <div className={`option-row ${isCorrect ? 'correct' : ''}`}>
      <input type="checkbox" checked={isCorrect} onChange={onToggle} />
      <input 
        placeholder="Nội dung đáp án" 
        value={option.label} 
        onChange={(e) => onUpdate({ ...option, label: e.target.value })} 
      />
      {/*callback gọi hàm ondelete để xóa*/}
      <button onClick={onDelete} className="btn-delete-small">Xóa đáp án</button>
    </div>
  );
};

export default OptionEditor;