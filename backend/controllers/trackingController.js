const Emergency = require("../models/Emergency");

const calculateDistance = require("../utils/calculateDistance");

const getEmergencyTracking = async (req, res) => {
  try {
    const { id } = req.params;

    const emergency = await Emergency.findById(id);

    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: "Emergency not found",
      });
    }

    if (!emergency.ambulanceLocation) {
      return res.status(400).json({
        success: false,
        message: "Ambulance location unavailable",
      });
    }

    const userLat = emergency.location.latitude;

    const userLng = emergency.location.longitude;

    const ambulanceLat =
      emergency.ambulanceLocation.latitude;

    const ambulanceLng =
      emergency.ambulanceLocation.longitude;

    const distance = calculateDistance(
      userLat,
      userLng,
      ambulanceLat,
      ambulanceLng
    );

    // Assume ambulance speed = 40 km/h
    const estimatedTimeMinutes =
      (distance / 40) * 60;

    res.status(200).json({
      success: true,

      tracking: {
        distanceKm: distance.toFixed(2),

        estimatedArrivalMinutes:
          estimatedTimeMinutes.toFixed(1),

        ambulanceLocation:
          emergency.ambulanceLocation,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Tracking calculation failed",
    });
  }
};

module.exports = {
  getEmergencyTracking,
};