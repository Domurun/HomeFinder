const mongoose = require('mongoose');

const savedPropertySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
}, { timestamps: true });

module.exports = mongoose.model('SavedProperty', savedPropertySchema);