import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
  @media print{
    display:none;
  }

 * {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
   outline: 0;
 }

 html {
  font-size: 62.5%;
 }

  html {
    @media (max-width: 1000px){
      font-size: 58.5%;
    }

    @media (max-width: 720px) {
      font-size: 54.5%;
    }
  }

 body {
   background: ${theme.colors.background};
   color: #000000;
   //-webkit-font-smoothing: antialised;
 }

 body, input, button, select {
   font-family: 'Be Vietnam Pro', serif;
   font-size: 1.6rem;

 }

 a{
   color: inherit;
   text-decoration: none;
 }

 h1, h2, h3, h4, h5, h6, strong {
   font-weight: 500;
 }

button {
  cursor: pointer;
}

form{
}
`;
