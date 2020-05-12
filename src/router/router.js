const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About.vue"),
  },

  // PRODUTOS
  {
    path: "/produtos",
    name: "Produtos",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/Produtos.vue"),
  },
  {
    path: "/produtos/cadastrar",
    name: "cadastrarProdutos",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/Produtos-Cadastrar.vue"),
  },
  {
    path: "/produtos/editar/",
    name: "editarProdutos",
    meta: {
      requiresAuth: true,
    },
    props(route) {
      return route.params || {};
    },
    component: () => import("@/views/Produtos-Editar.vue"),
  },

  // CLIENTES
  {
    path: "/clientes",
    name: "Clientes",
    meta: {
      requiresAuth: true,
    },
    props(route) {
      return route.params || {};
    },
    component: () => import("@/views/Clientes.vue"),
  },
  {
    path: "/clientes/cadastrar",
    name: "cadastrarUsuario",
    meta: {
      requiresAuth: true,
    },
    props(route) {
      return route.params || {};
    },
    component: () => import("@/views/Clientes-Cadastrar.vue"),
  },
];

export default routes;
