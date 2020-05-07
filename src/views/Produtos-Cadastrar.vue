<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md12>
        <FormProduto />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FormProduto from "../components/forms/FormProduto";
export default {
  name: "ProdutosCadastrar",
  components: {
    FormProduto,
  },
};
</script>
