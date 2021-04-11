const User = require('../models/User');
const Store = require('../models/Store');
const userAdapter = require('../adapter/user');
const storeAdapter = require('../adapter/store');

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json({ data: !users || users.length === 0 ? [] : users.map((user) => userAdapter.convertUserResponse(user)) });
};

exports.getUserDetail = async (req, res) => {
  res.json({ data: await User.findById(req.params.id) });
};

exports.createStore = async (req, res) => {
  const { name, latitude, longitude } = req.body;
  try {
    const existStore = await Store.findOne({ name, latitude, longitude });
    if (existStore) {
      res.json({ data: existStore });
    } else {
      const store = await Store.create({ name, latitude, longitude });
      res.json({ data: store });
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

exports.createReview = (req, res) => {
  res.json({
    data: {
      id: '1',
      content: 'LGTM!',
      store: {
        id: '1',
        name: 'restaurant',
        latitude: 36.204823999999995,
        longitude: 138.252924
      },
      user: {
        id: '12345', email: 'user1@example.com', name: 'John Doe', picture: 'test.img'
      }
    }
  });
};

exports.getReview = (req, res) => {
  res.json({
    data: [
      {
        id: '1',
        content: 'LGTM!',
        store: {
          id: '1',
          name: 'restaurant',
          latitude: 36.204823999999995,
          longitude: 138.252924
        },
        user: {
          id: '12345', email: 'user1@example.com', name: 'John Doe', picture: 'test.img'
        }
      },
      {
        id: '2',
        content: 'ここはいいぞ',
        store: {
          id: '1',
          name: 'restaurant',
          latitude: 36.204823999999995,
          longitude: 138.252924
        },
        user: {
          id: '23456', email: 'user2@example.com', name: 'John Smith', picture: 'te2t.img'
        }
      }
    ]
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
  });
  res.cookie('connect.sid', '');
  res.redirect(`${process.env.CLIENT_URL}/login`);
};
