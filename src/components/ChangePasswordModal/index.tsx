import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import { getValidationErrors } from '../../utils/getValidationError';
import { Input } from '../Input';
import { Button } from '../Button';

import closeButtonImg from '../../assets/close_button.svg';
import { Container } from './styles';
import { trueApi } from '../../services/api';

interface ModalProps {
  setShowForm: (showForm: boolean) => void;
  showForm: boolean;
}

export function ChangePasswordModal({ setShowForm, showForm }: ModalProps) {
  const formRef = useRef<FormHandles>(null);
  const id = sessionStorage.getItem('id');

  const handleSubmit = useCallback(async (data, { reset }: any) => {
    try {
      const schema = Yup.object().shape({
        password: Yup.string()
          .required('Campo obrigatório'),
        newPassword: Yup.string()
          .min(6, 'No mínimo 6 digitos'),
        confirmNewPassword: Yup.string()
          .oneOf([Yup.ref('newPassword'), null], 'Senhas devem ser iguais'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      const formattedData = {
        senhaAntiga: data.password,
        senha: data.newPassword,
        id,
      };
      const newPasswordResponse = await trueApi.put('/usuario/atualizarSenha', formattedData);
      reset();
      if (newPasswordResponse.data.Status) {
        toast.success('Senha atualizada com sucesso');
      } else {
        toast.error('Erro ao atualizar a senha');
      }
    } catch (err) {
      const errors = getValidationErrors(err);
      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container showForm={showForm}>
      <div id="content">
        <button type="button" onClick={() => setShowForm(false)}><img src={closeButtonImg} alt="Fechar" /></button>
        <h3>Mudança de senha</h3>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <Input type="password" name="password" label="Digite a sua senha atual" />
          <div id="separator" />
          <Input type="password" name="newPassword" label="Digite a nova senha" />
          <Input type="password" name="confirmNewPassword" label="Repita a nova senha" />
          <Button type="submit">Mudar senha</Button>
        </Form>
      </div>
    </Container>
  );
}
