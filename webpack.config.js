const path = require('path');
module.exports = {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "out")
  },
  module: {
      rules: [
          {
            test: /\.png/,
            type: 'asset/resource'
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          }
      ]
    }
}