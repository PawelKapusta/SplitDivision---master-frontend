import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyle = createGlobalStyle`
  ${normalize};
     * {
       box-sizing: border-box;
       margin: 0;
       padding: 0;
     }
     html {
       font-size: 62.5%;
       scroll-behavior: smooth;
     }
  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyle;

//   body {
//     font-family: ${(props) => props.theme.fonts && props.theme.fonts.main};
//     font-size: 1.6rem;
//     background: ${(props) => props.theme.colors.background1};
//     color: ${(props) => props.theme.colors.primary1};
//     cursor: default;
//   }
//   h1,h2,h3,h4,h5,h6,button {
//     font-family: ${(props) => props.theme.fonts && props.theme.fonts.title};
//   }
