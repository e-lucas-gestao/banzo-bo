import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.button`
  background: ${theme.colors.blueMain};
  height: 4.6rem;
  border-radius: 3rem;
  border: 0;
  padding: 0 1.4rem;
  color: white;
  font-weight: 500;
  margin-top: 1.6rem;
  transition: background-color 0.2s;
  width: 100%;

  &:hover {
    background: #9DF93D;
  }

  &:disabled {

    background: ${theme.colors.greenLogo};
  }
`;
