<template>
  <v-container grid-list-xl>
    <image-input v-model="avatar">
      <div slot="activator">
        <v-avatar size="150px" v-ripple v-if="!avatar" class="grey lighten-3 mb-3">
          <span>Click to add avatar</span>
        </v-avatar>
        <v-avatar size="150px" v-ripple v-else class="mb-3">
          <img :src="avatar.imageURL" alt="avatar" />
        </v-avatar>
      </div>
    </image-input>
    <v-slide-x-transition>
      <div v-if="avatar && saved == false">
        <v-btn class="primary" @click="uploadImage" :loading="saving">Save Avatar</v-btn>
      </div>
    </v-slide-x-transition>
  </v-container>
</template>

<script>
import ImageInput from "../components/image-uploader.vue";
export default {
  name: "about",
  data() {
    return {
      avatar: null,
      saving: false,
      saved: false
    };
  },
  components: {
    ImageInput: ImageInput
  },
  watch: {
    avatar: {
      handler: function() {
        this.saved = false;
      },
      deep: true
    }
  },
  methods: {
    async uploadImage() {
      this.saving = true;
      setTimeout(() => this.savedAvatar(), 1000);
    },
    async savedAvatar() {
      this.saving = false;
      this.saved = true;
    }
  }
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>