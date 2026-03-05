import React from 'react';

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