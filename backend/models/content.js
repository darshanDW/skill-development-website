const mongoose = require('mongoose');

// Schema for individual PDF links
const pdfSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false, // Optional description for the PDF
  },
});

// Schema for individual topics
const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pdfs: {
    type: [pdfSchema], // Array of PDF objects
    required: true, // Each topic must have at least one PDF
  },
});

// Schema for subjects
const subjectSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true, // Subject name is required
  },
  topics: {
    type: [topicSchema], // Array of topic objects
    required: true, // Each subject must have at least one topic
  },
});

const Subjects = mongoose.model('Subjects', subjectSchema);
module.exports = {Subjects};
