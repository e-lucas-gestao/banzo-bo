import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  display: flex;
  height: 100vh;

  `;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  justify-content: left;
  align-items: top;
  grid-gap: 2.4rem;
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

interface AnimationWrapperProps {
  loading: boolean;
}

export const AnimationWrapper = styled.div<AnimationWrapperProps>`

${props => props.loading && css`
  width: 100%;
  height: 15px;
  display: block;
  background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 80%
    ),
    lightgray;
  background-repeat: repeat-y;
  background-size: 50px 200px;
  background-position: 0 0;`
}
`;
