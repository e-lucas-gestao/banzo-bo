import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

interface ContainerProps{
    showForm: boolean;
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
    !props.showForm &&
    css`
    display: none;
    `
}

div#modalConfirmation{
    margin: auto;
    display: flex;
    flex-direction: column;
    border-radius: 2.0rem;
    background-color: ${theme.colors.background};
    border: 1.5px solid ${theme.colors.borderColor};



    height: auto;
    width: fit-content;
    position: relative;
    align-items: center;

    padding: 3rem 5rem;
}
h3{
      color: ${theme.colors.greenMain};
      font-weight: bold;
      padding: 3rem 7rem;
    }


`;
