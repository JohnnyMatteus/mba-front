import { mdiFileOutline, mdiHomeOutline, mdiLockOutline, mdiCogOutline, mdiAccountMultiple, mdiOfficeBuildingOutline, mdiOfficeBuildingMarkerOutline, mdiNotebookMultiple } from '@mdi/js'

export default [
  {
    title: 'Home',
    icon: mdiHomeOutline,
    to: '/empresa/dashboad',
    resource: 'Painel',
    action: 'construtora',
  },
  {
    title: 'Painel',
    icon: mdiHomeOutline,
    to: '/sindico/dashboad',
    resource: 'Painel',
    action: 'sindico',
  },
  {
    title: 'Dashboad',
    icon: mdiHomeOutline,
    to: '/adm/dashboad-adm',
    resource: 'Painel',
    action: 'administrativo',
  },
  {
    title: 'Configurações',
    icon: mdiCogOutline,
    resource: 'Menu',
    action: 'view',
    children: [
      {
        title: 'Papeis',
        to: '/adm/configuracao/acl/papeis',
        resource: 'Roles',
        action: 'view',
      },
      {
        title: 'Permissões',
        to: '/adm/configuracao/acl/permissoes',
        resource: 'Permission',
        action: 'view',
      },
      {
        title: 'Menus',
        to: '/adm/configuracao/menus',
        resource: 'Menu',
        action: 'view'
      },
    ],
  },
  {
    title: 'Usuários',
    icon: mdiAccountMultiple,
    to: '/adm/usuarios',
    resource: 'Usuario',
    action: 'view'
  },
  {
    title: 'Empresas',
    icon: mdiOfficeBuildingOutline,
    to: '/adm/empresas',
    resource: 'Empresa',
    action: 'view'
  },
  {
    title: 'Empreendimentos',
    icon: mdiOfficeBuildingMarkerOutline,
    to: '/adm/empreendimentos',
    resource: 'Empreendimento',
    action: 'view'
  },
  {
    title: 'Planos de manutenções',
    icon: mdiNotebookMultiple,
    resource: 'Planos',
    action: 'view',
    children: [
      {
        title: 'Lista',
        to: '/adm/planos/lista',
        resource: 'Planos',
        action: 'view'
      },
      {
        title: 'Fornecedores',
        to: '/adm/fornecedores',
        resource: 'Fornecedores',
        action: 'view'
      },
      {
        title: 'Novo plano',
        to: 'planos-new',
        resource: 'Planos-new',
        action: 'view'
      }
    ],
  },

]
