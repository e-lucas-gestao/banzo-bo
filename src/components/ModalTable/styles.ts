import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

interface ContainerProps{
    showDrag: boolean;
  }

export const Div = styled.div`

`;
export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  overflow: hidden;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;

  background-color: rgba(240, 240, 240, 0.5);

  ${props =>
    !props.showDrag &&
  css`
  display: none;
  `
}

div#content{
    display: flex;
    flex-direction: column;
    border-radius: 2.0rem;
    background-color: ${theme.colors.background};
    border: 1.5px solid ${theme.colors.borderColor};

    height: auto;
    width: fit-content;
    position: relative;
    align-items: center;

    padding: 2rem 1rem;

    button{
      img{
      position: absolute;
      right: 2rem;
      top: 2rem;


      width: 3rem;
      height: 3rem;
      border-radius: 50%;

      }
    }

    form {
      width: 30rem;
      align-items: left;
      justify-content: left;

      text-align: left;

      div#separator{
        margin-bottom: 2rem;
      }
    }

    img{
      width: 120px;
    }


    h3{
      color: ${theme.colors.blueMain};
      font-size: 3rem;
      font-weight: bold;
      padding: 3rem 7rem;
    }

    h4{

      font-size: 12px;
      /* font-weight: bold; */
    }
  }


`;

export const Content = styled.div`
    display: grid;
    grid-template-columns: 200;
    width: 100%;
    justify-content: left;

    div{
      width: 100%;
    }

    h2{
      background-color: ${theme.colors.gray500};
      color: white;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 15px;
    }

    h3{
      color: ${theme.colors.greenMain};
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

     span{
       font-size: 18px;
       color: ${theme.colors.gray400};
     }
`;

export const SpanModal = styled.span`
  font-size: 12px;
  color: ${theme.colors.gray600};
`;
