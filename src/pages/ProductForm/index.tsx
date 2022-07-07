import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { trueApi } from '../../services/api';
import { messages } from '../../utils/statusMessage';

import { Select } from '../../components/Select';
import { Input } from '../../components/Input';
import { Content } from './styles';
import { Button } from '../../components/Button';
import { ImageInput } from '../../components/ImageInput';
import { Checkbox } from '../../components/Checkbox';
import { Data } from '../Products';
import { Title } from '../../components/Title';
import { capitalizeString } from '../../utils/stringFormat';
import { encryptor, keySessionStorage } from '../../configuration/Constants';

const FormData = require('form-data');

interface NewSize{
  tamanho: string;
  codigo: string;
}

export function ProductForm() {
  const params = useParams();
  const Id = useMemo(() => params.id, []);
  const formRef = useRef<FormHandles>(null);

  let permissions:any = [];
  try {
    const session = encryptor.decrypt(sessionStorage.getItem(keySessionStorage.KEY_PERMISSIONS));
    permissions = session ? JSON.parse(session) : false;
  } catch (error) {
    console.log(error);
  }

  const [product, setProduct] = useState({} as Data);
  const [newSize, setNewSize] = useState([] as NewSize[]);

  useEffect(() => {
    trueApi.get(`/produto/selecionarUm?id=${Id}`).then(response => setProduct(response.data.produto));
  }, []);

  const handleSubmit = useCallback(async (data:any) => {
    if (permissions[9].Tipo < 2) {
      toast.error('Você não tem permissões suificientes para fazer isso!');
      return;
    }
    try {
      const form = new FormData();
      form.append('', data.profileImage);
      const imageUploadResponse = await trueApi.post(`/UploadImagem/imagemProduto/?idUsuario=${sessionStorage.getItem('id')}&idProduto=${Id}`, form, { headers: form.getHeaders });
      const path = await imageUploadResponse.data.Status;
    } catch (error) {
      console.log(error);
    }
  }, []);

  function handleAddNewSize() {
    const emptySize = {
      tamanho: '',
      codigo: '',
    };
    setNewSize([...newSize, emptySize]);
  }

  function handleStoreValue(value:string, fieldName: 'tamanho' | 'codigo', id: number) {
    const updatedNewSize = [...newSize];
    let currentOption = updatedNewSize[id];
    currentOption[fieldName] = value;
    setNewSize(updatedNewSize);
  }

  return (
    <>
      <Content>
        <Title title="Produtos" backButton />
        <h2>Visualizar</h2>
        <div>
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
          >

            <div id="image">
              <ImageInput inputType="produtos" path={product?.CaminhoImagem} />
            </div>
            <div id="info-produto-header">
              <Input
                name="Nome do produto"
                label="Nome"
                defaultValue={product?.Descricao ? capitalizeString(product?.Descricao) : ''}
                disabled
              />
            </div>
            <div id="info-produto">

              <Input
                name="categoria"
                label="Categoria"
                defaultValue={product?.Categoria}
                disabled
              />
              <Input
                name="subcategoria"
                label="Subcategoria"
                defaultValue={product?.Subcategoria}
                disabled
              />
              <Input
                name="familia"
                label="Família"
                defaultValue={product?.Familia}
                disabled
              />
              <Input
                name="nomeFornecedor"
                label="Nome fornecedor"
                disabled
              />
              <Select
                name="Ativo"
                label="Status"
                options={messages.Ativo}
                selected={product?.Ativo}
                disabled
              />
              {/* <Select
                name="Devolucao"
                label="Produto com devolução?"
                options={messages.devolucaoProduto}
                selected={messages.devolucaoProduto[1].value}
                disabled
              /> */}
              <Input
                name="Codigo"
                placeholder="Cód Produto"
                readOnly
                label="Cód Produto"
                defaultValue={product?.NrCdProduto}
                disabled
              />
            </div>

            {/* <h3 className="gray">Tamanho</h3>
            <p>Tamanho:</p>
            <div id="size">
              <Checkbox name="Tem" />
              <Input name="Tamanho" placeholder="50" className="small" />
              <Input name="Unidades" placeholder="Unidades" />
              <Input name="Codigo" placeholder="Codigo" />
            </div>
            <div id="uniqueSize">
              <Checkbox label="Tamanho Unico" name="TamanhoUnico" />
            </div>
            {
              newSize && newSize.map((item, index) => (
                <div id="newSizeWrapper">
                  <p>Adicionar tamanhos disponíveis:</p>
                  <div id="newSize" key="index">
                    <Input
                      name={`NewCode${index}`}
                      id="tamanho"
                      placeholder="Tamanho"
                      onChange={(event) => {
                        handleStoreValue(event.target.value, 'tamanho', index);
                      }}
                    />
                    <Input
                      name={`NewCode${index}`}
                      id="codigo"
                      placeholder="Código"
                      onChange={(event) => {
                        handleStoreValue(event.target.value, 'codigo', index);
                      }}
                    />
                  </div>
                </div>
              ))

            }
            <div id="addButtonWrapper">
              <Button onClick={() => handleAddNewSize()}><span>+</span>Adicionar tamanho</Button>
              <span />
            </div> */}

            <div id="submitButtonWrapper">
              <Button type="submit" onClick={() => toast.success('Produto atualizado com sucesso!')}>Atualizar</Button>
            </div>
          </Form>
        </div>
      </Content>
    </>
  );
}
