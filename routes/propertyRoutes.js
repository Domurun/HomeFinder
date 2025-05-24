const express = require('express');
const router = express.Router();
const { protect, isAgent } = require('../middleware/authMiddleware');
const Property = require('../models/Property');

// Create property (agents only)
router.post('/', protect, isAgent, async (req, res) => {
  const property = new Property({ ...req.body, createdBy: req.user._id });
  await property.save();
  res.status(201).json(property);
});

// Get all properties
router.get('/', async (req, res) => {
  const properties = await Property.find().populate('createdBy', 'name');
  res.json(properties);
});

// Get a specific property
router.get('/:id', async (req, res) => {
  const property = await Property.findById(req.params.id).populate('createdBy', 'name');
  if (!property) return res.status(404).json({ message: 'Property not found' });
  res.json(property);
});

module.exports = router;