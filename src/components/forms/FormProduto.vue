<template>
  <ValidationObserver ref="obs">
    <v-card class="elevation-12" slot-scope="{ invalid, validated }">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Cadastrar Produto</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="6" justify="center">
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
              <v-row justify="space-between">
                <v-col cols="6" justify="flex-end">
                  <VTextFieldWithValidation
                    rules="required|min_value:1"
                    v-model="preco"
                    label="Preço"
                    placeholder="0.00"
                  />
                </v-col>
                <v-col cols="6" justify="flex-end">
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
                    <template v-slot:label>
                      Bloqueado:
                    </template>
                  </v-switch>
                </v-col>
                <v-col cols="3">
                  <v-switch v-model="switchPromocao">
                    <template v-slot:label>
                      Promoção:
                    </template>
                  </v-switch>
                </v-col>
                <v-col cols="3">
                  <v-switch v-model="switchDestaque">
                    <template v-slot:label>
                      Destaque:
                    </template>
                  </v-switch>
                </v-col>
                <v-col cols="3">
                  <v-switch v-model="switchPremio">
                    <template v-slot:label>
                      Prêmio:
                    </template>
                  </v-switch>
                </v-col>
              </v-row>
              <h2>Material do Cabedal</h2>
              <v-divider></v-divider>
              <v-row justify="space-between">
                <v-col cols="4" justify="flex-end">
                  <VTextFieldWithValidation
                    rules="required|max:32"
                    v-model="referencia"
                    :counter="32"
                    label="Material do Cabedal"
                  />
                </v-col>
                <v-col cols="4" justify="flex-end">
                  <VTextFieldWithValidation
                    rules="required|max:32"
                    v-model="premio"
                    :counter="32"
                    label="Material do Solado"
                  />
                </v-col>
                <v-col cols="4" justify="flex-end">
                  <VTextFieldWithValidation
                    rules="required|max:32"
                    v-model="premio"
                    :counter="32"
                    label="Altura do Solado"
                  />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6" justify="flex-end">
              <h2>Material Visual</h2>
              <v-divider></v-divider>
              <v-row justify="center">
                <v-col cols="12" justify="flex-end">
                  <VTextFieldWithValidation
                    rules="required|max:32"
                    v-model="premio"
                    :counter="32"
                    label="Material do Solado"
                  />
                  <v-flex xs4 sm8 md4>
                    <v-img
                      src="@/assets/imagens/imagem3.jpg"
                      class="white--text align-end"
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    >
                    </v-img>
                  </v-flex>
                </v-col>
                <v-col cols="12" justify="flex-end">
                  <VTextFieldWithValidation
                    rules="required|max:32"
                    v-model="premio"
                    :counter="32"
                    label="Material do Solado"
                  />
                </v-col>
                <v-col cols="12" justify="flex-end">
                  <VTextFieldWithValidation
                    rules="required|max:32"
                    v-model="premio"
                    :counter="32"
                    label="Altura do Solado"
                  />
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
        <v-btn color="primary" @click="submit" :disabled="invalid || !validated"
          >Enviar</v-btn
        >
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

export default {
  data: () => ({
    listaCategorias: ["", "Anabela", "Bota", "Tamanco", "Tenis", "Sapato"],
    listaGenero: ["", "Feminino", "Masculino", "Meninas", "Meninos"],
    listaTabelaPreco: ["", "10.0", "49.99", "100.0", "10.000"],
    referencia: "",
    premio: "",
    categoria: "",
    genero: "",
    tam_min: "",
    tam_max: "",
    preco: "",
    checkbox: "",
    tabelaPreco: "",
    switchBloqueado: false,
    switchDestaque: false,
    switchPromocao: false,
    switchPremio: false,
    fab: false,
    dialog: false,
  }),
  components: {
    ValidationObserver,
    VTextFieldWithValidation,
    VSelectWithValidation,
    VCheckBoxWithValidation,
    VFormTabelaPreco,
  },
  methods: {
    async clear() {
      this.referencia = this.premio = this.categoria = this.genero = this.tam_min = this.tam_max = this.preco = this.checkbox =
        "";
      this.switchBloqueado = this.switchDestaque = this.switchPromocao = this.switchPremio = false;
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
