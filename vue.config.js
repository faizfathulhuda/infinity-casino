const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
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
