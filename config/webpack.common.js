var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var path = require('path');
var htmlLoaderOptions = { interpolate: true, root: path.resolve(__dirname, '..', 'src', 'assets', 'images')};

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root('src', 'tsconfig.json') }
          } , 'angular2-template-loader'
        ]
      },

      { 
        test: /\.(pug|jade)$/, 
        use: [{loader: 'html-loader', options: htmlLoaderOptions}, {loader: 'pug-html-loader' }]
      },

      {
        test: /\.html$/,
        loader: 'html-loader',
        options: htmlLoaderOptions
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|cur)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        test: /css$/,
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: [{ loader: "css-loader", options: { sourceMap: true } }, { loader: "sass-loader", options: { sourceMap: true } }] })
      }
    ]
  },
  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      __dirname, // location of your src
      {} // a map of your routes
    ),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.pug'
    })
  ]
};

