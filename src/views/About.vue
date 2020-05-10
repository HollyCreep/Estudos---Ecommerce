<template>
  <v-container grid-list-lg>
    <div v-if="cervejarias" class="about">
      <h1
        v-for="(item, index) in cervejarias"
        :key="index"
      >ID: {{ item.id }} - Titulo: {{ item.title }}</h1>
    </div>
    <div v-else class="about">
      <h1>Não ta dando</h1>
    </div>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cervejarias: [],
      post: null,
      error: null
    };
  },
  mounted: function() {},
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },
  watch: {
    // call again the method if the route changes
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      this.error = this.post = null;
      this.$emit('loading', true);
      this.$http
        .get("https://jsonplaceholder.typicode.com/albums/1/photos/")
        .then(
          response => {
            // this.$set(this.cervejarias, response);
            this.cervejarias = response.data;
            this.$emit('loading', false);
          },
          error => {
            this.$emit('loading', false);
            this.error = error;
          }
        );
    },
  }
};
</script>
