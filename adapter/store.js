const convertToJST = (strDate) => {
  const date = new Date(strDate);
  date.setHours(date.getHours() + 9);
  return date;
};

const parseDate = (strDate) => {
  const date = convertToJST(strDate);
  const [y, m, d] = date.toLocaleDateString('ja-JP').split('/');
  // eslint-disable-next-line no-unused-vars
  const [h, i, _] = date.toLocaleTimeString('ja-JP').split(':');
  return `${y}年${m}月${d}日 ${h}時${i}分`;
};

exports.convertStore = (store) => ({
  id: store._id,
  name: store.name,
  latitude: store.latitude,
  longitude: store.longitude,
  createdAt: parseDate(store.createdAt),
  updatedAt: parseDate(store.updatedAt),
});
