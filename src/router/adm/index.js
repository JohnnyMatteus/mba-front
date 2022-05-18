import store from "@/store";
export default [

  {
    path: "/adm/dashboad-adm",
    name: "/adm/dashboad-adm",
    component: () => import("@/views/Adm/Dashboad.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
      resource: 'Painel',
      action: 'administrativo',
    },
  },
  {
    path: "/adm/usuarios",
    name: "/adm/usuarios",
    component: () => import("@/views/Adm/Users/Index.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
      resource: 'Usuario',
      action: 'view',
    },
  },
  {
    path: "/adm/configuracao/acl/papeis",
    name: "/adm/configuracao/acl/papeis",
    component: () => import("@/views/Adm/Acl/Role/Papeis.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
      resource: 'Roles',
      action: 'view',
    },
  },
  {
    path: "/adm/configuracao/acl/permissoes",
    name: "/adm/configuracao/acl/permissoes",
    component: () => import("@/views/Adm/Acl/Permissions/Permissions.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
      resource: 'Permission',
      action: 'view',
    },
  },
  {
    path: "/adm/configuracao/menus",
    name: "/adm/configuracao/menus",
    component: () => import("@/views/Adm/Menu/Index.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
      resource: 'Menu',
      action: 'view',
    },
  },
  {
    path: "/adm/empresas",
    name: "/adm/empresas",
    component: () => import("@/views/Adm/Empresas/Index.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
      resource: 'Empresa',
      action: 'view',
    },
  },
  {
    path: "/adm/empreendimentos",
    name: "/adm/empreendimentos",
    component: () => import("@/views/Adm/Empreendimentos/Index.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
      resource: 'Empreendimento',
      action: 'view',
    },
  },
  {
    path: "/adm/fornecedores",
    name: "/adm/fornecedores",
    component: () => import("@/views/Adm/Fornecedores/Index.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
      resource: 'Fornecedores',
      action: 'view',
    },
  },
  {
    path: "/adm/planos/lista",
    name: "/adm/planos/lista",
    component: () => import("@/views/Adm/Planos/Index.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
      resource: 'Planos',
      action: 'view',
    },
  },
  {
    path: '/adm/planos/view/:id',
    name: '/adm/planos/plano/view',
    component: () => import('@/views/Adm/Planos/View/PlanoView.vue'),
    meta: {
      layout: 'content',
      requiresAuth: true,
      resource: 'Planos-visualizacao',
      action: 'view',
    },
  },
  
];
