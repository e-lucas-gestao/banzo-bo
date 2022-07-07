import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  display: flex;
  height: 100vh;

`;

export const Content = styled.div`
  display: grid;
  justify-content: left;
  grid-gap: 2.4rem;
  align-items: top;
  width: 100%;


  div{
    width: 100%;

    h1{
      color: ${theme.colors.blueMain};
      font-weight: bold;
      font-size: 32px;
      margin-bottom: 16px;
    }
  }
`;
