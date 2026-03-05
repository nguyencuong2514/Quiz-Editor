export default function QuizForm({ quiz, setQuiz }) {

  const handleChange = (e) => {
    const { name, value } = e.target;

    setQuiz({
      ...quiz,
      [name]: value
    });
  };

  return (
    <div>

      <div>
        <label>Quiz Name</label>
        <input
          type="text"
          name="name"
          value={quiz.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={quiz.description}
          onChange={handleChange}
        />
      </div>

    </div>
  );
}