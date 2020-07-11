const { configureApp } = require("./src/server/dist");

module.exports = {
  devServer: {
    before: configureApp
  }
};
