
import React, { useState } from 'react';
import './QuestionTable.css'

const topics = [
  { value: 'Math', label: 'Math' },
  { value: 'Science', label: 'Science' },
  { value: 'History', label: 'History' },
  { value: 'Geography', label: 'Geography' },
  { value: 'English', label: 'English' },
];

const QuestionTable = ({ questions, setQuestions }) => {
  const [newQuestion, setNewQuestion] = useState({
    topic: '',
    easy: '',
    medium: '',
    hard: '',
  });

  const handleAddQuestion = () => {
    const total = (parseInt(newQuestion.easy) || 0) + (parseInt(newQuestion.medium) || 0) + (parseInt(newQuestion.hard) || 0);
    setQuestions([...questions, { ...newQuestion, total }]);
    setNewQuestion({
      topic: '',
      easy: '',
      medium: '',
      hard: '',
    });
  };

  const handleRemoveQuestion = (index) => {
    setQuestions(questions.filter((question, i) => i !== index));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'easy' || name === 'medium' || name === 'hard') {
      if (value < 0) {
        setNewQuestion({ ...newQuestion, [name]: 0 });
      } else {
        setNewQuestion({ ...newQuestion, [name]: value });
      }
    } else {
      setNewQuestion({ ...newQuestion, [name]: value });
    }
  };

  return (
    <div className="question-table">
      <h3>Question Details</h3>
      <table>
        <thead>
          <tr>
            <th>Topic</th>
            <th>Easy</th>
            <th>Medium</th>
            <th>Hard</th>
            <th>Total Questions</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={index}>
              <td>{question.topic}</td>
              <td>{question.easy}</td>
              <td>{question.medium}</td>
              <td>{question.hard}</td>
              <td>{question.total}</td>
              <td>
                <button>
                  Edit
                </button>
                <button onClick={() => handleRemoveQuestion(index)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <select name="topic" value={newQuestion.topic} onChange={handleInputChange}>
          <option value="">Select Topic</option>
          {topics.map((topic) => (
            <option key={topic.value} value={topic.value}>
              {topic.label}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="easy"
          value={newQuestion.easy}
          onChange={handleInputChange}
          placeholder="Easy"
        />
        <input
          type="number"
          name="medium"
          value={newQuestion.medium}
          onChange={handleInputChange}
          placeholder="Medium"
        />
        <input
          type="number"
          name="hard"
          value={newQuestion.hard}
          onChange={handleInputChange}
          placeholder="Hard"
        />
        <button onClick={handleAddQuestion}>
          Add Question
        </button>
      </div>
    </div>
  );
};

export default QuestionTable;