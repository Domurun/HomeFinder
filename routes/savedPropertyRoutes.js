const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const SavedProperty = require('../models/SavedProperty');

// Save a property
router.post('/:propertyId', protect, async (req, res) => {
  const exists = await SavedProperty.findOne({ userId: req.user._id, propertyId: req.params.propertyId });
  if (exists) return res.status(400).json({ message: 'Property already saved' });

  const saved = new SavedProperty({ userId: req.user._id, propertyId: req.params.propertyId });
  await saved.save();
  res.status(201).json(saved);
});

// Unsave a property
router.delete('/:propertyId', protect, async (req, res) => {
  await SavedProperty.findOneAndDelete({ userId: req.user._id, propertyId: req.params.propertyId });
  res.status(200).json({ message: 'Property unsaved' });
});

// Get saved properties for a user
router.get('/', protect, async (req, res) => {
  const saved = await SavedProperty.find({ userId: req.user._id }).populate('propertyId');
  res.json(saved);
});

module.exports = router;