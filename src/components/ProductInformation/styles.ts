import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  display:flex;
  height: 100vh;
  `;

export const Content = styled.div`
margin-bottom: 4rem;

  #checkbox{
   display:flex;
   align-items: center;

   span{
     font-size: 1.8rem;
   }
  }

  #info-produto {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 1rem;

    align-items: center;

    @media (max-width: 650px){
      grid-template-columns: 1fr;
    }
  }
  #img-produto-recebido {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr ;
    grid-gap: 1rem;

    @media (max-width: 650px){
      grid-template-columns: 1fr;
    }
  }

  .statusRecebido {
    display: flex;
    align-items:center;
  }

  .img-produto {
    margin-bottom:2rem;
  }

  div#box-avarias{
    p{
      font-size:1.6rem;
      margin: 1rem 0;
    }
    img {
      margin-right: 1rem;
    }
  }

  #imageLabel{
    margin-left: 2rem;
    font-size: 1.6rem;
  }

  h3{
    color: ${theme.colors.blueMain};
    font-size: 1.7rem;
    font-weight: bold;
    margin-bottom: -1rem;
    margin-top: 2rem;
  }

  .gray {
    color: ${theme.colors.gray500};
  }

  #info-dates {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 1rem;


    @media (max-width: 650px){
      grid-template-columns: 1fr;
    }
  }
`;
