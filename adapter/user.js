exports.convertUserResponse = (user) => ({
  id: user._id,
  name: user.profile.name,
  email: user.email,
  picture: user.profile.picture,
  tags: user.tags
});
