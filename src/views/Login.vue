<template>
  <v-overlay opacity="1" :value="overlay" color="#2d3a4b" style="text-align: center">
    <ValidationObserver ref="obs">
      <h1 class="title">Meu Estoque Digital</h1>
      <v-card-text class="pd-left">
        <v-form>
          <v-row>
            <v-col cols="12">
              <VTextFieldWithValidation
                rules="required|email"
                label="Usuário"
                v-model="email"
                clearable
                flat
                solo
                prepend-inner-icon="mdi-account"
                background-color="#2d3a4b"
                color="#FFF"
                dark
                append-outer-icon=" "
              ></VTextFieldWithValidation>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <VTextFieldWithValidation
                rules="required|min:8|alpha_num"
                v-model="password"
                :type="pwdType"
                outlined
                clearable
                flat
                solo
                prepend-inner-icon="mdi-key"
                append-outer-icon="mdi-eye"
                label="Senha"
                background-color="#2d3a4b"
                color="#FFF"
                dark
                @click:append-outer="showPwd"
              ></VTextFieldWithValidation>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn color="primary" :loading="loading" :disabled="loading" @click="submit">Login</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </ValidationObserver>
  </v-overlay>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import VTextFieldWithValidation from "../components/inputs/VTextFieldWithValidation";

export default {
  name: "Login",
  data: () => ({
    email: "",
    password: "",
    teste: "",
    loading: false,
    pwdType: "password",
    overlay: true
  }),
  components: {
    ValidationObserver,
    VTextFieldWithValidation
  },
  methods: {
    async submit() {
      const result = await this.$refs.obs.validate();
      if (result) {
        this.loading = true;
        var data = {
          email: this.email,
          password: this.password
        };
        this.$http
          .post("http://127.0.0.1:8000/api/auth/login", data, {
            emulateJSON: true
          })
          .then(
            response => {
              this.cervejarias = response.data;
              this.loading = false;
              this.$router.push({ name: "Home" });
            },
            error => {
              this.loading = false;
              this.error = error;
            }
          );
      }
    },
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.title {
  color: $light_gray;
  font-size: 2rem !important;
  line-height: 5rem;
  font-family: "Dancing Script", cursive !important;
}

.login {
  background-color: $bg;
}

.pd-left {
  padding-left: 53px;
}
</style>