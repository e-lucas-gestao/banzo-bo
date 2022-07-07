import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  display:flex;
  height: 100vh;
`;

interface ContentProps {
  active: boolean;
}

export const Content = styled.div`

  div{
    width: 100%;
  }

  nav{
    height: 2.2rem;

  }

  form{
    background-color: white;
  }

  h2{
    background-color: ${theme.colors.gray500};
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.2rem;
    padding: 1.2rem;
  }

  h3{
    color: ${theme.colors.blueMain};
    font-size: 1.7rem;
    font-weight: bold;
  }

  .gray {
    color: ${theme.colors.gray500};
  }


`;

export const TabLink = styled(Link)<ContentProps>`

  font-size: 1.4rem;
  font-weight: 600;
  background-color: ${theme.colors.gray400};
  padding: 0.5rem 1.5rem 0.2rem 1.5rem;
  border-radius: 1rem 1rem 0rem 0rem;
  margin-right: 0.1rem;

  ${props =>
    props.active &&
    css`
      background-color: ${theme.colors.gray500};
      color: white;
    `
}

`;
