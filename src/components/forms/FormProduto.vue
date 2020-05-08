<template>
  <ValidationObserver ref="obs">
    <v-card class="elevation-12" slot-scope="{ invalid, validated }">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Cadastrar Produto</v-toolbar-title>
        <v-spacer></v-spacer>
        <router-link to="produtos">
          <v-btn outlined rounded>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </router-link>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12" sm="6" justify="center">
              <v-row justify="space-between">
                <v-col cols="12" justify="flex-end">
                  <VTextFieldWithValidation
                    rules="required|max:32"
                    v-model="referencia"
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
                    v-model="categoria"
                    label="Categoria"
                  />
                </v-col>
                <v-col cols="12" sm="6" justify="flex-end">
                  <VSelectWithValidation
                    rules="required"
                    :items="listaGenero"
                    v-model="genero"
                    label="Gênero"
                  />
                </v-col>
              </v-row>
              <v-row justify="space-between">
                <v-col cols="12" sm="6" justify="flex-end">
                  <VTextFieldWithValidation
                    rules="required"
                    v-model="tam_min"
                    label="Tamanho Mínimo"
                  />
                </v-col>
                <v-col cols="12" sm="6" justify="flex-end">
                  <VTextFieldWithValidation
                    rules="required"
                    v-model="tam_max"
                    label="Tamanho Máximo"
                  />
                </v-col>
              </v-row>
              <v-row justify="space-between">
                <v-col cols="12" sm="6" justify="flex-end">
                  <VTextFieldWithValidation
                    rules="required|min_value:1"
                    v-model="preco"
                    label="Preço"
                    placeholder="0.00"
                  />
                </v-col>
                <v-col cols="12" sm="6" justify="flex-end">
                  <VSelectWithValidation
                    rules="required"
                    :items="listaTabelaPreco"
                    v-model="tabelaPreco"
                    label="Tabela de Preços"
                  />
                </v-col>
              </v-row>
              <h2>Opções</h2>
              <v-divider></v-divider>
              <v-row justify="space-between">
                <v-col cols="3">
                  <v-switch v-model="switchBloqueado">
                    <template v-slot:label>Bloqueado:</template>
                  </v-switch>
                </v-col>
                <v-col cols="3">
                  <v-switch v-model="switchPromocao">
                    <template v-slot:label>Promoção:</template>
                  </v-switch>
                </v-col>
                <v-col cols="3">
                  <v-switch v-model="switchDestaque">
                    <template v-slot:label>Destaque:</template>
                  </v-switch>
                </v-col>
                <v-col cols="3">
                  <v-switch v-model="switchPremio">
                    <template v-slot:label>Prêmio:</template>
                  </v-switch>
                </v-col>
              </v-row>
              <h2>Material do Cabedal</h2>
              <v-divider></v-divider>
              <v-row justify="space-between">
                <v-col cols="4" justify="flex-end">
                  <VTextFieldWithValidation
                    rules="required|max:32"
                    v-model="materialCabedal"
                    :counter="32"
                    label="Material Cabedal"
                  />
                </v-col>
                <v-col cols="4" justify="flex-end">
                  <VTextFieldWithValidation
                    rules="required|max:32"
                    v-model="materialSolado"
                    :counter="32"
                    label="Material Solado"
                  />
                </v-col>
                <v-col cols="4" justify="flex-end">
                  <VTextFieldWithValidation
                    rules="required|max:32"
                    v-model="alturaSolado"
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
                <v-col cols="12" justify="center">
                  <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md12 height="200px">
                      <VCarouselProdutos :slides="listaFotosProduto" border="solid" />
                    </v-flex>
                  </v-layout>
                </v-col>
                <v-col cols="12" justify="flex-end">
                  <v-file-input
                    accept="image/*"
                    label="File input"
                    prepend-icon="mdi-camera"
                    dense
                    outlined
                  ></v-file-input>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row justify="center">
                <v-col cols="12" justify="flex-end">
                  <v-textarea
                    clearable
                    outlined
                    dense
                    v-model="descricao"
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
  data: () => ({
    listaCategorias: ["", "Anabela", "Bota", "Tamanco", "Tenis", "Sapato"],
    listaGenero: ["", "Feminino", "Masculino", "Meninas", "Meninos"],
    listaTabelaPreco: ["", "10.0", "49.99", "100.0", "10.000"],
    listaFotosProduto: [
      {
        id: 0,
        sequencia: "0",
        src: "imagem1.jpg",
        referencia: "sandália 16001 - Preta",
        descrição: "Produzida com os mais altos padrões de qualidade",
        liked: 1
      },
      {
        id: 1,
        sequencia: "1",
        src: "imagem2.jpg",
        referencia: "Bota 17002 - Preta",
        descrição: "Produzida com os mais altos padrões de qualidade",
        liked: 1
      },
      {
        id: 2,
        sequencia: "2",
        src: "imagem3.jpg",
        referencia: "Sapatilha 18003 - Preta/Onça",
        descrição: "Produzida com os mais altos padrões de qualidade",
        liked: 0
      },
      {
        id: 3,
        sequencia: "3",
        src: "imagem4.jpg",
        referencia: "Tamanco 19004 - Azul/Caramelo",
        descrição: "Produzida com os mais altos padrões de qualidade",
        liked: 0
      },
      {
        id: 4,
        sequencia: "4",
        src: "imagem5.png",
        referencia: "sandália 16001 - Preta",
        descrição: "Produzida com os mais altos padrões de qualidade",
        liked: 0
      },
      {
        id: 5,
        sequencia: "5",
        src: "imagem6.png",
        referencia: "Bota 17002 - Preta",
        descrição: "Produzida com os mais altos padrões de qualidade",
        liked: 0
      },
      {
        id: 6,
        sequencia: "6",
        src: "imagem7.jpg",
        referencia: "Sapatilha 18003 - Preta/Onça",
        descrição:
          "Produzida com os mais altos padrões de qualidadeaaaaaaaaaaaaaaaaaaaaaa",
        liked: 0
      },
      {
        id: 7,
        sequencia: "7",
        src: "imagem8.png",
        referencia: "Tamanco 19004 - Azul/Caramelo",
        descrição: "Produzida com os mais altos padrões de qualidade",
        liked: 0
      },
      {
        id: 8,
        sequencia: "8",
        src: "imagem9.jpg",
        referencia: "sandália 16001 - Preta",
        descrição: "Produzida com os mais altos padrões de qualidade",
        liked: 0
      },
      {
        id: 9,
        sequencia: "9",
        src: "imagem0.png",
        referencia: "Bota 17002 - Preta",
        descrição: "Produzida com os mais altos padrões de qualidade",
        liked: 0
      }
    ],
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
    switchBloqueado: false,
    switchDestaque: false,
    switchPromocao: false,
    switchPremio: false
  }),
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
      this.referencia = this.premio = this.categoria = this.genero = this.tam_min = this.tam_max = this.preco = this.checkbox = this.materialCabedal = this.materialSolado = this.alturaSolado =
        "";
      this.switchBloqueado = this.switchDestaque = this.switchPromocao = this.switchPremio = false;
      this.$nextTick(() => {
        this.$refs.obs.reset();
      });
    },
    async submit() {
      const result = await this.$refs.obs.validate();
    }
  }
};
</script>
