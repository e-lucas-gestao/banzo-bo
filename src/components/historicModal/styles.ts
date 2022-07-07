import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

interface ContainerProps{
    showModal: boolean;
  }

export const Container = styled.div<ContainerProps>`
    position: absolute;
    display: flex;
    align-items: center;

    position: fixed;
    overflow: hidden;

    
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    z-index: 3;

    background-color: rgba(0, 0, 0, 0.5);

${
  props =>
    !props.showModal &&
    css`
    display: none;
    `
}

#title {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        padding: 2px;

    }

    #box {
        display: flex;
        flex-direction: column;
    }
    

    #message {
        display: flex;
        padding: 0 19px;

        p {
  
         font-family: 'Poppins';
         font-style: normal;
         font-weight: 400;
         font-size: 15px;
         line-height: 16px;
         padding: 10 0px;
         display: flex;
        }
    }

    #user  {
        display: flex;
        width: 40px;
        height:40px;

        
    }

#ModalHistoric {
    margin: auto;
    display: flex;
    flex-direction: column;
    border-radius: 2.0rem;
    background-color: ${theme.colors.background};
    border: 1.5px solid ${theme.colors.borderColor};

    height: auto;
    width: 70%;
    height: 70%;
    position: relative;
    align-items: center;
    overflow-y: auto;

    padding: 3rem 5rem;

    #button{
     justify-content:center ;
      display: flex;
      width:10%;
      height: 65%;
      
    }

    #p {
      color: ${theme.colors.gray500}
    }
}
h3{
      display: flex;
      color: ${theme.colors.blueMain};
      font-weight: bold;
    }
`;
