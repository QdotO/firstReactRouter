const envMode = process.env.NODE_ENV || 'development';
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpack = require('webpack');

module.exports = {
  mode: envMode,
  entry: {
    app: './src/js/index.js',
  },
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      // new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: "[name].css",
    //   chunkFilename: "[id].css"
    // }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [
          // MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
}