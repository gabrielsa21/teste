import { RouteInfo } from './sidebar.metadata';
export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'Logistica',
    iconType: '',
    icon: '',
    class: '',
    groupTitle: true,
    badge: '',
    badgeClass: '',
    submenu: [],
  },
  {
    path: '',
    title: 'Logistica',
    iconType: 'feather',
    icon: 'grid',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [
      {
        path: '/agendamentos',
        title: 'Agendamentos',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/frete',
        title: 'Compor Frete',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/pedido',
        title: 'Gerencia por pedido',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/gerencia-liquidacao',
        title: 'Gerencia por liquidação',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/gera-liquidacao',
        title: 'Gera liquidação',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
    ],
  },
  {
    path: '',
    title: 'FINANCEIRO',
    iconType: '',
    icon: '',
    class: '',
    groupTitle: true,
    badge: '',
    badgeClass: '',
    submenu: [],
  },
  {
    path: '',
    title: 'Financeiro',
    iconType: 'feather',
    icon: 'grid',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
  },
  {
    path: '',
    title: 'COMPONENTES',
    iconType: '',
    icon: '',
    class: '',
    groupTitle: true,
    badge: '',
    badgeClass: '',
    submenu: [],
  },
  {
    path: '',
    title: 'Componentes para uso',
    iconType: 'feather',
    icon: 'grid',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [
      {
        path: '/componentes-para-uso/advance-table',
        title: 'Tabela avançada',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
      {
        path: '/componentes-para-uso/data-tables',
        title: 'Tabela de dados',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [
          {
            path: '/componentes-para-uso/data-tables/basic',
            title: 'Basica',
            iconType: '',
            icon: '',
            class: 'ml-menu',
            groupTitle: false,
            badge: '',
            badgeClass: '',
            submenu: [],
          },
          {
            path: '/componentes-para-uso/data-tables/filter',
            title: 'Filtro',
            iconType: '',
            icon: '',
            class: 'ml-menu',
            groupTitle: false,
            badge: '',
            badgeClass: '',
            submenu: [],
          },
          {
            path: '/componentes-para-uso/data-tables/row-details',
            title: 'Detalhes',
            iconType: '',
            icon: '',
            class: 'ml-menu',
            groupTitle: false,
            badge: '',
            badgeClass: '',
            submenu: [],
          },
          {
            path: '/componentes-para-uso/data-tables/pinning',
            title: 'Pinning',
            iconType: '',
            icon: '',
            class: 'ml-menu',
            groupTitle: false,
            badge: '',
            badgeClass: '',
            submenu: [],
          },
        ],
      },
      {
        path: '/componentes-para-uso/tables',
        title: 'Tabela',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [
          {
            path: '/componentes-para-uso/tables/basic-tables',
            title: 'Basica',
            iconType: '',
            icon: '',
            class: 'ml-menu',
            groupTitle: false,
            badge: '',
            badgeClass: '',
            submenu: [],
          },
          {
            path: '/componentes-para-uso/tables/advance-tables',
            title: 'Avançada',
            iconType: '',
            icon: '',
            class: 'ml-menu',
            groupTitle: false,
            badge: '',
            badgeClass: '',
            submenu: [],
          },
        ],
      },
    ],
  },
  
];
