<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md12>
        <FormProduto :produto="innerProduto" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FormProduto from "../components/forms/FormProduto";
export default {
  name: "editar-produtos",
  props: ["produto"],
  data() {
    return {
      idProduto: "",
      name: "",
      innerProduto: {
        referencia: this.$route.params.id,
        descricao: "",
        categoria: "",
        genero: "",
        tam_min: "",
        tam_max: "",
        preco: "",
        checkbox: "",
        tabelaPreco: "",
        materialCabedal: "",
        materialSolado: "",
        alturaSolado: "",
        switchPromocao: false,
        switchPremio: false,
        fotosProduto: []
      }
    };
  },
  components: {
    FormProduto
  },
  created: function() {
    this.idProduto = this.$route.params.produto;
  }
};
</script>
