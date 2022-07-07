/* eslint-disable max-len */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { toast } from 'react-toastify';

import { capitalizeString } from '../../utils/stringFormat';
import { dateHourToStringFormatted } from '../../utils/dateConversion';
import { trueApi } from '../../services/api';

import { Button } from '../Button';
import { ImagemProduto } from '../ImagemProduto';
import { Input } from '../Input';
import { ModalConfirmation } from '../ModalConfimation';

import ChevronDown from '../../assets/chevron-down-solid.svg';
import ChevronRight from '../../assets/chevron-right-solid.svg';

import { Content } from './styles';

type statusProps = {
  [key: number]: any;
}

export function ProductInformation({ product, statusPedido, updateSolicitacao }: any) {
  const [showErrors, setShowErrors] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [status, setStatus] = useState<Number>();
  const [messageErrors, setMessageErrors] = useState<any>();
  const [loading, setLoading] = useState(false);
  const statusToHide = [
    0, 1, 7, 8,
  ];

  function productStatus(prontoRetirada : any, retirado : any, recebido :any): any {
    const valores: statusProps = {
      0: {
        0: [false],
      },
      1: {
        0: ['Liberado para retirada'],
        1: {
          0: 'Em transito',
          1: 'Recebido',
        },
      },
    };

    const valorPedido:statusProps = {
      1: 'Pendente',
      2: 'Em separação',

    };

    return valores[prontoRetirada][retirado][recebido] || (valorPedido[statusPedido] || 'Em separação');
  }

  async function atualizarStatus() {
    try {
      setLoading(true);
      const response = await trueApi.put(`/solicitacao/ProntoRetirada/?idItem=${product?.IdInterno}&usuario=${sessionStorage.getItem('id')}`);

      if (!response.data.Status) throw Error;
      setStatus(Number(status) + 1);

      toast.success('Status atualizado com sucesso!');
      updateSolicitacao();
    } catch {
      updateSolicitacao();
      toast.error('Erro ao atualizar status do produto!');
    } finally {
      setLoading(false);
    }
  }

  function botaoAtualizarStatus() {
    return <Button loading={loading} onClick={() => { setShowModal(true); }}>Produto pronto pra retirada</Button>;
  }

  return (
    <Content>

      <h3 className="gray">Item n.º {product?.IdInterno}</h3>
      <div className="img-produto">
        <ImagemProduto inputType="produtos" path={product?.ImgProduto} />
      </div>
      <div id="info-produto-produtoHeader">
        <Input
          name="nomeProduto"
          label="Nome Produto"
          placeholder="Nome do produto"
          value={product.NomeProduto && capitalizeString(product.NomeProduto)}
        />
      </div>
      <div id="info-produto">

        <Input
          name="Código do Produto"
          label="Código do Produto"
          placeholder="codigoProduto"
          value={product.CdProduto}
        />
        <Input
          name="quantidade"
          label="Quantidade"
          placeholder="quantidade"
          value={product.Quantidade}
        />

        {/*
                product.tamanho ? (
                  <Input
                    name="dataSolicitacao"
                    placeholder="Data de solicitação"
                    value={dateToString(new Date(product.data))}
                  />
                )
                  : (
                    <div id="checkbox">
                      <input type="checkbox" />
                      <span>Tamanho único</span>
                    </div>
                  )
              */}
        {/* <Select
          name="status_produto"
          options={status}
          selected={product.Recebido}
          label="Status Produto"
        /> */}
        {/* {product.status === 'amarelo' && (
        <>
          <Input
            name="dataEntrega"
            type="date"
            placeholder="Data de Entrega"
            value={dateToString(new Date(product.data))}
          />

          <Select options={atendivel} name="atendivel" />
        </>
        )}

        {product.status === 'vermelho' && (
          <>
            <Input
              name="motivo"
              placeholder="Avarias"
              value={product.data}
            />
            <Button>Sinalizar estoque baixo</Button>
          </>
        )}
      </div>
      {product.status === 'vermelho' && (
        <div id="box-avarias">
          <p>Fotos das avarias</p>
          <div id="images-avarias">
            {}
          </div>
        </div>

        )} */
      }
        <Input
          name="Status Produto"
          placeholder="Status Produto"
          label="Status do Produto"
          value={productStatus(product?.ProntoRetirada, product?.Retirado, product?.Recebido)}
        />
        <div>
          { !statusToHide.includes(statusPedido) && product?.ProntoRetirada === 0 && botaoAtualizarStatus() }
        </div>
      </div>
      <div id="info-dates">
        {product?.DtLiberacaoRetirada ? (
          <Input
            name="Liberação Retirada"
            placeholder="Liberação Retirada"
            label="Liberação Retirada"
            value={new Date(product?.DtLiberacaoRetirada).toLocaleString('pt-BR')}
          />
        )
          :
          <div />}
        {product?.DtLiberacaoRetirada ? (
          <Input
            name="Retirada"
            placeholder="Retirada"
            label="Retirada"
            value={new Date(product?.DtRetirada).toLocaleString('pt-BR')}
          />
        )
          :
          <div />}
        <div />
        <div />
      </div>
      <div id="img-produto-recebido">
        {product?.Recebido === 1 && (
          <div>
            <label id="imageLabel" htmlFor="ImageSquare"> Imagem de Recebimento</label>
            <ImagemProduto inputType="Itens" path={product?.ImgItem} />
          </div>
        ) }
        <div className="statusRecebido" />
      </div>
      { product?.ErrosMovItem?.length > 0 && (
      <div id="errorBox">
        <button
          onClick={() => setShowErrors(!showErrors)}
          type="button"
        >
          <img src={showErrors ? ChevronDown : ChevronRight} alt="Retornar para a página anterior" />

          <h3>
            Mensagens de erro
          </h3>

        </button>
        {
                  showErrors && product?.ErrosMovItem.map((item: any) => (
                    <div className="message-box" id="message-box-itemm">
                      <h3 className="gray">Erro  n.º {item.IdInterno}</h3>
                      <p>Motivo do erro na baixa de itens:</p>
                      <textarea id="messageItem" spellCheck="false" value={item.DescricaoErro || 'Indisponível'} />
                      <Input
                        label="Data de ocorrência"
                        name="dataOcorrencia"
                        placeholder="Data de ocorrência"
                        value={(
                        new Date(item.DtOcorrencia).toLocaleString()
                      )}
                      />
                    </div>

                  ))
                }
      </div>
      )}

      <ModalConfirmation
        atualizarStatus={atualizarStatus}
        setShowform={setShowModal}
        showform={showModal}
        mensagem="Confirmar mudança de status do produto?"
      />

    </Content>
  );
}
