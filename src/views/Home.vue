<template>
  <v-container class="fill-height" fluid>
    <v-row align-center justify-center>
      <v-col class="text-center">
        <h2>Bem vindo ao Mobile Stock!</h2>
        <v-divider inset></v-divider>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col class="text-center">
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <router-link to="about">
              <v-btn icon large target="_blank" v-on="on">
                <v-icon large>mdi-code-tags</v-icon>
              </v-btn>
            </router-link>
          </template>
          <span>Source</span>
        </v-tooltip>

        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              large
              href="https://codepen.io/johnjleider/pen/zgxeLQ"
              target="_blank"
              v-on="on"
            >
              <v-icon large>mdi-codepen</v-icon>
            </v-btn>
          </template>
          <span>Codepen</span>
        </v-tooltip>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {};
  }
};
</script>
