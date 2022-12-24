const path = require('path')

module.exports = {
  entry: "./src/index.ts",
  target: "node",
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  module: {
    rules: [
      {
        test: /\.m?js$|\.tsx?$/,
        exclude: /(node_modules)/,
        use: {
          // `.swcrc` can be used to configure swc
          loader: "swc-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  externals: {
    "nest-commander": "commonjs nest-commander",
    "@nestjs/core": "commonjs @nestjs/core",
    "@nestjs/common": "commonjs @nestjs/common",
  },
  output: {
    libraryTarget: 'commonjs2',
    filename: 'index.js',
    path: path.resolve(__dirname, "dist"),
  },
}
