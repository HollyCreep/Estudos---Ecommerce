<template>
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
          <v-row>
            <v-col cols="12" sm="6" justify="center">
              <v-row justify="space-between">
                <v-col cols="12" justify="flex-end">
                  <VTextFieldWithValidation
                    rules="required|max:32"
                    v-model="innerProduto.referencia"
                    :counter="32"
                    label="Referência"
                    hint="Nome/código do produto"
                  />
                </v-col>
                <v-col cols="12" sm="6" justify="flex-end"></v-col>
              </v-row>
              <v-row justify="space-between">
                <v-col cols="12" sm="6" justify="flex-end">
                  <VSelectWithValidation
                    rules="required"
                    :items="listaCategorias"
                    v-model="innerProduto.categoria"
                    label="Categoria"
                  />
                </v-col>
                <v-col cols="12" sm="6" justify="flex-end">
                  <VSelectWithValidation
                    rules="required"
                    :items="listaGenero"
                    v-model="innerProduto.genero"
                    label="Gênero"
                  />
                </v-col>
              </v-row>
              <v-row justify="space-between">
                <v-col cols="12" sm="6" justify="flex-end">
                  <VTextFieldWithValidation
                    rules="required"
                    v-model="innerProduto.tam_min"
                    label="Tamanho Mínimo"
                  />
                </v-col>
                <v-col cols="12" sm="6" justify="flex-end">
                  <VTextFieldWithValidation
                    rules="required"
                    v-model="innerProduto.tam_max"
                    label="Tamanho Máximo"
                  />
                </v-col>
              </v-row>
              <v-row justify="space-between">
                <v-col cols="12" sm="6" justify="flex-end">
                  <VTextFieldWithValidation
                    rules="required|min_value:1"
                    v-model="innerProduto.preco"
                    label="Preço"
                    placeholder="0.00"
                  />
                </v-col>
                <v-col cols="12" sm="6" justify="flex-end">
                  <VSelectWithValidation
                    rules="required"
                    :items="listaTabelaPreco"
                    v-model="innerProduto.tabelaPreco"
                    label="Tabela de Preços"
                  />
                </v-col>
              </v-row>
              <h2>Opções</h2>
              <v-divider></v-divider>
              <v-row justify="space-between">
                <v-col cols="6">
                  <v-switch v-model="innerProduto.switchPromocao">
                    <template v-slot:label>Promoção:</template>
                  </v-switch>
                </v-col>
                <v-col cols="6">
                  <v-switch v-model="innerProduto.switchPremio">
                    <template v-slot:label>Prêmio:</template>
                  </v-switch>
                </v-col>
              </v-row>
              <h2>Material do Produto</h2>
              <v-divider></v-divider>
              <v-row justify="space-between">
                <v-col cols="4" justify="flex-end">
                  <VTextFieldWithValidation
                    rules="required|max:32"
                    v-model="innerProduto.materialCabedal"
                    :counter="32"
                    label="Material Cabedal"
                  />
                </v-col>
                <v-col cols="4" justify="flex-end">
                  <VTextFieldWithValidation
                    rules="required|max:32"
                    v-model="innerProduto.materialSolado"
                    :counter="32"
                    label="Material Solado"
                  />
                </v-col>
                <v-col cols="4" justify="flex-end">
                  <VTextFieldWithValidation
                    rules="required|max:32"
                    v-model="innerProduto.alturaSolado"
                    :counter="32"
                    label="Altura do Salto"
                  />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" sm="6" justify="flex-end">
              <h2>Material Visual</h2>
              <v-divider></v-divider>
              <v-row justify="center">
                <v-col cols="12" justify="center" v-show="innerProduto.fotosProduto.length > 0">
                  <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md12 height="200px">
                      <VCarouselProdutos :slides="innerProduto.fotosProduto" border="solid" />
                    </v-flex>
                  </v-layout>
                </v-col>
                <v-col cols="12" justify="flex-end">
                  <v-file-input
                    v-model="files"
                    color="primary"
                    counter
                    label="Upload"
                    multiple
                    placeholder="Upload de imagens"
                    outlined
                    :show-size="1000"
                    @change="loadTextFromFile"
                    @click:clear="(innerProduto.fotosProduto = [])"
                  >
                    <template v-slot:selection="{ index, text }">
                      <v-chip v-if="index < 2" color="primary" dark label small>{{ text }}</v-chip>

                      <span
                        v-else-if="index === 2"
                        class="overline grey--text text--darken-3 mx-2"
                      >+{{ files.length - 2 }} File(s)</span>
                    </template>
                  </v-file-input>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row justify="center">
                <v-col cols="12" justify="flex-end">
                  <v-textarea
                    clearable
                    outlined
                    dense
                    v-model="innerProduto.descricao"
                    clear-icon="mdi-close"
                    label="Descrição"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="clear">Limpar</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="submit">Validar</v-btn>
        <v-btn color="primary" @click="submit" :disabled="invalid || !validated">Enviar</v-btn>
      </v-card-actions>
    </v-card>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import VSelectWithValidation from "../inputs/VSelectWithValidation";
