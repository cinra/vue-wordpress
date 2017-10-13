import 'babel-polyfill'
import 'babel-preset-es2015'

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const __root = process.env.PWD;

module.exports = (PATH) => {

  return {
    watch: true,
    entry: {
      app: ['babel-polyfill', `${ __root }/${ PATH.src.vue }/app.js`]
    },
    output: {
      path: `${ __root }/${ PATH.dist }/${ PATH.js }/`,
      filename: "app.min.js"
    },
    // devServer: {
    //   contentBase: `${ __root }/${ PATH.dist }/`,
    //   hot: true,
    //   port: 6003,
    //   historyApiFallback: true
    // },
    resolve: {
      extensions: ['.js', '.vue', '.json', '.css'],
      //mainFields: ['browser', 'main'],
      alias: {
        vue: `${ __root }/${ PATH.src.vue }/app.js`
      }
    },
    plugins: [
      new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"' }}),
      new ExtractTextPlugin("app.css"),
      new UglifyJSPlugin(),
      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.(js|html)$/,
        threshold: 10240,
        minRatio: 0.8
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      })
      //new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      rules: [
        // {
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   enforce: 'pre',
        //   include: [`${__root}/${ PATH.src.vue }`]
        // },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              css: generateLoaders(['css-loader']),
              //css: ExtractTextPlugin.extract('css-loader'),
              // postcss: generateLoaders(['css-loader']),
              // sass: generateLoaders(['css-loader', 'sass-loader?indentedSyntax']),
              scss: generateLoaders(['css-loader', 'sass-loader']),
              js: {
                loader: 'babel-loader',
                options: {
                  presets: ['es2015']
                }
              }
            },
            postcss: [
              require('autoprefixer')({
                browsers: ['last 2 versions']
              })
            ]
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2015']
          }
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'vue-style-loader',
            use: 'css-loader'
          })
        }
      ]
    }
  };

  function generateLoaders(loaders) {

    const sourceLoader = loaders.map((loader) => {
      return `${loader}?sourceMap`;
    }).join('!')

    return ['vue-style-loader', sourceLoader].join('!')
  }
}