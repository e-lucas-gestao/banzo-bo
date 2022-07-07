import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  display:flex;
  
  flex-direction: column;
  justify-content: center;
  width:100%;

`;

export const DataBox = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0px 0px 24px 0px;
  width: 100%;


  div {
    width: 100%;
    background-color: white;
    padding: 30px;
    margin-right: 10px;
    &:last-child{
      margin-right: 0;
    }
    .category{
      font-size: 14px;
      color: ${theme.colors.gray500}
    }
    .data{
      font-size:32px;
    }
  }
`;
