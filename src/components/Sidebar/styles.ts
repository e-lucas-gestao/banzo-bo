import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

import bnzl from '../../assets/bunzl-saude-image.png';

interface ContainerProps {
  show?: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 300px;
  position: initial;
  @media print{
    display:none;
  }
  z-index: 2;
`;

export const Content = styled.div`
  position: fixed;
  align-content: flex-start ;
  display: grid;
  width: 300px;
  height: 100%;

  @media print{
    display:none;
  }

  flex-direction: column;
  background: white;

  a{
    text-decoration: none;
    color: black;
    padding: 1.2rem;
    border-width:3rem;
    border-left: solid transparent;
    &:hover{
      border-left: solid ${theme.colors.gray500};
    }
    &.active{
      font-weight: bold;
    }
  }

  button{
    background: ${theme.colors.blueMain};
    border-radius: 3rem;
    border: 0;
    padding: 0.4rem 0.8rem;
    color: white;
    font-weight: 500;
    margin-top: 0.5rem;
    transition: background-color 0.2s;
    width: 100%;
    align-self: bottom;
  }

  `;

export const Logo = styled.div`
  color: ${theme.colors.blueMain};
  height: 12.4rem;

  background: url(${bnzl}) ${theme.colors.whiteMain} no-repeat center;
  background-size: 10rem;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 60px;
  left: 15px;
  align-items: flex-end;

  button{
    position: fixed;
    background: ${theme.colors.blueMain};
    border-radius: 3rem;
    border: 0;
    padding: 0.4rem 0.8rem;
    color: white;
    font-weight: 500;
    margin-top: 0.5rem;
    transition: background-color 0.2s;
    align-self: bottom;
    width: 40px;

    font-size: 22px;
  }
`;

export const HiddenContainer = styled.div`

@media print{
    display:none;
  }
  position: -webkit-sticky;
  width: 40px;
`;
