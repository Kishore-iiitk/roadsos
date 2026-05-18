const express = require("express");

const router = express.Router();

const {
  getEmergencyTracking,
} = require("../controllers/trackingController");

router.get("/:id", getEmergencyTracking);

module.exports = router;