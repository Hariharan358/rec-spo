const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  cloudinaryId: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  secureUrl: {
    type: String,
    required: true
  },
  publicId: {
    type: String,
    required: true
  },
  format: {
    type: String,
    required: true
  },
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  bytes: {
    type: Number,
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    trim: true,
    default: 'general'
  },
  uploadedBy: {
    type: String,
    default: 'anonymous'
  }
}, {
  timestamps: true
});

// Index for better query performance
imageSchema.index({ title: 'text', description: 'text', tags: 'text' });
imageSchema.index({ category: 1 });
imageSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Image', imageSchema);