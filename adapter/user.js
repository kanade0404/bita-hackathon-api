exports.convertUserResponse = (user) => {
  if (!user) return [];
  return {
    id: user._id,
    name: user.profile.name,
    email: user.email,
    picture: user.profile.picture
  };
};
