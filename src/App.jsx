import React, { useState } from 'react';

const questions = [
  { id: 1, question: 'Do you prefer working alone or in a team?', options: ['Alone', 'Team'] },
  { id: 2, question: 'Are you more creative or analytical?', options: ['Creative', 'Analytical'] },
];

function App() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (qid, value) => {
    setAnswers({...answers, [qid]: value});
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    const profile = Object.values(answers).join(', ');
    return (
      <div style={{padding: '20px', fontFamily: 'Arial'}}>
        <h2>Your Profile</h2>
        <p>{profile}</p>
      </div>
    );
  }

  return (
    <div style={{padding: '20px', fontFamily: 'Arial'}}>
      <h1>Simple Questionnaire</h1>
      {questions.map(q => (
        <div key={q.id} style={{marginBottom: '20px'}}>
          <p>{q.question}</p>
          {q.options.map(option => (
            <label key={option} style={{marginRight: '10px'}}>
              <input
                type="radio"
                name={`question-${q.id}`}
                value={option}
                onChange={() => handleChange(q.id, option)}
                required
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
