import { Link } from 'react-router-dom';
import forgotPasswordImg from '../../assets/forgot_password.svg';
import closeButtonImg from '../../assets/close_button.svg';

import { Container } from './styles';

interface ModalProps {
  setShowForm: (showForm: boolean) => void;
  showForm: boolean;
  message: {
    title: string
    text: string
  }
}

export function Modal({ setShowForm, showForm, message }: ModalProps) {
  return (
    <Container showForm={showForm}>
      <div>
        <Link to="/login" onClick={() => setShowForm(false)}><img src={closeButtonImg} alt="Fechar" /></Link>
        <img src={forgotPasswordImg} alt="Esqueci a senha" />
        <h3>{message?.title}</h3>
        <p>{message?.text}</p>
      </div>
    </Container>
  );
}
