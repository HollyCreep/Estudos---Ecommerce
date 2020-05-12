<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md12>
        <ValidationObserver ref="obs">
          <v-card class="elevation-12" slot-scope="{ invalid, validated }">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Cadastrar Produto</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn outlined rounded @click="$router.go(-1)">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <image-input v-model="avatar">
                  <div slot="activator">
                    <v-avatar size="130px" v-ripple v-if="!avatar" class="grey lighten-3 mb-3">
                      <span class="d-flex flex-column" style="font-size: 0.7rem">
                        Adicionar foto de perfil
                        <v-icon>mdi-camera</v-icon>
                      </span>
                    </v-avatar>
                    <v-avatar size="130px" v-ripple v-else class="mb-3">
                      <img :src="avatar.imageURL" alt="avatar" />
                    </v-avatar>
                  </div>
                </image-input>
                <v-slide-x-transition>
                  <div v-if="avatar && saved == false">
                    <v-btn class="primary" @click="uploadImage" :loading="saving">Save Avatar</v-btn>
                  </div>
                </v-slide-x-transition>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <!-- <v-btn @click="clear">Limpar</v-btn>
              <v-spacer></v-spacer>
              <v-btn @click="submit">Validar</v-btn>
              <v-btn color="primary" @click="submit" :disabled="invalid || !validated">Enviar</v-btn>-->
            </v-card-actions>
          </v-card>
        </ValidationObserver>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ImageInput from "../components/image-uploader.vue";
import { ValidationObserver } from "vee-validate";
import VSelectWithValidation from "../components/inputs/VSelectWithValidation";
import VTextFieldWithValidation from "../components/inputs/VTextFieldWithValidation";
import VCheckBoxWithValidation from "../components/inputs/VCheckBoxWithValidation";
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
    ImageInput,
    ValidationObserver,
    VTextFieldWithValidation,
    VSelectWithValidation,
    VCheckBoxWithValidation
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
</style>