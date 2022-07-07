import styled from 'styled-components';

interface IMessageProps {
    owner: boolean
}

export const MessageContainer = styled.div<IMessageProps>`

background: #ffffff;
    display: flex;
    padding: 1%;
    flex-direction: column;
    width: 100%;

    div#title {
        display: flex;
        flex-direction: row;
    }

    #box {
        display: flex;
        flex-direction: column;
    }

        div#date {
            display: flex;
            justify-content: flex-end;
            font-family: Poppins;
            font-size: 15px;
            font-style: italic;
            font-weight: 400;
            line-height: 18px;
            letter-spacing: 0em;
            text-align: left;

        }

       h3 {
        display: flex;
        width: 100%;
        font-weight: 700;
        font-size: 18px;
        line-height: 21px;

        color: #5f5f5f;
       }
    

    div#message {
        display: flex;
        padding: 0 19px;

        p {
  
         font-family: 'Poppins';
         font-style: normal;
         font-weight: 400;
         font-size: 15px;
         line-height: 16px;
         padding: 10 0px;
         display: flex;
        }
    }

    #user  {
        display: flex;
        width: 40px;
        height:40px;

        
    }

`;

export const Content = styled.div`
`;
