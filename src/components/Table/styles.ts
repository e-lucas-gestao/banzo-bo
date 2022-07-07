import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

import { ReactComponent as ArrowDownUp } from '../../assets/arrow_down_up.svg';

export const None = styled.div`
  display: hidden;
`;

export const Container = styled.div`
  align-items: flex-start;
  justify-content: left;
@keyframes fadeIn {
   0% {opacity: 0;}
   100% {opacity: 1;}
}

  div#buttonContainer {
    display: flex;
    width: 50%;
    gap: 5%;

  }

.action {
  width: 50%;
}
  div#action {
    display: flex;
    gap: 5%;

    a {
      width: 50%;
        }
    
  }

  div#personalizeButton {
    margin-bottom: 16px;
    width: 100%;

    button{
     
      
    }
  }

  div#printButton {
    margin-bottom: 16px;
    width: 60%;
  }

#refreshButton {
color: ${theme.colors.blueMain};
background-color: transparent;
}

  table{
    background-color: white;
    width: 100%;
    border: none;
    border-spacing: 0;
    font-family: 'Noto Sans Display';

    thead{
      background-color: ${theme.colors.gray500};
      color: white;
      text-transform: uppercase;
      border: none;
    }

    th{
      font-size: 13px;
      padding: 3px 5px;
      border: none;
    }


    td{
      line-height: 2rem;
      font-size: 13px;
      text-align: center;
      line-break: normal;

      span{
      }
    }


    tr >td{
      border-bottom: 1px  solid #f5f5f5;
      white-space:  break-word;
      overflow-wrap: break-word;
      text-overflow: ellipsis;
    }

  button{
  background: ${theme.colors.blueMain};
  border-radius: 3rem;
  border: 0;
  padding: 0.4rem 0.8rem;
  color: white;
  font-weight: 500;
  margin-top: 0.5rem;
  transition: background-color 0.2s;
  width: 100%;

  &:hover {
    filter:brightness(1.08);
  }
  font-size: 12px;
  font-weight:400;

}

}
div.pagination{
  margin: 2rem 0rem;
  button{
    width: 2.5rem;
    height: 2.5rem;
    background-color: ${theme.colors.blueMain};
    border: none;
    color: ${theme.colors.background};
    margin-right: 1rem;
    border-radius: 50%;
  }
  input{
    border: 2px solid ${theme.colors.gray400};
    width: 4rem;
    height: 3rem;
    border-radius: 1rem;
    text-align: center;
  }
  select{
    border: 2px solid ${theme.colors.gray400};
    width: 15rem;
    height: 3rem;
    border-radius: 1rem;
    text-align: center;
  }
  strong{
    font-weight: bold;
  }
  }

`;

export const Logo = styled.div`
  color: ${theme.colors.greenMain};
  height: 12.4rem;

  background: ${theme.colors.greenMain} no-repeat center;
  background-size: 10rem;
`;

interface StatusContainerProps{
  color: string;
  statusForm?: boolean;
  id: string;
}

export const StatusContainer = styled.div<StatusContainerProps>`
  display: flex;
  justify-content: center;
  text-align: left;
  span{
    align-items: center;
    width: 70px;
    ${props => props.id === 'StatusSolicitacao' &&
      css`
        width: 150px;
      `
}
    display: flex;

    div{
      flex:0;
      margin-right: 2px;
        border-radius: 50%;
        width: 6px;
        height: 6px;
        padding: 4px;

      ${props => props.color &&
          css`
            background-color: ${props.color};
          `}
    }
    p {
      margin-left:4px;
      width:100%
    }
  }
  ${
  props => (props.statusForm &&
    css`
    margin-left: 10px;
    width: 100%;
    justify-content: left;
    span{
      width: 100%;
    }
    `)
}
`;

export const ArrowUpDown = styled(ArrowDownUp)`
padding-top: 0.5rem;
`;

export const MenuItem = styled.a``;
