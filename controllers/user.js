const User = require('../models/User');
const Store = require('../models/Store');
const Review = require('../models/Review');
const userAdapter = require('../adapter/user');
const storeAdapter = require('../adapter/store');

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json({ data: !users || users.length === 0 ? [] : users.map((user) => userAdapter.convertUserResponse(user)) });
};

exports.getUserDetail = async (req, res) => {
  res.json({ data: await User.findById(req.params.id) });
};

exports.updateUser = (req, res) => {
  const {
    id, name, picture, description, tags
  } = req.body;
  User.findById(id, async (err, user) => {
    if (err) { return res.status(404); }
    if (name) { user.profile.name = name; }
    if (picture) { user.profile.picture = picture; }
    if (description) { user.description = description; }
    if (tags && tags.length > 0) { user.tags = tags; }
    user.save();
    res.json({ data: userAdapter.convertUserResponse(user) });
  });
};

exports.createStore = async (req, res) => {
  const { name, latitude, longitude } = req.body;
  try {
    const existStore = await Store.findOne({ name, latitude, longitude });
    if (existStore) {
      res.json({ data: storeAdapter.convertStore(existStore) });
    } else {
      const store = await Store.create({ name, latitude, longitude });
      res.json({ data: storeAdapter.convertStore(store) });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.getStore = async (req, res) => {
  const stores = await Store.find();
  res.json({
    data: stores.map((store) => storeAdapter.convertStore(store))
  });
};

exports.getStoreDetail = async (req, res) => {
  res.json({
    data: storeAdapter.convertStore(await Store.findById(req.params.id))
  });
};

exports.createReview = async (req, res) => {
  const { content, userId, storeId } = req.body;
  console.log(content, userId, storeId);
  const user = await User.findById(userId);
  const store = await Store.findById(storeId);
  console.log(user, store);
  if (!(user && store)) {
    res.status(400).json({ message: `Not found user or store id: ${userId}, store id: ${storeId}` });
  } else {
    const review = await Review.create({ content, storeId, userId });
    res.json({
      id: review._id,
      content: review.content,
      user: userAdapter.convertUserResponse(user),
      store: storeAdapter.convertStore(store),
      updatedAt: review.updatedAt
    });
  }
};

exports.getReview = async (req, res) => {
  const reviews = await Review.find({ storeId: req.body.storeId });
  res.json({
    data: !reviews || reviews.length === 0 ? [] : Promise.all(reviews.map(async (review) => {
      const store = await Store.findById(review.storeId);
      const user = await User.findById(review.userId);
      return {
        content: review.content,
        store: storeAdapter.convertStore(store),
        user: userAdapter.convertUserResponse(user)
      };
    }))
  });
};

/**
 * POST /logout
 * Log out.
 */
exports.logout = (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    if (err) console.log('Error : Failed to destroy the session during logout.', err);
    req.user = null;
    if (req.session && req.session.user) { req.session.user = null; }
    res.cookie('connect.sid', '');
    res.cookie('userId', '');
    res.redirect(`${process.env.CLIENT_URL}/login`);
  });
};
