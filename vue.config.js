const webpack = require('webpack')

module.exports = {
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    entry: ['babel-polyfill', './src/main.js'],
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jquery: 'jquery',
        'window.jQuery': 'jquery',
        'window.$': 'jquery',
        jQuery: 'jquery'
      })
    ]
  },
  lintOnSave: true,
  runtimeCompiler: true
}
