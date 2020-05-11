import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
    component: () => import("@/views/Produtos.vue"),
  },
  {
    path: "/produtos/cadastrar",
    name: "cadastrarProdutos",
    component: () => import("@/views/Produtos-Cadastrar.vue"),
  },
  {
    path: "/produtos/editar/",
    name: "editarProdutos",
    props(route) {
      return route.params || {};
    },
    component: () => import("@/views/Produtos-Editar.vue"),
  },

  // CLIENTES
  {
    path: "/clientes",
    name: "Clientes",
    props(route) {
      return route.params || {};
    },
    component: () => import("@/views/Clientes.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
