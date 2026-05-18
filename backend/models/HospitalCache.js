const mongoose = require("mongoose");

const hospitalCacheSchema = new mongoose.Schema({
  centerLatitude: {
    type: Number,
    required: true,
  },

  centerLongitude: {
    type: Number,
    required: true,
  },

  hospitals: [
    {
      id: Number,

      name: String,

      latitude: Number,

      longitude: Number,
    },
  ],

  cachedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "HospitalCache",
  hospitalCacheSchema
);