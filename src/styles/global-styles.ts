import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyles = createGlobalStyle`
  ${normalize};
     * {
       box-sizing: border-box;
       margin: 0;
       padding: 0;
       background-color: black;
       color: ${(props) => props.theme.colors.primary};
     }
     html {
       font-size: 18px;
       scroll-behavior: smooth;
     }
  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyles;
