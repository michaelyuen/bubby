// https://github.com/netlify/netlify-lambda/issues/179
const nodeExternals = require("webpack-node-externals");

module.exports = {
  externals: [nodeExternals()]
};
