import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  display:flex;
  height: 100vh;
`;

export const Content = styled.div`

  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;


   span{
     font-size: 1.8rem;
   }

   input{
    align-self: center;
   }

  table{
    width: 75%;
    text-align: center;

    th{
      text-align: center;
      justify-content: center;
    }

    td{
     line-height: 4rem;
     border-bottom: 1px solid #eee;
     div{
      justify-content: center;
     }

    }

    tr:last-child{
      border-bottom: 0px
    }
  }

  #button{
    display: flex;
    justify-content:right;

    button{
      width: 32%;
    }
  }

`;
