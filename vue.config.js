const webpack = require('webpack')
module.exports = {
  transpileDependencies: ['vuetify'],
  configureWebpack: {
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
