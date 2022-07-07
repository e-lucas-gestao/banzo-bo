import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

interface ContainerProps{
  showForm: boolean;
}

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

  background-color: rgba(0, 0, 0, 0.5);

  ${props =>
    !props.showForm &&
    css`
    display: none;
    `
}



  div#content{
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 2.6rem;

    height: auto;
    width: fit-content;
    position: relative;
    align-items: center;
    text-align: center;
    padding: 7rem 7rem;

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


    h3{
      color: ${theme.colors.blueMain};
      font-size: 3rem;
      font-weight: bold;
      padding: 3rem 7rem;
    }
  }


`;
