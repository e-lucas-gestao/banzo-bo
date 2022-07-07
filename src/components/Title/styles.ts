import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  @media print{
    display:none;
  }


    h1{
      color: ${theme.colors.blueMain};
      font-weight: bold;
      font-size: 32px;
      margin-bottom: 16px;
    }

    button{
      color: ${theme.colors.blueMain};
      font-weight: bold;
      font-size: 32px;
      margin-bottom: 16px;



      border: 0;
      background: none;
      img{
        height: 32px;
        width: 32px;
      }
    }
`;
