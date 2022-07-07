import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

interface ContainerProps{
  inputType: string;
}

export const Container = styled.div<ContainerProps>`
    flex-direction: column;
    display: flex;
    align-items: center;
    position: relative;


    &:hover span{
      display: block;
    }

    img{
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin-top: 2rem;
      object-fit: cover;
      overflow: hidden;
    }

    input{
      position: absolute;
      bottom: 0;
      width: 120px;
      height: 120px;
      opacity: 0;
      cursor: pointer;
      border-radius: 30px;
    }

    span{
    align-items: flex-end;
    position: absolute;
    line-height: 13rem;
    content: "Mudar imagem";
    width: 121px;
    height: 120px;
    color: black;
    background-color: ${theme.colors.gray400};
    border-radius: 50%;
    opacity: 60%;
    bottom: 0rem;
    display: none;
  }

  ${
  props =>
    props.inputType !== 'usuarios' &&
    css`
    img{
      border-radius:1.5rem;
    }
    span{
      border-radius: 0;
      border-radius: 1.7rem;
    }
    `
}

`;
