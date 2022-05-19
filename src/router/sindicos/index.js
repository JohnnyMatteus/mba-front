import store from "@/store";
export default [
  {
    path: "/sindico/dashboad",
    name: "/sindico/dashboad",
    component: () => import("@/views/Sindicos/Dashboad.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
      resource: 'Painel',
      action: 'sindico'      
    },
  }
  
];
