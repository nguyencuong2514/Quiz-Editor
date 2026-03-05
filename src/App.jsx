
import React, { useState } from 'react';

import QuizForm from './components/QuizForm';

import QuestionEditor from './components/QuestionEditor';

import QuizPreview from './components/QuizPreview';

import { exportToJson, importFromJson } from './utils/jsonHelper';

import './style.css';

function App() {
  // ===== KHAI BÁO STATE (DỮ LIỆU ĐỘNG) =====
  const [quiz, setQuiz] = useState({ name: '', description: '', questions: [] });
  
  const [isPreview, setIsPreview] = useState(false);

  const handleImport = async (e) => {
    const file = e.target.files[0]; 
    if (file) {
      try { 
        const data = await importFromJson(file); 
        setQuiz(data); 
      } catch (err) { alert(err); } 
    }
  };

  // ===== HÀM THÊM CÂU HỎI MỚI =====
  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(), 
      name: '',
      description: '',
      sortOrder: quiz.questions.length + 1,
      options: [
        { id: Date.now() + 1, label: '', value: 'val1', sortOrder: 1 }, // Option 1 vs 2
        { id: Date.now() + 2, label: '', value: 'val2', sortOrder: 2 }
      ],
      correctValues: []
    };
 
    setQuiz({ ...quiz, questions: [...quiz.questions, newQuestion] });
  };
  const updateQuestion = (index, updatedQ) => {
    const newQuestions = [...quiz.questions];
    newQuestions[index] = updatedQ;
    setQuiz({ ...quiz, questions: newQuestions });
  };

    // ===== HÀM XÓA CÂU HỎI =====
  const removeQuestion = (index) => {
    const newQuestions = quiz.questions.filter((_, i) => i !== index);
    
    const reordered = newQuestions.map((q, i) => ({ ...q, sortOrder: i + 1 }));
    
    setQuiz({ ...quiz, questions: reordered });
  };


  return (
    <div className="app-container">
      <header className="header">
        <h1>OnDigi Quiz Editor</h1>
        <div className="toolbar">
          <label className="btn-secondary"> Import JSON
            <input 
              type="file" 
              onChange={handleImport}
              hidden
              accept=".json"
            />
          </label>
          <button onClick={() => setIsPreview(!isPreview)}>
            {isPreview ? "Edit Mode" : "Preview Mode"}
          </button>
          
          <button className="btn-primary" onClick={() => exportToJson(quiz)}>
            Export JSON
          </button>
        </div>
      </header>
      {isPreview ? (
        <QuizPreview quiz={quiz} />
      ) : (
        <main>
          {}
          <QuizForm quiz={quiz} setQuiz={setQuiz} />
          
          {}
          <div className="questions-list">
            {}
            {quiz.questions.map((q, index) => (
              <QuestionEditor 
                key={q.id}
                question={q}
                onUpdate={(updated) => updateQuestion(index, updated)}
                onRemove={() => removeQuestion(index)}
              />
            ))}
          </div>
          <button className="btn-add-q" onClick={addQuestion}>
            + Add Question
          </button>
        </main>
      )}
    </div>
  );
}
export default App;