import VTextFieldWithValidation from "../inputs/VTextFieldWithValidation";
import VCheckBoxWithValidation from "../inputs/VCheckBoxWithValidation";
import VFormTabelaPreco from "./FormTabelaPreco";
import VCarouselProdutos from "../CarouselProduto";

export default {
  name: "FormProdutos",
  data: () => ({
    files: [],
    listaCategorias: ["", "Anabela", "Bota", "Tamanco", "Tenis", "Sapato"],
    listaGenero: ["", "Feminino", "Masculino", "Meninas", "Meninos"],
    listaTabelaPreco: ["", "10.0", "49.99", "100.0", "10.000"],

    innerProduto: {
      referencia: "",
      descricao: "",
      categoria: "",
      genero: "",
      tam_min: "",
      tam_max: "",
      preco: "",
      checkbox: "",
      tabelaPreco: "",
      materialCabedal: "",
      materialSolado: "",
      alturaSolado: "",
      switchPromocao: false,
      switchPremio: false,
      fotosProduto: []
    }
  }),
  props: {
    produto: {
      type: Object,
      required: false,
      default: function() {
        return {
          referencia: "",
          descricao: "",
          categoria: "",
          genero: "",
          tam_min: "",
          tam_max: "",
          preco: "",
          checkbox: "",
          tabelaPreco: "",
          materialCabedal: "",
          materialSolado: "",
          alturaSolado: "",
          switchPromocao: false,
          switchPremio: false,
          fotosProduto: []
        };
      }
    }
  },
  components: {
    ValidationObserver,
    VTextFieldWithValidation,
    VSelectWithValidation,
    VCheckBoxWithValidation,
    VFormTabelaPreco,
    VCarouselProdutos
  },
  methods: {
    async clear() {
      this.innerProduto.referencia = this.innerProduto.premio = this.innerProduto.categoria = this.innerProduto.genero = this.innerProduto.tam_min = this.innerProduto.tam_max = this.innerProduto.preco = this.innerProduto.checkbox = this.innerProduto.materialCabedal = this.innerProduto.materialSolado = this.innerProduto.alturaSolado = this.innerProduto.descricao =
        "";
      this.innerProduto.switchPromocao = this.innerProduto.switchPremio = false;

      this.$nextTick(() => {
        this.$refs.obs.reset();
      });
    },
    async submit() {
      const result = await this.$refs.obs.validate();
    },
    async loadTextFromFile(ev) {
      ev.forEach(element => {
        const file = element;
        const reader = new FileReader();
        reader.onload = event => {
          this.innerProduto.fotosProduto.push({ src: event.target.result });
        };
        if (file) reader.readAsDataURL(file);
      });
    }
  },
  created() {
    if (this.produto) {
      this.innerProduto = this.produto;
    }
  }
};
</script>
