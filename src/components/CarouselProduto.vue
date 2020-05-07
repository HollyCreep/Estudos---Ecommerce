<template>
  <v-carousel>
    <v-carousel-item
      v-for="(item, i) in slides"
      :key="i"
      :src="getImgUrl(item.src)"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "CardProduto",
  components: {},
  props: {
    slides: {
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    getImgUrl(img) {
      return require("@/assets/imagens/" + img);
    },
  },
};
</script>
