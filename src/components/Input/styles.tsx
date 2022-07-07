import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const ContainerWrapper = styled.div`
  label{
    margin-left: 2rem;
  }
`;

export const Container = styled.div`
  display:flex;
  flex-direction: column;
`;
export const Content = styled.div<ContainerProps>`
  background: ${theme.colors.background};
  border-radius: 4rem;
  border: 0.2rem solid #e3e3e3;
  padding: 1.2rem;
  color: ${theme.colors.background};
  align-items: block;

  margin-top: 0.8rem;

  ${props =>
    props.isFocused &&
    css`
      color: ${theme.colors.background};
      border-color: ${theme.colors.background};
    `}

  ${props =>
    props.isFilled &&
    css`
      color: ${theme.colors.background};
    `}

  input {
    flex: 1;
    width: 100%;

    background: transparent;
    border: 0;
    color: #000000;
    margin-left: 1rem;
    padding-right: 2rem;

    &::placeholder {
      color: #666360;
    }
  }
  svg {
    margin-right: 16px;
  }

  div#message-box {
    margin-top: 2rem;

    textarea {
      width: 100%;
      height: 10rem;
      background: ${theme.colors.background};
      border-radius: 1.1rem;
      border: 0.2rem solid #e3e3e3;
      padding: 1.2rem;
    }
  }

`;

export const ErrorMessage = styled.span`
  font-size: 14px;
  align-items: left;

  p{
    text-align: left;
    margin-left: 2rem;
    color: ${theme.colors.background}
  }

  div{
    height: 1.8rem;
  }
`;
