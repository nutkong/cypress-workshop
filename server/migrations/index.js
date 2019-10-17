const mongoose = require("mongoose");
const UserSeeder = require("./user_migration");

module.exports.migrate = async function() {
  mongoose.connect("mongodb://localhost/conduit");

  await UserSeeder.up();

  mongoose.disconnect();
};

module.exports.destroy = async function() {
  mongoose.connect("mongodb://localhost/conduit");

  await UserSeeder.down();

  mongoose.disconnect();
};
