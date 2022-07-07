import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  display:flex;
  height: 100vh;
`;

export const Content = styled.div`

  body {
    display: block;
    width: 600px;
  }
  div {
    display: grid;
    grid-template-columns: 300px 300px;
    border: black solid 1px;
  }
  img{
    width: 250px;
  }
  @media print {    
    display: block !important;
    visibility:visible !important;
  }
`;

export const Break = styled.p`
 page-break-after: always;
`;
