import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
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
];

const router = new VueRouter({
  routes,
});

function isAuthenticated() {
  //implementar
  return true;
}
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (isAuthenticated()) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
