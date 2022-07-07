import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

interface ContainerProps{
  inputType: string;
}

export const Container = styled.div<ContainerProps>`
  flex-direction: column;
  display: flex;
  align-items: baseline;
  position: relative;
  padding-left:2rem;




  img{
    width: 120px;
    height: 120px;
    border-radius: 1rem;
    margin-top: 2rem;
    object-fit: cover;
    cursor: pointer;

    border-width: 2px;
    &:hover {
      display: block;
    }
  }


  span{
    align-items: flex-end;
    position: absolute;
    line-height: 13rem;
    content: "Zoom";
    width: 120px;
    height: 120px;
    color: black;
    background-color: ${theme.colors.gray400};
    border-radius: 50%;
    opacity: 60%;
    bottom: 0rem;
    display: none;
  }


`;
