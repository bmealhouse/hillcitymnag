import Typography from 'typography'
import website from './website'

const typography = new Typography({
  title: website.title,
  baseFontSize: '20px',
  googleFonts: [
    {
      name: 'Roboto',
      styles: ['400', '700'],
    },
  ],
  headerFontFamily: [
    'Roboto',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Helvetica',
    'Arial',
    'sans-serif',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
  ],
  bodyFontFamily: [
    'Roboto',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Helvetica',
    'Arial',
    'sans-serif',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
  ],
  headerWeight: 700,
  bodyWeight: 400,
  boldWeight: 700,
})

export default typography
