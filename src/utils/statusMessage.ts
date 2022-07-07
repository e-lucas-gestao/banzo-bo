import { theme } from '../styles/theme';

interface Keys {
  [key:string]: any
}

export const messages: Keys = {
  atendivel: [
    {
      message: 'Não',
      value: 0,
    },
    {
      message: 'Sim',
      value: 1,
    },
  ],

  nomeGrupo: [
    {
      message: 'MedCorp',
      value: 'MedCorp',
    },
    {
      message: 'Labor Import',
      value: 'Labor Import',
    },
  ],

  nomeNivelCriticidade: [
    {
      message: 'Baixo',
      value: 'B',
    },
    {
      message: 'Médio',
      value: 'M',
    },
    {
      message: 'Alto',
      value: 'A',
    },
  ],

  statusAtendimento: [
    {
      message: 'Pendente',
      value: 'P',
    },
    {
      message: 'Em andamento',
      value: 'A',
    },
    {
      message: 'Finalizado',
      value: 'M',
    },
  ],

  statusColaborador: [
    {
      message: 'Colaborador em demissão',
      color: '#c60c30',
    },
    {
      message: 'Em troca de posto',
      color: '#ffba00',
    },
    {
      message: 'Colaborador padrão',
      color: '#0DC70D',
    },
  ],

  statusEstoque: [
    {
      value: 0,
      color: 'green',
      message: 'Ítem em estoque',
      hex: '#0DC70D',
    },
    {
      value: 1,
      color: 'yellow',
      message: 'Ítem com pedido',
      hex: '#ffba00',
    },
    {
      value: 2,
      color: 'red',
      message: 'Ítem sem estoque',
      hex: '#c60c30',
    }],
  Ativo: [
    {
      message: 'Ativo',
      value: 0,
      color: `${theme.colors.status2Green}`,
    },
    {
      message: 'Inativo',
      value: 1,
      color: `${theme.colors.status2Red}`,
    },
  ],

  Tipo: [
    {
      message: 'Padrão',
      value: 0,
      color: `${theme.colors.status2Blue}`,
    },
    {
      message: 'Supervisor',
      value: 1,
      color: `${theme.colors.status2Purple}`,
    },
  ],
  devolucaoProduto: [
    {
      message: 'Sim',
      value: 1,
    },
    {
      message: 'Não',
      value: 0,
    },

  ],
  StatusSolicitacao: [
    {
      value: 1,
      message: 'Pendente',
      color: `${theme.colors.status2Red}`,
    },
    {
      value: 2,
      message: 'Em separação',
      color: `${theme.colors.status2Orange}`,
    },
    {
      value: 3,
      message: 'Liberado para retirada',
      color: `${theme.colors.status2Blue}`,
    },
    {
      value: 4,
      message: 'Em trânsito',
      color: `${theme.colors.status2Yellow}`,
    },
    // {
    //   value: 5,
    //   message: 'Em trânsito', //
    //   color: `${theme.colors.status2Green}`,
    // },
    {
      value: 6,
      message: 'Parcial', //
      color: `${theme.colors.status2Yellow}`,
    },
    {
      value: 7,
      message: 'Entregue no posto',
      color: `${theme.colors.status2Green}`,
    },
    {
      value: 8,
      message: 'Não cadastrado no GR', // erro de cadastro no grupo GR
      color: '#111',
    },
    {
      value: 9,
      message: 'Pronto para retirada parcial',
      color: `${theme.colors.status2Blue}`,
    },
  ],
  StatusPush: [
    {
      message: 'Aberto',
      value: 0,
    },
    {
      message: 'Programado',
      value: 1,
    },
    {
      message: 'Enviado Parcial',
      value: 2,
    },
    {
      message: 'Enviado',
      value: 3,
    },
    {
      message: 'Erro durante o envio',
      value: 4,
    },
  ],
  Status: [
    {
      message: 'Inativo',
      color: `${theme.colors.status2Red}`,
    },
    {
      message: 'Ativo',
      color: `${theme.colors.status2Green}`,
    },
  ],
  StatusBanner: [
    {
      value: 0,
      message: 'Inativo',
      color: `${theme.colors.status2Red}`,
    },
    {
      value: 1,
      message: 'Ativo',
      color: `${theme.colors.status2Green}`,
    },
  ],
  StatusSolicitacaoF: [
    {
      value: 0,
      message: '',
      color: `${theme.colors.status2Red}`,
    },
    {
      value: 1,
      message: 'Pendente',
      color: `${theme.colors.status2Red}`,
    },
    {
      value: 2,
      message: 'Em separação',
      color: `${theme.colors.status2Orange}`,
    },
    {
      value: 3,
      message: 'Liberado para retirada',
      color: `${theme.colors.status2Blue}`,
    },
    {
      value: 4,
      message: 'Em trânsito', // retirado pa
      color: `${theme.colors.status2Yellow}`,
    },
    {
      value: 5,
      message: 'Em trânsito', // erro de cadastro no grupo GR
      color: `${theme.colors.status2Yellow}`,
    },
    {
      value: 6,
      message: 'Parcial', // erro de cadastro no grupo GR
      color: `${theme.colors.status2Yellow}`,
    },
    {
      value: 7,
      message: 'Entregue no posto',
      color: `${theme.colors.status2Green}`,
    },
    {
      value: 8,
      message: 'Não cadastrado no GR', // erro de cadastro no grupo GR
      color: '#111',
    },
    {
      value: 9,
      message: 'Pronto para retirada parcial',
      color: `${theme.colors.status2Blue}`,
    },
  ],

};
