import { createGlobalStyle, keyframes } from "styled-components";
import { normalize } from "styled-normalize";

const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const GlobalStyles = createGlobalStyle`
  ${normalize};
     * {
       box-sizing: border-box;
       margin: 0;
       padding: 0;
       background-color: black;
       color: ${(props) => props.theme.colors.primary};
       font-family: 'Crimson Text', serif;
       animation: ${fadeIn} 0.5s ease-in-out;
     }
     main {
       height: 100vh;
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
