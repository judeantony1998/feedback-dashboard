import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/feedbacks')
      .then((response) => setFeedbacks(response.data))
      .catch((error) => console.log('Error fetching feedbacks', error));
  }, []);

  const deleteFeedback = (id) => {
    axios.delete(`http://localhost:5000/feedbacks/${id}`)
      .then(() => {
        setFeedbacks(feedbacks.filter(feedback => feedback._id !== id));
      })
      .catch((error) => console.log('Error deleting feedback', error));
  };

  return (
    <div>
      <h1>Feedback Dashboard</h1>
      <table style={{ width: '100%', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Feedback Comments</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback._id}>
              <td>{feedback.courseName}</td>
              <td>{feedback.feedbackComments}</td>
              <td>{feedback.feedbackRating}</td>
              <td>
                <button onClick={() => deleteFeedback(feedback._id)}>Delete</button>
                <Link to={`/update-feedback/${feedback._id}`}>
                  <button>Update</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/add-feedback">
        <button>Add New Feedback</button>
      </Link>
    </div>
  );
};

export default Dashboard;
