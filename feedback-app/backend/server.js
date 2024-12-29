const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB Atlas
mongoose.connect('your-mongodb-atlas-uri', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Feedback model
const feedbackSchema = new mongoose.Schema({
  courseName: String,
  feedbackComments: String,
  feedbackRating: Number,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// Routes
app.get('/feedbacks', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(400).send('Error fetching feedbacks');
  }
});

app.post('/feedbacks', async (req, res) => {
  const { courseName, feedbackComments, feedbackRating } = req.body;
  const newFeedback = new Feedback({
    courseName,
    feedbackComments,
    feedbackRating,
  });

  try {
    await newFeedback.save();
    res.status(201).send('Feedback added');
  } catch (err) {
    res.status(400).send('Error adding feedback');
  }
});

app.put('/feedbacks/:id', async (req, res) => {
  const { courseName, feedbackComments, feedbackRating } = req.body;
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, {
      courseName,
      feedbackComments,
      feedbackRating,
    }, { new: true });
    res.json(feedback);
  } catch (err) {
    res.status(400).send('Error updating feedback');
  }
});

app.delete('/feedbacks/:id', async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.send('Feedback deleted');
  } catch (err) {
    res.status(400).send('Error deleting feedback');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
