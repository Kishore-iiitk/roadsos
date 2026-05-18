const Emergency = require("../models/Emergency");

const createSOS = async (req, res) => {
  try {
    const { userId, latitude, longitude } = req.body;

    if (!userId || !latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const emergency = await Emergency.create({
      userId,

      location: {
        latitude,
        longitude,
      },
    });

    console.log("Emergency Stored:", emergency);

    res.status(201).json({
      success: true,
      message: "SOS triggered successfully",
      emergency,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getAllEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: emergencies.length,
      emergencies,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createSOS,
  getAllEmergencies,
};