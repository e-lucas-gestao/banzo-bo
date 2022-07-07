/* eslint-disable no-undef */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { encryptor, keySessionStorage } from '../../configuration/Constants';
import { Container, Content, Logo, ButtonContainer, HiddenContainer } from './styles';

export const Sidebar: React.FC = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [permissions, setPermissions] = useState([] as any);

  try {
    useEffect(() => {
      async function showServices() {
        const result = await JSON.parse(encryptor.decrypt(sessionStorage.getItem(keySessionStorage.KEY_PERMISSIONS)) || '');
        setPermissions(result);
      }
      showServices();
    }, []);
  } catch (error) {
    console.log(error);
  }

  const categories = [
    <NavLink key="dashboard" to="/">Dashboard</NavLink>,
    <NavLink key="requests" to="/requests">Atendimentos</NavLink>,
    <NavLink key="clientes" to="/clients">Empresa</NavLink>,
    <NavLink key="banners" to="/banners">Gerenciamento de FAQ</NavLink>,
    <NavLink key="users" to="/users">Usuários</NavLink>,
    // <NavLink key="employees" to="/employees">Colaboradores</NavLink>,
    // <NavLink key="products" to="/products">Produtos</NavLink>,
    // <NavLink key="notificacoes" to="/notifications">Notificações push</NavLink>,

  ];

  return (
    showMenu ? (
      <Container>
        <Content>
          <Logo />
          {
        categories.map((item, index) => {
          if (permissions[index]?.Tipo > 0) return item;
          return null;
        })
      }
        </Content>
        <ButtonContainer>
          <button type="button" onClick={() => { setShowMenu(false); }}>{'<<'}</button>
        </ButtonContainer>
      </Container>
    )
      : (
        <HiddenContainer>
          <ButtonContainer>
            <div>
              <button type="button" onClick={() => setShowMenu(true)}>{'>>'}</button>
            </div>
          </ButtonContainer>
        </HiddenContainer>
      )
  );
};
