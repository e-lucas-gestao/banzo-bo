import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  display:flex;
  height: 100vh;
`;

interface ContentProps{
  password?: boolean;
}

export const Content = styled.div<ContentProps>`


  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;

  #avatar{
    flex-direction: column;
    display: flex;
    align-items: center;
    position: relative;


    &:hover span{
      display: block;
    }

    img{
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin-top: 2rem;
    }

    input{
      position: absolute;
      bottom: 0;
      width: 120px;
      height: 120px;
      opacity: 0;
      cursor: pointer;

    }

    span{
      align-items: flex-end;
      position: absolute;
      line-height: 13rem;
      content: "Mudar imagem";
      width: 120px;
    height: 120px;
    color: black;
    background-color: ${theme.colors.gray400};
    border-radius: 50%;
    opacity: 60%;
    bottom: 0rem;
    display: none;
  }

}

#info-usuario{
  margin-top: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1rem;

    ${
  props => props.password && css`
        grid-template-columns: 1fr 1fr 1fr 1fr;
      `
}

    @media (max-width: 650px){
      grid-template-columns: 1fr;
    }
  }


  #checkbox{
   display:flex;
   align-items: center;

   span{
     font-size: 1.8rem;
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
