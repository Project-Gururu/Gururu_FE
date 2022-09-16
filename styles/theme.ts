import { DefaultTheme } from 'styled-components'

const theme: DefaultTheme = {
  colors: {
    primary: '#D7C0AE',
    secondary: '#EEE3CB',
    white: '#FFFFFF',
    gray: '#f3f3f3',
    default: 'black',
  },
  devices: {
    mobile: '(min-width: 576px)',
    tablet: '(min-width: 768px)',
    laptop: '(min-width: 992px)',
    desktop: '(min-width: 1200px)',
  },
  margins: {
    sm: '.5rem',
    base: '1rem',
    lg: '2rem',
    xl: '3rem',
  },
  paddings: {
    sm: '.5rem',
    base: '1rem',
    lg: '2rem',
    xl: '3rem',
  },
  size: {
    sm: '1.2rem',
    base: '1.6rem',
    lg: '2rem',
    xl: '2.5rem',
    title: '6rem',
  },
}

export default theme
