import { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

import 'react-toastify/dist/ReactToastify.min.css';
import { getValidationErrors } from '../../utils/getValidationError';
import { useAuth } from '../../hooks/useAuth';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import logoImage from '../../assets/bunzl-saude-image.png';
import { Container, Content, Background } from './styles';

export const Login = () => {
  const formRef = useRef<FormHandles>(null);
  const { createToken } = useAuth();

  const handleSubmit = useCallback(async (data: any) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Insira um e-mail válido'),
        password: Yup.string()
          // .required('Senha obrigatória') haha!
          .min(6, 'No mínimo 6 dígitos'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      const isAuth = await createToken(data.email, data.password);

      if (!isAuth) {
        toast.error('E-mail e/ou senha inválidos!');
      } else {
        window.location.assign('/');
      }
    } catch (err) {
      const errors = getValidationErrors(err);
      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>BUNZL | Login</title>
      </Helmet>
      <Container>
        <Background />
        <Content>
          <img src={logoImage} alt="BUNZL" />

          <Form
            ref={formRef}
            initialData={{ name: 'Maicon' }}
            onSubmit={handleSubmit}
          >
            <div id="welcome">
              <h1>Bem-Vindo!</h1>
              <h4>Preencha os dados de login para continuar</h4>
            </div>

            <Input name="email" placeholder="E-mail" />

            <Input type="password" name="password" placeholder="Senha" />

            <Button type="submit">Entrar</Button>

            <Link to="/forgot-password">Esqueci a senha</Link>
          </Form>
        </Content>
      </Container>
    </>
  );
};
