import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  display: flex;
  height: 100vh;

  `;

interface ContentProps{
  value: string;
}

export const Content = styled.div`
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

export const Span = styled.span<{valor : any}>`
position: relative;

::before{

  content: "";

  background-color: ${(props => (props.valor === 0 ? 'green' : 'blue'))};
  width: 7px;
  height: 7px;
  position: absolute;
  top: 2px;
  bottom: 0;
  left: -7px
  ;

  border-radius: 800px;
}
`;
