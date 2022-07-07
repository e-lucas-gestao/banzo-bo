import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  display:flex;
  height: 100vh;
`;

export const Content = styled.div`

  div{
    width: 100%;
  }

  nav{
    height: 2.2rem;
    a{
      font-size: 1.4rem;
      font-weight: 600;
      background-color: ${theme.colors.gray400};
      padding: 0.5rem 1.5rem 0.2rem 1.5rem;
      border-radius: 1rem 1rem 0rem 0rem;
      margin-right: 0.1rem;

      &.active{
        background: ${theme.colors.gray500};
        color: white;
      }
    }

  }

  form{
    background-color: white;
  }

  h2{
    background-color: ${theme.colors.gray500};
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.2rem;
    padding: 1.2rem;
  }

  h3{
    color: ${theme.colors.blueMain};
    font-size: 1.7rem;
    font-weight: bold;
  }

  .gray {
    color: ${theme.colors.gray500};
  }

  #info-solicitacao {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 1rem;


    @media (max-width: 650px){
      grid-template-columns: 1fr;
    }
  }

  #info-cliente {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 1rem;


    @media (max-width: 650px){
      grid-template-columns: 1fr;
    }

  }

  #re {
    width: 25%;
  }

  #separator {
    width: 100%;
    height: 2px;
    background: ${theme.colors.background};
    margin: 4rem 4rem 1rem;
  }


  #info-produto {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 1rem;


    @media (max-width: 650px){
      grid-template-columns: 1fr;
    }
  }

  #checkbox{
   display:flex;
   align-items: center;

    input {
      height: 1.2rem;
      width: 1.2rem;
      margin-left: 1rem;

      &:checked {
        background: red;
        color:red;
      }
    }

   span{
     font-size: 18px;
     margin-left: 1rem;
   }
  }

  div#message-box {
    margin-top: 2rem;

    textarea {
      width: 100%;
      height: 10rem;
      background: ${theme.colors.background};
      border-radius: 1.1rem;
      border: 0.2rem solid #e3e3e3;
      padding: 1.2rem;
    }
  }

  div#status-pedido {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 1rem;
    align-items: flex-end;


    @media (max-width: 650px){
      grid-template-columns: 1fr;
    }

    button{
      width: 75%;
    }
  }

`;
