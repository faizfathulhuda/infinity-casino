module.exports = {
  content: ['./src/**/*.{vue,html,js,ts}'],
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  theme: {
    fontFamily: {
      poppins: ['poppins']
    },
    colors: {
      'btn-red' : '#B03A3C'
    }
  },
  daisyui: {
    styled: true,
    themes: ['light'],
    base: true,
    utils: true,
    rtl: false
  }
}
