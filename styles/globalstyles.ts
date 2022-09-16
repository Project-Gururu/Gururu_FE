import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}
  html,
  body {
    color: ${({ theme }) => theme.colors.primary};
    padding: 0;
    margin: 0;
    font-family: 'Noto Sans KR', sans-serif;
  }
  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }
  svg {
    cursor: pointer;
  }
  input { 
    outline: none;
  }
  * {
    box-sizing: border-box;
  }
`

export default GlobalStyle
