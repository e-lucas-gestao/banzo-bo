import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const ContainerWrapper = styled.div`
  label{
    margin-left: 2rem;
  }
`;

export const Container = styled.div`
    display:flex;
    flex-direction: column;

  select{
    
    flex: 1;
    border-radius: 4rem;
    background-color: ${theme.colors.background};
    padding: 1.2rem;
    margin-top: 0.8rem;

    border: 0.2rem solid #e3e3e3;

    option:before {
        content: " ";
        height: 5px;
        width: 5px;
        border-radius: 5px;
        display: inline-block;
    }

    .verde:before{
      background-color: blue;
    }
  }
`;
