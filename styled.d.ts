import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
      secondary: string
      white: string
      gray: string
      default: string
    }
    devices: {
      mobile: string
      tablet: string
      laptop: string
      desktop: string
    }
    margins: {
      sm: string
      base: string
      lg: string
      xl: string
    }
    paddings: {
      sm: string
      base: string
      lg: string
      xl: string
    }
    size: {
      sm: string
      base: string
      lg: string
      xl: string
      title: string
    }
  }
}
