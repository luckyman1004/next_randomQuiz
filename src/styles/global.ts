import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  body {
    color: ${({ theme }) => theme.colors.contrastText};
    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;
    margin: 0;
    padding: 0;
  }
  
  html, body {
    min-height: 100vh;
  }
  
  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;
