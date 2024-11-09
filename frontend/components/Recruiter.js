// components/Recruiter.js
import React, { useState } from 'react';

const Recruiter = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [questions, setQuestions] = useState(['', '', '']);
  const [message, setMessage] = useState('');

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobDescription, questions }),
    });

    if (response.ok) {
      setMessage('Job posted successfully!');
      setJobDescription('');
      setQuestions(['', '', '']);
    } else {
      setMessage('Failed to post job.');
    }
  };

  return (
    <div>
      <h2>Post a New Job</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Job Description</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
          />
        </div>
        <div>
          {questions.map((question, index) => (
            <div key={index}>
              <label>Question {index + 1}</label>
              <input
                type="text"
                value={question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                required
              />
            </div>
          ))}
        </div>
        <button type="submit">Submit Job</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Recruiter;
