/* eslint-disable arrow-body-style */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { trueApi } from '../../services/api';

import { Content, TabLink } from './styles';
import { UserInfo } from '../../components/UserInfo';
import { UserPermissions } from '../../components/UserPermissions';
import { Title } from '../../components/Title';
import { encryptor, keySessionStorage } from '../../configuration/Constants';
import { UserEmpresa } from '../../components/userEmp';

const FormData = require('form-data');

export interface Permission {
  Tipo: any;
  Nome: string;
  Funcionalidade: any;
  Id: string;
  CdFuncionalidade: number;
  CdEmpresa: number;
  Empresa: any;

}

export function UserForm() {
  const formRef = useRef<FormHandles>(null);
  const { id } = useParams();
  const { pathname } = useLocation();
  const [activePage, setActivePage] = useState(0);

  const [userData, setUserData] = useState({} as any);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [checkbox, setCheckbox] = useState<Permission[]>([]);
  const [checkEmp, setCheckEmp] = useState<Permission[]>([]);
  const session = encryptor.decrypt(sessionStorage.getItem(keySessionStorage.KEY_PERMISSIONS));
  const permissions = session ? JSON.parse(session) : false;
  const tabs: {[key: number]: any} = {

    0: () => (
      <UserPermissions
        checkbox={checkbox}
        setCheckbox={setCheckbox}
        userId={userData.Id}
      />
    ),
    1: () => (
      <UserInfo
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        status={status}
        setStatus={setStatus}
        data={userData}
      />
    ),
    2: () => (
      <UserEmpresa
        checkEmp={checkEmp}
        setCheckEmp={setCheckEmp}
        userId={userData.Id}
      />
    ),
  };

  const isEmailValid = useCallback((newEmail: any) => {
    return newEmail === userData.email ? null : newEmail;
  }, []);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userResponse = await trueApi.post('/usuario/selecionarUm', { id });
        setUserData(userResponse.data.usuario);
        const permissionResponse = await trueApi.get(`/usuario/associados?id=${id}`);
        const listPermission: Permission[] = [
          {
            Tipo: 2,
            CdFuncionalidade: 1,
            CdEmpresa: 0,
            Funcionalidade: 'Dashboard',
            Empresa: '',
            Nome: '',
            Id: '',
          },
          {
            Tipo: 2,
            CdFuncionalidade: 2,
            CdEmpresa: 0,
            Funcionalidade: 'Atendimentos',
            Empresa: '',
            Nome: '',
            Id: '',
          },
          {
            Tipo: 2,
            CdFuncionalidade: 3,
            CdEmpresa: 0,
            Funcionalidade: 'Empresa',
            Empresa: '',
            Nome: '',
            Id: '',
          },
          {
            Tipo: 2,
            CdFuncionalidade: 4,
            CdEmpresa: 0,
            Funcionalidade: 'Gerenciamento de FAQ',
            Empresa: '',
            Nome: '',
            Id: '',
          },
          {
            Tipo: 2,
            CdFuncionalidade: 5,
            CdEmpresa: 0,
            Funcionalidade: 'Usuários',
            Empresa: '',
            Nome: '',
            Id: '',
          },
        ];
        setCheckbox(listPermission);

        const listEmpresas: Permission[] = [
          {
            Tipo: 2,
            CdEmpresa: 1,
            CdFuncionalidade: 0,
            Funcionalidade: '',
            Empresa: 'Bunzl',
            Nome: '',
            Id: '',
          },
          {
            Tipo: 2,
            CdEmpresa: 2,
            CdFuncionalidade: 0,
            Funcionalidade: '',
            Empresa: 'E-gestão',
            Nome: '',
            Id: '',
          },
          {
            Tipo: 2,
            CdEmpresa: 3,
            CdFuncionalidade: 0,
            Funcionalidade: '',
            Empresa: 'Call Nurse',
            Nome: '',
            Id: '',
          },
        ];
        setCheckEmp(listEmpresas);
      } catch {
        toast.error('Erro ao buscar dados');
      }
    }

    fetchUserData();
  }, []);

  const handleSubmit = useCallback(async (data: any) => {
    let imagePath;
    if (permissions[5].Tipo < 2) {
      toast.error('Você não tem permissões suificientes para fazer isso!');
      return;
    }

    try {
      if (data.profileImage) {
        const form = new FormData();
        form.append('img', data.profileImage);
        const imageResponse = await trueApi.post('/UploadImagem/imagemUsuario', form, { headers: form.getHeaders });
        imagePath = imageResponse.data.caminho;
      }

      const emailValidation = isEmailValid(data.email);

      if (data.Nome) {
        const formatedUserData = {
          id,
          id_alteracao: sessionStorage.getItem('id'),
          email: emailValidation,
          Nome: data.Nome,
          CaminhoImg: imagePath,
          Status: data.Status,
        };
        const userResponse = await trueApi.put('/usuario/atualizar', { ...formatedUserData });
        if (userResponse.data.Status) {
          toast.success('Usuário atualizado!');
        } else toast.error('Erro ao atualizar o usuário');
      }

      const permissionData = sessionStorage.getItem('@User:permissions');
      if (permissionData !== null) {
        sessionStorage.removeItem('@User:permissions');
        const permissionResponse = await trueApi.post(`/usuario/associar/?idUsuario=${id}`, [...JSON.parse(permissionData)]);
        if (!permissionResponse.data.Status) toast.error('Erro ao atualizar permissões');
        else toast.success('Permissões atualizadas com sucesso');
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  }, []);

  return (
    <Content>
      <Title title="Usuários" backButton />
      <nav>
        <TabLink
          onClick={() => setActivePage(0)}
          to={pathname}
          active={activePage === 0}
        >
          Permissões
        </TabLink>
        <TabLink
          to={pathname}
          onClick={() => setActivePage(1)}
          active={activePage === 1}
        >
          Informações
        </TabLink>
        <TabLink
          onClick={() => setActivePage(2)}
          to={pathname}
          active={activePage === 2}
        >
          Empresas relacionadas
        </TabLink>
      </nav>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
      >
        {tabs[activePage]()}
      </Form>
    </Content>
  );
}
