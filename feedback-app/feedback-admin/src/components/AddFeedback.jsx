import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddFeedback = () => {
  const [courseName, setCourseName] = useState('');
  const [feedbackComments, setFeedbackComments] = useState('');
  const [feedbackRating, setFeedbackRating] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const feedback = { courseName, feedbackComments, feedbackRating };

    axios.post('http://localhost:5000/feedbacks', feedback)
      .then(() => {
        navigate('/');
      })
      .catch((error) => console.log('Error adding feedback', error));
  };

  return (
    <div>
      <h1>Add New Feedback</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course Name: </label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Feedback Comments: </label>
          <textarea
            value={feedbackComments}
            onChange={(e) => setFeedbackComments(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Feedback Rating: </label>
          <input
            type="number"
            min="1"
            max="5"
            value={feedbackRating}
            onChange={(e) => setFeedbackRating(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default AddFeedback;
