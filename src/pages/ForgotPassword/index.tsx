import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Modal } from '../../components/Modal';
import { getValidationErrors } from '../../utils/getValidationError';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import logoImage from '../../assets/bunzl-saude-image.png';

import { Container, Content, Background } from './styles';
import { trueApi } from '../../services/api';

import { keySessionStorage } from '../../configuration/Constants';

const message = {
  title: 'Recuperação da senha feita com sucesso!',
  text: 'Abra o se e-mail para seguir as instruções de recuperação de senha.',
};

export const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = useCallback(async (data: any) => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Insira um e-mail válido'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      const response = await trueApi.post('/usuario/resetPassword', { email: data.email, dtRequisicao: new Date() });
      // console.log(response.data);
      sessionStorage.removeItem(keySessionStorage.KEY_TOKEN);
      setShowForm(true);
    } catch (err) {
      toast.error(`${err}`);
      const errors = getValidationErrors(err);
      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <>
      <Container>
        <Background />
        <Content>
          <img src={logoImage} alt="Bunzl" />

          <Form
            ref={formRef}
            initialData={{ name: 'Maicon' }}
            onSubmit={handleSubmit}
          >

            <div id="welcome">
              <h1>Recuperação de senha</h1>
              <h4>Por favor, informe seu e-mail para a recuperação da senha.</h4>
            </div>

            <Input
              name="email"
              placeholder="E-mail"
            />

            <Button type="submit" onSubmit={handleSubmit}>Recuperar senha</Button>
          </Form>
          {/*  </Form> */}

        </Content>
      </Container>
      <Modal showForm={showForm} setShowForm={setShowForm} message={message} />
    </>
  );
};
