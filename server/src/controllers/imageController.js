const cloudinary = require('cloudinary').v2;
const Image = require('../models/Image');

// Helper function to extract Cloudinary metadata
const extractCloudinaryData = (cloudinaryResult) => ({
  cloudinaryId: cloudinaryResult.public_id,
  url: cloudinaryResult.url,
  secureUrl: cloudinaryResult.secure_url,
  publicId: cloudinaryResult.public_id,
  format: cloudinaryResult.format,
  width: cloudinaryResult.width,
  height: cloudinaryResult.height,
  bytes: cloudinaryResult.bytes
});

// Upload image with transformation options
const uploadImageWithTransform = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const { transformation } = req.body;
    let transformOptions = {};

    // Apply custom transformations if provided
    if (transformation) {
      const transforms = JSON.parse(transformation);
      transformOptions = transforms;
    }

    // Upload to Cloudinary with transformations
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'uploads',
      transformation: transformOptions,
      ...req.body.cloudinaryOptions && JSON.parse(req.body.cloudinaryOptions)
    });

    const { title, description, tags, category, uploadedBy } = req.body;

    const newImage = new Image({
      title: title || 'Untitled',
      description: description || '',
      ...extractCloudinaryData(result),
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      category: category || 'general',
      uploadedBy: uploadedBy || 'anonymous'
    });

    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image', error: error.message });
  }
};

// Get images by category
const getImagesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const images = await Image.find({ category })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Image.countDocuments({ category });

    res.json({
      images,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
      category
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching images by category', error: error.message });
  }
};

// Search images
const searchImages = async (req, res) => {
  try {
    const { q } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const images = await Image.find({
      $text: { $search: q }
    }, {
      score: { $meta: 'textScore' }
    })
      .sort({ score: { $meta: 'textScore' } })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Image.countDocuments({
      $text: { $search: q }
    });

    res.json({
      images,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
      query: q
    });
  } catch (error) {
    res.status(500).json({ message: 'Error searching images', error: error.message });
  }
};

module.exports = {
  uploadImageWithTransform,
  getImagesByCategory,
  searchImages
};