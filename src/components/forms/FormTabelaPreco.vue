<template>
  <ValidationObserver ref="obs">
    <v-card class="elevation-12" slot-scope="{ invalid, validated }">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Cadastrar Produto</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-row justify="space-between">
            <v-col cols="6" justify="flex-end">
              <VTextFieldWithValidation
                rules="required|max:32"
                v-model="referencia"
                :counter="32"
                label="Referência"
              />
            </v-col>
            <v-col cols="6" justify="flex-end">
              <VTextFieldWithValidation
                rules="required|max:32"
                v-model="premio"
                :counter="32"
                label="Prêmio"
              />
            </v-col>
          </v-row>
          <v-row justify="space-between">
            <v-col cols="6" justify="flex-end">
              <VSelectWithValidation
                rules="required"
                :items="listaCategorias"
                v-model="categoria"
                label="Categoria"
              />
            </v-col>
            <v-col cols="6" justify="flex-end">
              <VSelectWithValidation
                rules="required"
                :items="listaGenero"
                v-model="genero"
                label="Gênero"
                append-outer-icon="mdi-account-circle"
              /> </v-col
          ></v-row>
          <v-row justify="space-between">
            <v-col cols="6" justify="flex-end">
              <VTextFieldWithValidation
                rules="required"
                v-model="tam_min"
                label="Tamanho Mínimo"
              />
            </v-col>
            <v-col cols="6" justify="flex-end">
              <VTextFieldWithValidation
                rules="required"
                v-model="tam_max"
                label="Tamanho Máximo"
              /> </v-col
          ></v-row>

          <VTextFieldWithValidation
            rules="required|min_value:1"
            v-model="preco"
            label="Preço"
            placeholder="0.00"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="clear">Clear</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="submit">Validate</v-btn>
        <v-btn color="primary" @click="submit" :disabled="invalid || !validated"
          >Sign Up</v-btn
        >
      </v-card-actions>
    </v-card>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import VTextFieldWithValidation from "../inputs/VTextFieldWithValidation";
import VSelectWithValidation from "../inputs/VSelectWithValidation";
import VCheckBoxWithValidation from "../inputs/VCheckBoxWithValidation";

export default {
  data: () => ({
    listaCategorias: ["", "Anabela", "Bota", "Tamanco", "Tenis", "Sapato"],
    listaGenero: ["", "Feminino", "Masculino", "Meninas", "Meninos"],
    referencia: "",
    premio: "",
    categoria: "",
    genero: "",
    tam_min: "",
    tam_max: "",
    preco: "",
    checkbox: "",
    switchBloqueado: false,
    switchDestaque: false,
    switchPromocao: false,
    switchPremio: false,
    date: null,
    fab: false,
    transition: "slide-y-reverse-transition",
  }),
  components: {
    ValidationObserver,
    VTextFieldWithValidation,
    VSelectWithValidation,
    VCheckBoxWithValidation,
  },
  methods: {
    async clear() {
      this.referencia = this.premio = this.categoria = this.genero = this.tam_min = this.tam_max = this.preco = this.checkbox =
        "";
      this.$nextTick(() => {
        this.$refs.obs.reset();
      });
    },
    async submit() {
      const result = await this.$refs.obs.validate();
    },
  },
};
</script>
