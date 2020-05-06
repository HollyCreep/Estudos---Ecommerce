<template>
  <v-card raised>
    <v-img
      :src="getImgUrl(conteudo.src)"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
    >
      <v-card-title v-text="conteudo.title"></v-card-title>
    </v-img>
    <v-card-subtitle>{{conteudo.referencia}}</v-card-subtitle>
    <v-card-text>
      <p>{{conteudo.descricao}}</p>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-bookmark</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
    <v-spacer></v-spacer>
  </v-card>
</template>

<script>
export default {
  name: "CardProduto",
  components: {},
  props: {
    conteudo: {
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    getImgUrl(img) {
      return require("@/assets/imagens/" + img);
    }
  }
};
</script>
