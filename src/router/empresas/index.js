import store from "@/store";
export default [

  {
    path: "/empresa/dashboad",
    name: "/empresa/dashboad",
    component: () => import("@/views/Construtoras/Dashboad.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
      resource: 'Painel',
      action: 'construtora'      
    },
  },
  
];
