module.exports = {
  content: ['./src/**/*.{vue,html,js,ts}'],
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  theme: {
    fontFamily: {
      poppins: ['poppins']
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
