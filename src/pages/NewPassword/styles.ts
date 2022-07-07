import styled from 'styled-components';
import { theme } from '../../styles/theme';

import signInBackgroundImg from '../../assets/logo.png';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center; // place-content: center;
  background-color: #fff;
  width: 100%;
  max-width: 70rem;

  img {
    width: 20rem;
  }

  form {
    margin: 8rem 0;
    width: 34rem;
    text-align: center;

    #welcome {
      text-align: left;
    }

    h1 {
      margin-bottom: 1.4rem;
    }

    h4 {
      margin-bottom: 5.7rem;
    }

    a {
      color: ${theme.colors.blueMain};
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${theme.colors.greenLogo};
      }
    }
  }

  > a {
    color: ${theme.colors.blueMain};
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${theme.colors.greenLogo};
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`;
