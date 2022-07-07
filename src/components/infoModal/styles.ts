import styled, { css } from 'styled-components';

export const Container = styled.div`
display: flex;
background-color: #FFFFFF;
border-radius: 2ch;
flex-direction: column;
width: 50em;
padding: 30px;
align-items: center;

.subTitle{
    font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 21px;

        color: #C7C7C7;
}

#title {
    color: #21457F;
    text-align: center;
    display: flex; 
    flex-direction: row;

        #backButton {
            justify-content: center;
            display: flex;
            background-color: transparent;
            border: 0;
            position: fixed;
            left: 20%;
            height: 22px;
            width: 35px;
    
    
          img {
           display: flex;
           width: 40%;
          }
        }
        
    

    h1 {
    font-family: Poppins;
    font-size: 22px;
    font-weight: 700;
    line-height: 33px;
    
    color: 21457F;
    }
}

#solicitante {
    color: #5F5F5F;
    display: flex;
    flex-direction: row;
    gap: 0.5%;
    justify-content: center;
    width: 100%;
    padding: 1%;

    h2 {
        font-family: Poppins;
        font-size: 18px;
        font-weight: 700;
        line-height: 24px;
        text-align: left;
    }
}

#dadosSolicitante {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1%;

    #cnpj2 {
        font-family: Poppins;
        font-size: 16px;
        font-weight: 500;
        line-height: 21px;
        letter-spacing: 0em;
        text-align: left;

        color: #5F5F5F;

    }

    #razao2 {
        font-family: Poppins;
        font-size: 16px;
        font-weight: 500;
        line-height: 21px;
        letter-spacing: 0em;
        text-align: left;

        color: #5F5F5F;
    }
 

    #solicitante2 {
        font-family: Poppins;
        font-size: 16px;
        font-weight: 500;
        line-height: 21px;
        letter-spacing: 0em;
        text-align: left;

        color: #5F5F5F;
    }   

}

#titleEmpresa {
    color: #5F5F5F;
    display: flex;
    flex-direction: row;
    gap: 0.5%;
    justify-content: center;
    width: 100%;
    padding: 1%;

    h1 {
        font-family: Poppins;
        font-size: 18px;
        font-weight: 700;
        line-height: 24px;
        letter-spacing: 0em;

    }
}

#empresa {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.5%;


    #razao1 {
        font-family: Poppins;
        font-size: 16px;
        font-weight: 500;
        line-height: 21px;
        letter-spacing: 0em;
        text-align: left;

        color: #5F5F5F;
    }
}

#DadosAtendimento {
    width: 100%;
    color: #5F5F5F;
    display: flex;
    flex-direction: row;
    gap: 0.5%;
    justify-content: center;
    padding: 1%;

    h1 {
        font-family: Poppins;
        font-size: 18px;
        font-weight: 700;
        line-height: 24px;
        letter-spacing: 0em;

    }
}

#dados {
    display: flex;
    flex-direction: column;
    align-items: center;

    #nivel1 {
        font-family: Poppins;
        font-size: 16px;
        font-weight: 500;
        line-height: 21px;
        letter-spacing: 0em;
        text-align: left;

        color: #5F5F5F;
    } 

    #data1 {
        font-family: Poppins;
        font-size: 16px;
        font-weight: 500;
        line-height: 21px;
        letter-spacing: 0em;
        text-align: left;

        color: #5F5F5F;
    }
}

#button {
  width: 30%;
  padding: 1rem;
}

`;
