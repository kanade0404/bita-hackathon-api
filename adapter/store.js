exports.convertStore = (store) => ({
  id: store._id,
  name: store.name,
  latitude: store.latitude,
  longitude: store.longitude,
  createdAt: store.createdAt,
  updatedAt: store.updatedAt,
});
