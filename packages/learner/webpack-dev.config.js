const webpackConfig = require('./webpack.config.js');

module.exports = {
  ...webpackConfig,
  mode: "development",

  devtool: "source-map",

  devServer: {
    historyApiFallback: true,
  },
}
