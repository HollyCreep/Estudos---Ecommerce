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
      <v-dialog v-if="loading" v-model="loading" persistent retain-focus width="300">
        <v-card color="primary" dark>
          <v-card-text>
            <v-row class="mt-2" align="center" justify="center">Carregando...</v-row>
            <v-row class="mt-2" align="center" justify="center">
              <v-progress-circular indeterminate color="white" class="mb-0"></v-progress-circular>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
      <router-view></router-view>
    </v-content>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cervejarias: [],
      loading: false,
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
      this.loading = true;
      // replace `getPost` with your data fetching util / API wrapper
      this.$http
        .get("https://jsonplaceholder.typicode.com/albums/1/photos/")
        .then(
          response => {
            // this.$set(this.cervejarias, response);
            this.cervejarias = response.data;
            this.loading = false;
          },
          error => {
            this.loading = false;
            this.error = error;
          }
        );
    }
  }
};
</script>
