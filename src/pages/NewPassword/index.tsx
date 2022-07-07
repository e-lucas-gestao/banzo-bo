import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams, useSearchParams, useLocation } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Modal } from '../../components/Modal';
import { getValidationErrors } from '../../utils/getValidationError';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import useQueryParams from '../../hooks/useQueryParams';
import logoImage from '../../assets/bunzl-saude-image.png';

import { Container, Content, Background } from './styles';
import { trueApi } from '../../services/api';

interface PasswordParams {
  hash: string | undefined;
}

export const NewPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [showForm, setShowForm] = useState(false);

  const hash = useQueryParams().get('token');

  useEffect(() => {
    async function validationHash() {
      try {
        const response = await trueApi.get(`/usuario/validateResetToken?token=${hash}`);

        if (!response.data.status) {
          window.location.assign('/');
        }
      } catch (error) {
        window.location.assign('/');
      }
    }
    validationHash();
  }, []);

  // const { hash } = useParams<any>();
  // const [searchParams, setSearchParams] = useSearchParams();
  // searchParams.get('token');

  const messages = {
    sucess: {
      title: 'Senha alterada com sucesso',
      text: 'Faça o login para continuar.',
    },
    failure: {
      title: 'Erro ao enviar a senha.',
      text: 'Por favor preencha o formulário de recuperação novamente.',
    },

  };

  const handleSubmit = useCallback(async (data: any) => {
    try {
      const schema = Yup.object().shape({
        password: Yup.string()
          .min(6, 'No mínimo 6 digitos'),
        passwordConfirmation: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Senhas devem ser iguais'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      const response = await trueApi.post('/usuario/changePasswordToken/', { token: hash, senha: data.password });
      console.log(response);
      setShowForm(true);
    } catch (err) {
      console.log(err);
      const errors = getValidationErrors(err);
      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImage} alt="LOGO EMPRESA" />

        <Form
          ref={formRef}
          initialData={{ name: '' }}
          onSubmit={handleSubmit}
        >

          <div id="welcome">
            <h1>Cadastro de senha</h1>
            <h4>Por favor, informe sua nova senha.</h4>
          </div>

          <Input
            name="password"
            placeholder="Senha"
            type="password"
          />

          <Input
            name="passwordConfirmation"
            placeholder="Confirme a senha"
            type="password"
          />

          <Button type="submit" onSubmit={handleSubmit}>Recuperar senha</Button>
        </Form>
        {/*  </Form> */}

      </Content>
      <Modal showForm={showForm} setShowForm={setShowForm} message={messages.sucess} />
    </Container>
  );
};
