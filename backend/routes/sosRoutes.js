const express = require("express");

const router = express.Router();

const {
  createSOS,
  getAllEmergencies,
} = require("../controllers/sosController");

router.post("/", createSOS);

router.get("/", getAllEmergencies);

module.exports = router;