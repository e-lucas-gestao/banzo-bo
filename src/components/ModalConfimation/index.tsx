import React from 'react';
import { Button } from '../Button';
import { Container } from './styles';

interface ModalProps {
    setShowform: (showForm: boolean) => void,
    atualizarStatus?: (status:Number) => void,
    showform: boolean,
    mensagem: String,

}
function confirmarAtualizacao(setShowform:any, atualizarStatus:any) {
  atualizarStatus();
  setShowform(false);
}
function cancelar(setShowform:any) {
  setShowform(false);
}

export const ModalConfirmation = ({
  setShowform,
  showform,
  mensagem,
  atualizarStatus,
}:ModalProps) => (
  <Container id="modal" showForm={showform}>

    <div id="modalConfirmation">
      <div>
        <h3>{mensagem}</h3>
      </div>
      <div>
        <Button type="button" onClick={() => confirmarAtualizacao(setShowform, atualizarStatus)}>confirmar</Button>
      </div>
      <div>

        <Button type="button" onClick={() => cancelar(setShowform)}>cancelar</Button>
      </div>
    </div>

  </Container>
);
