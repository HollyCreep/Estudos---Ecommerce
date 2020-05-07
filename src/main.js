import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";

// ==============  Validações Formulários =================
import { ValidationProvider, extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import { required } from "vee-validate/dist/rules";
import { messages } from "vee-validate/dist/locale/pt_BR.json";
// ========================================================

// ==============   CSS   =================================
import "../src/assets/css/basic.css";
// ========================================================

Vue.config.productionTip = false;
Object.keys(rules).forEach((rule) => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
    message: messages[rule], // assign message
  });
});

new Vue({
  router,
  vuetify,
  components: {
    ValidationProvider,
  },
  render: (h) => h(App),
}).$mount("#app");
