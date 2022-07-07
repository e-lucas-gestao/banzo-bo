import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

interface ContainerProps{
    showModal: boolean;
  }

export const Container = styled.div<ContainerProps>`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    

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
`;
