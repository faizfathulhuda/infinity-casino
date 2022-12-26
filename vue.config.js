const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
 configureWebpack: {
    devServer: {
      headers: { 'Access-Control-Allow-Origin': '*' }
    }
  },
  pwa: {
    name: 'vue3-template',
    workboxPluginMode: 'GenerateSW',
    manifestOptions: {
      short_name: 'Casino',
      name: 'Infinity Casino',
      start_url: '/?utm_source=homescreen',
      display: 'standalone',
      orientation: 'portrait',
      theme_color: '#F44336',
      background_color: '#FFF9C4'
    }
  }
})
