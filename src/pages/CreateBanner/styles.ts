import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  display:flex;
  height: 100vh;
`;

export const Content = styled.div`

  div{
    width: 100%;
  }

  nav{
    height: 2.2rem;
    a{
      font-size: 1.4rem;
      font-weight: 600;
      background-color: ${theme.colors.gray400};
      padding: 0.5rem 1.5rem 0.2rem 1.5rem;
      border-radius: 1rem 1rem 0rem 0rem;
      margin-right: 0.1rem;

      &.active{
        background: ${theme.colors.gray500};
        color: white;
      }
    }

  }

  form{
    background-color: white;
    padding: 0 2rem;
    padding-bottom: 3rem;
    }
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

  #banner-info{
    margin-top: 2rem;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 1rem;

      @media (max-width: 650px){
        grid-template-columns: 1fr;

  }
  }
  #button{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    direction: rtl;
  }


`;
