import { messages } from './statusMessage';

export const employeesField = [
  {
    placeholder: 'Nome',
    name: 'name',
  },
  {
    placeholder: 'CPF',
    name: 'cpf',
  },
  {
    placeholder: 'E-mail',
    name: 'email',
  },
  {
    placeholder: 'Cliente',
    name: 'cliente',
  },
  {
    placeholder: 'RE',
    name: 're',
  },
  {
    placeholder: 'Posto',
    name: 'posto',
  },
  {
    placeholder: 'Área Operacional',
    name: 'area_operacional',
  },
];

export const requestFields = [
  {
    placeholder: 'Data Inicial',
    name: 'data_inicial',
  },
  {
    placeholder: 'Data final',
    name: 'data_final',
  },
  {
    placeholder: 'Status',
    name: 'status',
    select: messages.statusProduto,
  },
  {
    placeholder: 'cliente',
    name: 'cliente',
    // select: 'teste',
  },
  {
    placeholder: 'RE',
    name: 're',
  },
  {
    placeholder: 'Categoria',
    name: 'categoria',
  },
  {
    placeholder: 'Subcategoria',
    name: 'subcategoria',
  },
  {
    placeholder: 'Área operacional',
    name: 'area_operacional',
  },
];

export const userPanelFields = [
  {
    placeholder: 'Mensagem',
    name: 'messege',
  },
  {
    placeholder: 'Data e hora',
    name: 'Data',
  },
  {
    placeholder: 'Status',
    name: 'status',
    select: [
      {
        message: 'Ativo',
      },
      {
        message: 'Inativo',
      },
    ],
  },
];

export const notificationsPushFields = [
  {
    placeholder: 'Nome',
    name: 'nome',
  },
  {
    placeholder: 'E-mail',
    name: 'email',
  },
  {
    placeholder: 'Status',
    name: 'status',
    select: [
      {
        message: 'Ativo',
      },
      {
        message: 'Inativo',
      },
    ],
  },
];

export const productsFields = [
  {
    placeholder: 'Nome do produto',
    name: 'Nome',
  },
  {
    placeholder: 'Categoria',
    name: 'Categoria',
    inputDown: 'categorias',
  },
  {
    placeholder: 'Subcategoria',
    name: 'Subcategoria',
    inputDown: 'subcategorias',
  },
  {
    placeholder: 'Status',
    name: 'Ativo',
    select: [
      {
        message: 'Ativo',
      },
      {
        message: 'Inativo',
      },
    ],
  },
];

export const clientsFields = [
  {
    placeholder: 'Código',
    name: 'codigo',
  },
  {
    placeholder: 'RazaoSocial',
    name: 'razaoSocial',
  },
  {
    placeholder: 'E-mail',
    name: 'email',
  },
  {
    placeholder: 'Status',
    name: 'status',
    select: [
      {
        message: 'Ativo',
      },
      {
        message: 'Inativo',
      },
    ],
  },
];
export const notificacaoColaboradores = [
  {
    placeholder: 'Nome',
    name: 'name',
  },
  {
    placeholder: 'RE',
    name: 're',
  },
  {
    placeholder: 'E-mail',
    name: 'email',
  },
  {
    placeholder: 'Cliente',
    name: 'cliente',
  },
];
