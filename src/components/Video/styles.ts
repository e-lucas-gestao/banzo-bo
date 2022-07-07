import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface ActionButtonProps {
  backGroundColor: string;
}

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  background: #d9d9d9;
  border-right: 4px solid #ffffff;
  align-items: center;

  display: flex;
  justify-content: center;
  overflow: hidden;

  #camera-container{
    display:flex;
    flex: 1;
    flex-direction: row;

    justify-content: space-evenly;
    margin: 16px 0;

    div#callBox {
      display: flex;
      justify-content: center;
    }

    div#callMe {
      display: flex;
      justify-content: center;

    }
  }

  #buttons{
     display: flex;
     flex-direction: row;
     width: 100%;
     align-items: center;
     justify-content: center;
     gap: 30px;
     margin: 10px 0px;



}

  section {
    position: relative;
    #callBox {
      overflow: hidden;

      width: 225px;

      border: 3px solid white;
      border-radius: 10px;

      aspect-ratio: 3/4;
        video {
          -webkit-transform:rotateY(180deg); /* Safari and Chrome */
          -moz-transform:rotateY(180deg); /* Firefox */

          overflow: hidden;
          aspect-ratio: 3/4;
          width: auto;
          height: auto;


          display: block;
          overflow: hidden;
          object-fit: cover;
        }
    }

    #statusIndicator {
      position: absolute;
      top: 10px;
      left: 10px;

      display: flex;
      gap: 6px;

      button{
        display: flex;
        align-items: center;
        justify-content: center;

        padding: 6px;

        border: none;
        border-radius: 50%;

        background-color: #33333399
      }
    }
  }


`;

export const ActionButton = styled.button<ActionButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 50px;
  width: 50px;

  border: none;
  border-radius: 50%;

  background: ${({ backGroundColor }) => backGroundColor};
`;
