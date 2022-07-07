import React, { ReactNode, useState } from 'react';
import ChevronDown from '../../assets/chevron-down-solid.svg';
import ChevronRight from '../../assets/chevron-right-solid.svg';
import { Container } from './styles';

interface expandableProps{
children: ReactNode,
Title: string,
}

export default function Expandable({ children, Title }: expandableProps) {
  const [showDiv, setShowdiv] = useState(false);

  return (
    <Container id="errorBox">
      <button
        onClick={() => setShowdiv(!showDiv)}
        type="button"
      >
        <img
          src={showDiv ? ChevronDown : ChevronRight}
          alt="Retornar para a página anterior"
        />

        <h3>{Title}</h3>
      </button>
      {showDiv && children}
    </Container>
  );
}
