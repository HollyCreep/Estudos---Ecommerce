<template>
  <v-container grid-list-lg>
    <div v-if="cervejarias" class="about">
      <h1 v-for="(item, index) in cervejarias" :key="index">
        ID: {{ item.id }} - Titulo: {{ item.title }}
      </h1>
    </div>
    <div v-else class="about">
      <h1>Não ta dando</h1>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cervejarias: [],
    };
  },
  mounted: function() {
    this.$http
      .get("https://jsonplaceholder.typicode.com/albums/1/photos/")
      .then(
        (response) => {
          // this.$set(this.cervejarias, response);
          this.cervejarias = response.data;
        },
        (error) => {
          console.log(error);
        }
      );
  },
};
</script>
