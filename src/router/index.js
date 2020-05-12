import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import routes from "./router.js";

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
