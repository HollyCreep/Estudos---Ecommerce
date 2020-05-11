<template>
  <v-carousel height="300px" hide-delimiter-background delimiter-icon="mdi-minus">
    <v-carousel-item v-for="(item, i) in slides" :key="i" :src="item.src" contain></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "CardProduto",
  components: {},
  props: {
    slides: {
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
