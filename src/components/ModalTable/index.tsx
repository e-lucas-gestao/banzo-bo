import React, { useState } from 'react';
import { Button } from '../Button';
import { Container, Content, SpanModal, Div } from './styles';
import { Sortable } from '../Sortable/index.js';

interface ModalProps {
    setShowDrag: (showDrag: boolean) => void;
    showDrag: boolean;
    modifyColumns: (arrayColumns?:any[])=>void;
    listColumns: any[];

  }

export function ModalTable({ setShowDrag, showDrag, modifyColumns, listColumns }: ModalProps) {
  const [columns, setColumns] = useState({ lista: [...listColumns] });

  const redefinir = () => {
    setShowDrag(false);
    modifyColumns(columns.lista.map(d => d.id));
  };

  const redefinirColuns = (listNew:any) => {
    setColumns({ lista: listNew });
  };

  return (
    <Container showDrag={showDrag}>
      <div id="content">
        <Div>
          <div id="header">
            <h4>Reordenar colunas:</h4>
            <SpanModal>(selecione as colunas e defina a ordem desejada)</SpanModal>
          </div>
          <Sortable listColumns={listColumns} setColumns={redefinirColuns} />
          <Button onClick={redefinir}>Reordenar</Button>
        </Div>
      </div>
    </Container>
  );
}
