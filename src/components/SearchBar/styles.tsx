import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

interface ContainerProps {
  pushNotification?: boolean;
}

export const Container = styled.div<ContainerProps>`
  flex-direction: columns;
  width: fill;

  #input{
    background-color: white;
    padding: 20px 6px;
  }

  #title{
    background-color: ${theme.colors.gray500};
    padding: 12px;

    h3{
      color: white;
      font-size: 1.2rem;
      text-transform: uppercase;
      font-weight: bold;
    }
  }

  form{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 1rem;

    ${
  props => props.pushNotification && css`
        grid-template-columns: 1fr 1fr 1fr;
        margin-left: -2rem;
      `

}

    @media (max-width: 650px){
      grid-template-columns: 1fr;
    }
  }


#search{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  button{
    width: 30%;
  }
}
`;
