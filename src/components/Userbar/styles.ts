import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  @media print{
    display:none;
  }

  display:flex;
  margin: 1.6rem 0;
  position: aboslute;

  #content{
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  height: 6.8rem;
  background-color: white;
  border-radius: 1.6rem;
  width: 100%;
  }


#user-info{
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;


  width: auto;

  p{

    font-size: 14px;
    margin-right: 8px;
  }

  img{
    border-radius: 50%;
    height: 40px;
    width: 40px;
    object-fit: contain;
  }
}

nav#menu{
  background-color: #fff;
  width: 15rem;
  position: absolute;
  left: auto;
  top: 5rem;

  text-align: center;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px;

  display: none;

  transition: linear 200ms;

  align-items: center;

  button{
    width: 100%;
    background: none;
    border: none;
    padding: 1rem 1rem;

    &:hover{
      background-color: ${theme.colors.gray400}
    }
  }

}

#user-info:hover + nav#menu,
nav#menu:hover {
  display: flex;
  flex-direction: column;
}



`;
