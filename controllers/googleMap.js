const axios = require('axios');

const SEARCH_RADIUS = 50;

const getRestaurantInfo = async (nearByInfo) => {
  const { place_id: placeId, vicinity, geometry } = nearByInfo;
  const res = await axios.post(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,formatted_phone_number&language=ja&key=${process.env.GOOGLE_MAP_API_KEY}`);
  const {
    formatted_phone_number: formattedPhoneNumber, name, rating
  } = res.data.result;
  const { lat, lng } = geometry.location;
  return {
    lat,
    lon: lng,
    phone_number: formattedPhoneNumber,
    name,
    rating,
    address: vicinity
  };
};

exports.getNearbyRestaurant = async (req, res) => {
  const { lat, lon } = req.body;
  try {
    const axiosResponse = await axios.post(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=${SEARCH_RADIUS}&type=restaurant&language=ja&key=${process.env.GOOGLE_MAP_API_KEY}`);
    const results = await Promise.all(axiosResponse.data.results.map(async (result) => getRestaurantInfo(result)));
    res.json({ data: results });
  } catch (error) {
    res.status(400).json({ error });
  }
};
