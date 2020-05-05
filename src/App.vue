<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
    >
      <v-list>
        <v-list-item v-for="(item, i) in destinations" :key="i" link>
          <v-list-item-icon>
            <v-icon>{{ item.name }}</v-icon>
          </v-list-item-icon>
          <v-icon large>mdi-code-tags</v-icon>
          <v-list-item-content>
            <v-list-item-title>info</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
      dark
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Menu</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer color="blue darken-1" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import router from "@/router/router.js";
export default {
  name: "App",
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    destinations: router.menuLateral,
  }),
};
</script>

<style lang="scss"></style>
