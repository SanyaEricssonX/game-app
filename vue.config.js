const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack') // Добавьте эту строку

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.VUE_APP_VERSION': JSON.stringify(require('./package.json').version)
      })
    ]
  }
})
