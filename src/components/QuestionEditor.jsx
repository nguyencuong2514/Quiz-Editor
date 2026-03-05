import React from 'react';
import OptionEditor from './OptionEditor';

const QuestionEditor = ({ question, onUpdate, onRemove }) => {
  const updateField = (field, value) => {
    onUpdate({ ...question, [field]: value });
  };

  const addOption = () => {
    const newOpt = { 
      id: Date.now(), 
      label: '', 
      value: `opt-${Date.now()}`, 
      sortOrder: question.options.length + 1 
    };
    updateField('options', [...question.options, newOpt]);
  };

  const updateOption = (index, updatedOpt) => {
    const newOptions = [...question.options];
    newOptions[index] = updatedOpt;
    updateField('options', newOptions);
  };

  const deleteOption = (index) => {
    const optValue = question.options[index].value;
    const newOptions = question.options.filter((_, i) => i !== index);
    const newCorrect = question.correctValues.filter(v => v !== optValue);
    onUpdate({ ...question, options: newOptions, correctValues: newCorrect });
  };

  return (
    <div className="question-card">
      <div className="card-header">
        <h3>Câu hỏi {question.sortOrder}</h3>
        <button className="btn-delete" onClick={onRemove}>Xóa câu hỏi</button>
      </div>
      <input 
        placeholder="Tiêu đề câu hỏi" 
        value={question.name} 
        onChange={(e) => updateField('name', e.target.value)} 
      />
      
      <div className="options-list">
        {question.options.map((opt, i) => (
          <OptionEditor 
            key={opt.id} 
            option={opt} 
            isCorrect={question.correctValues.includes(opt.value)}
            onUpdate={(updated) => updateOption(i, updated)}
            onDelete={() => deleteOption(i)}
            onToggle={() => {
              const current = [...question.correctValues];
              const idx = current.indexOf(opt.value);
              if (idx > -1) current.splice(idx, 1);
              else current.push(opt.value);
              updateField('correctValues', current);
            }}
          />
        ))}
      </div>
      <button className="btn-small" onClick={addOption}>+ Thêm lựa chọn</button>
    </div>
  );
};

export default QuestionEditor;