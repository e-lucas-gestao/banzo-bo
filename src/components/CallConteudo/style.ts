import styled from 'styled-components';

export const Content = styled.div`
    background: #f1f1f1;
    display: flex;
    flex-direction: column;

    
  div#botao {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    padding: 1rem;
    Button {
                width: 40%;
                height: 100%;   
               margin: 0;
            }
  }
  div#table {
    display: flex;
    flex-direction: row;
    align-items: center; 
    

    #icons {
      width: min-content;
      display: flex;
      gap: 10%;
    
      

    }

    }
    


  #text {
    font-weight: 700;
    font-size: 14px;
    line-height: 21px;

    color: #5f5f5f;
  }

    div#conteudo {
        background: #ffffff;
        display: flex;
        align-items: end;
        
       
}  

  div#date {
      display: flex;
      justify-content: center;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 21px;

      color: #818181;

      gap: 10%
    }

  #date {
    height: 16px;
  }
`;
