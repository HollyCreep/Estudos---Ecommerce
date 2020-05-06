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
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/produtos",
    name: "Produtos",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Produtos.vue"),
  },
  {
    path: "/produtos-cadastrar",
    name: "cadastrarProdutos",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Produtos-Cadastrar.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
