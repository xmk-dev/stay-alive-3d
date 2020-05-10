const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: {
    game: path.join(__dirname, './src/app/game/index.js'),
    score: path.join(__dirname, './src/app/score/index.js'),
    index: path.join(__dirname, './src/index.js'),
  },
  output: {
    filename: 'js/[name].[hash].js',
    path: path.join(__dirname, './public'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CompressionPlugin(),
      new OptimizeCssAssetsPlugin(),
      new HtmlWebpackPlugin({
        chunks: ['index'],
        filename: 'auth/index.html',
        scriptLoading: 'defer',
        template: path.join(__dirname, './src/templates/auth.html'),
      }),
      new HtmlWebpackPlugin({
        chunks: ['score', 'index'],
        filename: 'score/index.html',
        scriptLoading: 'defer',
        template: path.join(__dirname, './src/templates/score.html'),
      }),
      new HtmlWebpackPlugin({
        chunks: ['game', 'index'],
        filename: 'game/index.html',
        scriptLoading: 'defer',
        template: path.join(__dirname, './src/templates/game.html'),
      }),
      new HtmlWebpackPlugin({
        chunks: ['index'],
        filename: 'index.html',
        scriptLoading: 'defer',
      }),
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, './public'),
    compress: true,
    host: 'dev.com',
    open: true,
    port: 9000,
  },
};
