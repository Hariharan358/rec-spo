// Validation utilities for image uploads and data

const validateImageFile = (file) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.mimetype)) {
    throw new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.');
  }

  if (file.size > maxSize) {
    throw new Error('File size too large. Maximum size is 5MB.');
  }

  return true;
};

const validateImageData = (data) => {
  const { title, description, tags, category } = data;
  const errors = [];

  if (title && title.length > 100) {
    errors.push('Title must be less than 100 characters');
  }

  if (description && description.length > 500) {
    errors.push('Description must be less than 500 characters');
  }

  if (tags && typeof tags === 'string') {
    const tagArray = tags.split(',').map(tag => tag.trim());
    if (tagArray.length > 10) {
      errors.push('Maximum 10 tags allowed');
    }
    
    const invalidTags = tagArray.filter(tag => tag.length > 30);
    if (invalidTags.length > 0) {
      errors.push('Each tag must be less than 30 characters');
    }
  }

  if (category && category.length > 50) {
    errors.push('Category must be less than 50 characters');
  }

  if (errors.length > 0) {
    throw new Error(errors.join(', '));
  }

  return true;
};

const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Limit length
};

module.exports = {
  validateImageFile,
  validateImageData,
  sanitizeInput
};