<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <RefactoredForm />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Form from "../components/Form";
import RefactoredForm from "../components/RefactoredForm";
export default {
  name: "ProdutosCadastrar",
  components: {
    Form,
    RefactoredForm,
  },
};
</script>
