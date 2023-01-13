const path = require('path');

module.exports = {
  entry: __dirname + '/src/main-raw.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public/js'),
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "sass-loader",
        ],
      },
    ],
  },
};
