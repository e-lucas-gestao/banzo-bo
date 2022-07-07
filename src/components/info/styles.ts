import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Content = styled.div`
  position: absolute;
  z-index:999;

  #table {
    height: 25em;
    width:  22em;
    border: 2px solid #F1F1F1;

    background-color:#ffffff;

  #header {
    display:flex;
    flex-direction:inline;
    padding:1rem;
    background-color: #F1F1F1;
  }

  #info {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    color: #5f5f5f;
    margin-right:auto;
  }
  #close-info {
    cursor: pointer;
    width:1em;
  }
  #button-info {
    border: none;
  }

    .description {

    }
    .description-header {
      display:flex;
      flex-direction:inline;
    }
    .description-header-icon{
      width:1em;
     margin: 1rem;
     margin-right:0;
    }
    .description-header-text{
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 21px;

      padding:1rem;
      justify-content:center;
      text-align:center;
      color: #5f5f5f;
    }

    .info-content-inline {
      display:flex;
      flex-direction:inline;
      padding:0.9rem;
    }
    .info-text-description {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 18px;
      color: #C7C7C7;
    }
    .info-text-content{
      margin-left:auto;

      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 18px;
      color: #5F5F5F;
    }

  }
  
`;
