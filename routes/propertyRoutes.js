const express = require('express');
const router = express.Router();
const { protect, isAgent } = require('../middleware/authMiddleware');
const Property = require('../models/Property');

// Add new property (agent only)
router.post('/', protect, isAgent, async (req, res) => {
  const property = new Property({ ...req.body, createdBy: req.user._id });
  await property.save();
  res.status(201).json(property);
});

// View all properties
router.get('/', async (req, res) => {
  const properties = await Property.find().populate('createdBy', 'name');
  res.json(properties);
});

module.exports = router;
