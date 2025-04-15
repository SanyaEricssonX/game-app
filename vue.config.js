const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
const packageJson = require('./package.json')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        // Только версия без timestamp
        'process.env.VUE_APP_VERSION': JSON.stringify(packageJson.version),
        // Отдельная переменная для cache busting (с timestamp только в development)
        'process.env.VUE_APP_CACHE_BUSTER': JSON.stringify(
          process.env.NODE_ENV === 'development'
            ? Date.now()
            : packageJson.version
        )
      })
    ]
  }
})