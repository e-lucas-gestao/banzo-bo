import { useState } from 'react';

import { Button } from '../Button';
import { Input } from '../Input';
import { Select } from '../Select';
import { messages } from '../../utils/statusMessage';
import { Usuario } from '../../pages/UserPanel';

import { Content } from './styles';
import { ImageInput } from '../ImageInput';

interface UserInfoProps {
  data: Usuario
  name: any;
  setName: any;
  email: any;
  setEmail: any;
  status: any;
  setStatus: any;
  password?: boolean;
}

export function UserInfo({
  data,
  name,
  setName,
  email,
  setEmail,
  status,
  setStatus,
  password,
}: UserInfoProps) {
  return (
    <>
      <h2>{data.email ? 'Editar' : 'Criar'}</h2>
      <Content password={password}>
        <div id="avatar">
          <ImageInput
            inputType="usuarios"
            path={data?.CaminhoImg}
          />
        </div>
        <div id="info-usuario">
          <Input
            name="Nome"
            label="Nome"
            defaultValue={name || data?.Nome}
            onChange={(event) => setName(event.target.value)}
          />
          <Input
            name="email"
            label="E-mail"
            type="email"
            defaultValue={email || data?.email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {/* <Select
            name="Status"
            options={messages.statusUsuario}
            label="Status"
            value={status || data?.Status}
            onChange={(event => setStatus(event.target.value))}
          /> */}
          {
            password && (
            <Input
              name="Senha"
              label="Senha"
              type="password"
            />
            )
}
        </div>
        <div id="button">
          <Button type="submit">Salvar</Button>
        </div>
      </Content>
    </>
  );
}
