const PreloadWebpackPlugin = require("preload-webpack-plugin");

module.exports = function override(config, env) {
  if (!config.plugins) {
    config.plugins = [];
  }
  config.plugins.push(
    new PreloadWebpackPlugin({
      rel: "prefetch",
      include: "allAssets"
    })
  );
  return config;
};
