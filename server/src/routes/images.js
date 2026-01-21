const express = require('express');
const cloudinary = require('cloudinary').v2;
const upload = require('../middleware/upload');
const Image = require('../models/Image');

const router = express.Router();

// GET /api/images - Get all images with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category;
    const search = req.query.search;

    const query = {};
    if (category) query.category = category;
    if (search) {
      query.$text = { $search: search };
    }

    const images = await Image.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Image.countDocuments(query);

    res.json({
      images,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching images', error: error.message });
  }
});

// GET /api/images/:id - Get single image
router.get('/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.json(image);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching image', error: error.message });
  }
});

// POST /api/images - Upload new image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const { title, description, tags, category, uploadedBy } = req.body;

    const newImage = new Image({
      title: title || 'Untitled',
      description: description || '',
      cloudinaryId: req.file.filename,
      url: req.file.path,
      secureUrl: req.file.path,
      publicId: req.file.filename,
      format: req.file.format || req.file.mimetype.split('/')[1],
      width: req.file.width || 0,
      height: req.file.height || 0,
      bytes: req.file.size || 0,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      category: category || 'general',
      uploadedBy: uploadedBy || 'anonymous'
    });

    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image', error: error.message });
  }
});

// PUT /api/images/:id - Update image metadata
router.put('/:id', async (req, res) => {
  try {
    const { title, description, tags, category } = req.body;
    
    const updatedImage = await Image.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : undefined,
        category
      },
      { new: true, runValidators: true }
    );

    if (!updatedImage) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.json(updatedImage);
  } catch (error) {
    res.status(500).json({ message: 'Error updating image', error: error.message });
  }
});

// DELETE /api/images/:id - Delete image
router.delete('/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.publicId);

    // Delete from database
    await Image.findByIdAndDelete(req.params.id);

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting image', error: error.message });
  }
});

module.exports = router;