import React, { useState } from 'react';
import QuizForm from './components/QuizForm';
import QuestionEditor from './components/QuestionEditor';
import QuizPreview from './components/QuizPreview';
import { exportToJson, importFromJson } from './utils/jsonHelper';
import './style.css';
function App() {
  const [quiz, setQuiz] = useState({ name: '', description: '', questions: [] });
  const [isPreview, setIsPreview] = useState(false);

  const handleImport = async (e) => {
    const file = e.target.files[0]; 
    if (file) {
      try { 
        const data = await importFromJson(file); 
        setQuiz(data); 
      } catch (err) { alert("Lỗi khi nhập file JSON!"); } 
    }
  };
  // Thêm câu hỏi mới với sắp xếp tự động
  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(), 
      name: '',
      description: '',
      sortOrder: quiz.questions.length + 1,
      options: [
        { id: Date.now() + 1, label: '', value: 'val1', sortOrder: 1 },
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

  const removeQuestion = (index) => {
    const newQuestions = quiz.questions.filter((_, i) => i !== index);
    const reordered = newQuestions.map((q, i) => ({ ...q, sortOrder: i + 1 }));
    setQuiz({ ...quiz, questions: reordered });
  };

  return (
    <div className="min-vh-100 bg-light pb-5">
      {/* Navbar chuyên nghiệp */}
      <nav className="navbar navbar-dark bg-primary shadow-sm mb-4">
        <div className="container">
          <span className="navbar-brand mb-0 h1 fw-bold">OnDigi Quiz Editor</span>
          <div className="d-flex gap-2">
            <label className="btn btn-light btn-sm mb-0 shadow-sm">
              <i className="bi bi-upload"></i> Import JSON
              <input type="file" onChange={handleImport} hidden accept=".json" />
            </label>
            <button className="btn btn-warning btn-sm fw-bold shadow-sm" onClick={() => setIsPreview(!isPreview)}>
              {isPreview ? " Quay lại sửa" : " Xem trước (Preview)"}
            </button>
            <button className="btn btn-success btn-sm fw-bold shadow-sm" onClick={() => exportToJson(quiz)}>
              Xuất file JSON
            </button>
          </div>
        </div>
      </nav>

      <div className="container">
        {isPreview ? (
          <div className="card shadow-lg border-0 rounded-4 p-4">
            <QuizPreview quiz={quiz} />
          </div>
        ) : (
          <div className="row justify-content-center">
            <div className="col-lg-9">
              {/* Form thông tin chung */}
              <section className="card shadow-sm border-0 rounded-4 p-4 mb-4">
                <h5 className="text-secondary mb-3 border-bottom pb-2">Thông tin chung</h5>
                <QuizForm quiz={quiz} setQuiz={setQuiz} />
              </section>
              
              {/* Danh sách câu hỏi */}
              <section className="questions-list">
                {quiz.questions.map((q, index) => (
                  <div key={q.id} className="question-wrapper mb-4 position-relative">
                    <QuestionEditor 
                      question={q}
                      onUpdate={(updated) => updateQuestion(index, updated)}
                      onRemove={() => removeQuestion(index)}
                    />
                  </div>
                ))}
              </section>

              {/* Nút thêm câu hỏi xịn xò */}
              <div className="text-center mt-4">
                <button className="btn btn-primary btn-lg rounded-pill px-5 shadow" onClick={addQuestion}>
                  <span className="fs-4">+</span> Thêm câu hỏi mới
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;