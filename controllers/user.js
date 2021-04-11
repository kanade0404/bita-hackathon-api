const User = require('../models/User');
const Store = require('../models/Store');
const userAdapter = require('../adapter/user');
const storeAdapter = require('../adapter/store');

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json({ data: !users || users.length === 0 ? [] : users.map((user) => userAdapter.convertUserResponse(user)) });
};

exports.getUserDetail = (req, res) => {
  res.json({
    data: {
      id: '12345', email: 'user1@example.com', name: 'John Doe', picture: 'data:image/png;base64,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'
    }
  });
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
