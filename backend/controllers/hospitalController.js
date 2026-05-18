const axios = require("axios");

const getNearbyHospitals = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude required",
      });
    }

    const query = `
      [out:json];
      (
        node["amenity"="hospital"](around:5000,${lat},${lng});
      );
      out;
    `;

    const url = `https://overpass.kumi.systems/api/interpreter?data=${encodeURIComponent(query)}`;

    const response = await axios.get(url, {
        headers: {
            "User-Agent": "RoadSoS Emergency App",
        },
    });

    const hospitals = response.data.elements.map((hospital) => ({
      id: hospital.id,
      name: hospital.tags?.name || "Unnamed Hospital",
      latitude: hospital.lat,
      longitude: hospital.lon,
    }));

    res.status(200).json({
      success: true,
      count: hospitals.length,
      hospitals,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch hospitals",
    });
  }
};

module.exports = {
  getNearbyHospitals,
};