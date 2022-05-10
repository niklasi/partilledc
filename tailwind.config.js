const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: 'rgb(0,188,212)',
        secondary: 'rgb(255,64,129)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function({ addUtilities, addVariant }){
      const newUtilities = {
        '@supports(padding: max(0px))': {
          '.safe-top' : {
            paddingTop: 'env(safe-area-inset-top)',
          },
          '.safe-left' : {
            paddingLeft: 'env(safe-area-inset-left)'
          },
          '.safe-right' : {
            paddingRight: 'env(safe-area-inset-right)'
          },
          '.safe-bottom' : {
            paddingBottom: 'env(safe-area-inset-bottom)'
          }
        }
      }

      addUtilities( newUtilities );
      addVariant('portrait', '@media(orientation: portrait)');
      addVariant('landscape', '@media(orientation: landscape)');
    })
  ],
}
