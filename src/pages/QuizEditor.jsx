import { useState } from "react";
import QuizForm from "../components/QuizForm";

export default function QuizEditor() {

  const [quiz, setQuiz] = useState({
    name: "",
    description: "",
    questions: []
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Quiz Editor</h1>

      <QuizForm quiz={quiz} setQuiz={setQuiz} />

    </div>
  );
}