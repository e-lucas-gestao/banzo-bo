import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Content = styled.div`
  display: flex;
  gap: 2.4rem;
  width: 100%;

  @media print {
    display: none;
  }

  div {
    width: 100%;
  }

  .max-width {
    width: 100% !important;
  }

  .message-chat {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
  }

  form {
    background-color: white;
    padding: 2rem 2rem;
  }

  h2 {
    background-color: ${theme.colors.gray500};
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 15px;
    padding: 0.8rem;
  }

  h3 {
    color: ${theme.colors.blueMain};
    margin: 1rem;
    font-size: 1.7rem;
    font-weight: bold;
  }

  #chatBox {
    background: #ffffff;
    width: 100%;
  }

  div#chatContent {
    display: flex;
    flex-direction: row;
    width: 100%;

  }

  div#tableChat {
    display: flex;
    flex: 2;
    flex-direction: column;
    width: 100%;
    height: 70rem;
    overflow-y: auto;
    min-height: 50px;
  }

  div#chatHeader {
    background-color: #21457F;
    align-items: center;
    height: 55px;
    padding: 0 20px;
    border-right: 4px solid #ffffff;
    display: flex;
    flex-direction: row;
    position: sticky;
    top: 0;
    justify-content: space-between;

    div#title {
      width: min-content
    }

    #info {
      background: #21457F;
      width: min-content;
      display: flex;
      margin: -2px;

    }

  
  }



  #nameChat {
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
    color: #FFFFFF;
  }


  div#tableHistorico {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 71rem;
    overflow-y: auto;
    width: 10%;
  }

  div#historicoHeader {
    display: flex;
    align-items: center;
    padding: 0 24px;
    background: #539F03;
    height: 55px;
    top:0;
    position: sticky;
    /* width: 34rem; */
  }


  #nameHistorico {
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
    color: #FFFFFF;
  }

  div#Add {
    display: flex;
    justify-content: center;
    width: 30%;
  }

  div#call {
    display: flex;
    justify-content: center;
    width: 30%;
  }
  .middle {
    display: flex;
    align-items: center;
    height: 100%;
  }
  #callDot{
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${theme.colors.statusRed};

    top: 25px;
    right: 15px;

    animation: blink-animation 1s steps(5, start) infinite;
    -webkit-animation: blink-animation 1s steps(5, start) infinite;
  }
  @keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }
  @-webkit-keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }

`;

interface IIconsProps{
  hide: boolean;
}

export const ContainerIcons = styled.div<IIconsProps>`
  visibility: ${({ hide }) => (hide ? 'hidden' : 'visible')};
  display: flex;
  width: min-content !important; 
  gap: 10px;

  button{
  border: 0;
  background: none;
    }
`;
