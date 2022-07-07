import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

interface ContainerProps{
  showForm: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: rgba(0, 0, 0, 0.5);

  ${props =>
    !props.showForm &&
    css`
    display: none;
    `
}

  div{
    display: flex;
    flex-direction: column;
    background-color: white;
    width: 400px;
    border-radius: 2.6rem;

    max-width: 50rem;
    width: fit-content;
    position: relative;
    align-items: center;
    text-align: center;
    padding: 5.2rem 2rem;

    a{
      img{
      position: absolute;
      right: 2rem;
      top: 2rem;


      width: 3rem;
      height: 3rem;
      border-radius: 50%;

      }
    }

    img{
      width: 120px;
    }


    h3{
      color: ${theme.colors.blueMain};
      font-weight: bold;
      padding: 3rem 7rem;
    }

    p{
      color: ${theme.colors.gray500};
      padding-bottom: 2rem;
      padding: 0 4rem;
    }

  }


`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  width: 100%;
  justify-content: left;

  div{
    width: 100%;
  }


  form{
    background-color: white;
    padding: 1rem;
  }

  h2{
    background-color: ${theme.colors.gray500};
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 15px;
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

  #re {
    width: 25%;
  }

  #separator {
    width: 100%;
    height: 2px;
    background: ${theme.colors.background};
    margin: 4rem 4rem 1rem;
  }

  img{
    width: 120px;
    border-radius: 10px;

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

   span{
     font-size: 18px;
   }
  }


`;
