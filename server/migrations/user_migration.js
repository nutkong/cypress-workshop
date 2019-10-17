const User = require("../models/User");

const users = [
  { username: "john", email: "john@mail.com", password: "john" },
  { username: "foo", email: "foo@mail.com", password: "foo" },
  { username: "bar", email: "bar@mail.com", password: "bar" },
  { username: "doe", email: "doe@mail.com", password: "doe" }
];

module.exports.up = async function() {
  await Promise.all(
    users.map(async user => {
      const newUser = new User();
      newUser.username = user.username;
      newUser.email = user.email;
      newUser.setPassword(user.password);
      return newUser.save();
    })
  );
};

module.exports.down = async function() {
  await User.remove({});
};
