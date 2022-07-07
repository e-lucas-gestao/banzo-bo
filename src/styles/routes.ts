import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;


`;

export const Content = styled.div`
  display:grid ;
  grid-template-columns: auto 1fr;
  justify-content: left;
  align-items: top;
  grid-gap: 2.4rem;
  margin-right: 2.4rem;

  width: 100%;

  #separator{
    width: 100%;
  }

`;
