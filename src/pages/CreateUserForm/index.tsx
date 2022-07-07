/* eslint-disable no-undef */
/* eslint-disable arrow-body-style */
import { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { NavLink, Route, Routes, useLocation, useMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { trueApi } from '../../services/api';

import { Content } from './styles';
import { UserInfo } from '../../components/UserInfo';
import { Title } from '../../components/Title';
import { encryptor, keySessionStorage } from '../../configuration/Constants';

const FormData = require('form-data');

export interface Permission {
  Tipo: any;
  Nome: string;
  Funcionalidade: any;
  Id: string;
  CdFuncionalidade: string;
}

export function CreateUserForm() {
  const formRef = useRef<FormHandles>(null);
  const { pathname } = useLocation();
  let permissions:any = [];
  try {
    const session = encryptor.decrypt(sessionStorage.getItem(keySessionStorage.KEY_PERMISSIONS));
    permissions = session ? JSON.parse(session) : false;
  } catch (error) {
    console.log(error);
  }

  const [userData, setUserData] = useState({} as any);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(0);

  const isEmailValid = useCallback((newEmail: any) => {
    return newEmail === userData.email ? null : newEmail;
  }, []);

  const [page, setPage] = useState(true);
  const handleSubmit = useCallback(async (data: any) => {
    if (permissions[9].Tipo < 2) {
      toast.error('Você não tem permissões suificientes para fazer isso!');
      return;
    }
    try {
      const form = new FormData();
      form.append('img', data.profileImage);
      const imageResponse = await trueApi.post('/UploadImagem/imagemUsuario', form, { headers: form.getHeaders });
      const imagePath = imageResponse.data.caminho;

      const emailValidation = isEmailValid(data.email);

      const formatedUserData = {
        nome: data.Nome,
        email: emailValidation,
        senha: data.Senha,
        id_inclusao: sessionStorage.getItem('id'),
      };
      const response = await trueApi.post('/usuario/inserir', { ...formatedUserData });
      if (!response.data.Status) throw Error;

      toast.success('Usuário criado com sucesso!');
      if (formRef.current) formRef.current.reset();
    } catch (error) {
      toast.error('Error ao criar usuário!');
    }
  }, []);

  return (
    <Content>
      <Title title="Usuários" backButton />
      <nav>
        <NavLink onClick={() => setPage(true)} to={`${pathname}`}> Informações </NavLink>
      </nav>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
      >

        <UserInfo
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          status={status}
          setStatus={setStatus}
          data={userData}
          password
        />

      </Form>
    </Content>
  );
}
