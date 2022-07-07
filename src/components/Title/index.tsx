import { useNavigate } from 'react-router-dom';

import { Container } from './styles';
import BackArrowIcon from '../../assets/arrow.svg';
import AddButton from '../../assets/add_button.svg';

interface TitleProps{
  title: string;
  backButton?: any;
  addButton?: string;
}

export function Title({ title, backButton, addButton }: TitleProps) {
  const navigate = useNavigate();

  function handleSpan() {
    navigate(-1);
  }

  function handleCreate() {
    navigate(`/${addButton}`);
  }

  return (
    <Container>
      <h1>{title}</h1>
      {backButton && (
        <button type="button" onClick={() => handleSpan()}><img src={BackArrowIcon} alt="Retornar para a página anterior" /></button>
      )}
      {addButton && (
        <button type="button" onClick={() => handleCreate()}><img src={AddButton} alt="Adicionar novo" /></button>
      )}
    </Container>
  );
}
