<template>
  <v-container fluid>
    <v-toolbar class="mb-1">
      <router-link to="produtos-cadastrar">
        <v-btn>
          Cadastrar
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </router-link>
    </v-toolbar>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar dark color="blue darken-3" class="mb-1">
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Pesquisa"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.smAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-magnify"
              label="Ordenar por"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="sortDesc" mandatory>
              <v-btn small depressed color="blue" :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn small depressed color="blue" :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col v-for="item in props.items" :key="item.name" cols="12" sm="6" md="4" lg="3">
            <v-card raised>
              <v-btn fab absolute small @click="editarProduto(item.id)">
                <v-icon dark color="blue darken-3">mdi-pencil</v-icon>
              </v-btn>
              <v-img
                :src="getImgUrl(item.src)"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              >
                <v-card-title v-text="$options.filters.upperCase(item.referencia)"></v-card-title>
              </v-img>
              <v-divider></v-divider>
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <b>Detalhes</b>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-list dense>
                      <v-list-item
                        v-for="(key, index) in filteredKeys"
                        :key="index"
                        :id="item.id"
                        class="li-border-bottom"
                      >
                        <v-list-item-content :class="{ 'blue--text': sortBy === key }">
                          <b>{{ key | upperCase }}:</b>
                        </v-list-item-content>
                        <v-list-item-content
                          class="align-end; justify-end"
                          :class="{ 'blue--text': sortBy === key }"
                        >{{ item[key.toLowerCase()] }}</v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-expansion-panel-content>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn icon @click=" item.liked = !item.liked">
                      <v-icon :class="{ 'liked': item.liked }">mdi-heart</v-icon>
                    </v-btn>

                    <v-btn icon>
                      <v-icon>mdi-bookmark</v-icon>
                    </v-btn>

                    <v-btn icon>
                      <v-icon>mdi-share-variant</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-expansion-panel>
              </v-expansion-panels>

              <v-spacer></v-spacer>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn dark text color="primary" class="ml-2" v-on="on">
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span class="mr-4 grey--text">Page {{ page }} of {{ numberOfPages }}</span>
          <v-btn fab dark color="blue darken-3" class="mr-1" @click="formerPage">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>
<script>
import CardProduto from "../components/CardProduto.vue";

export default {
  name: "Produtos",
  components: { "card-produto": CardProduto },
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 8,
      sortBy: "id",
      keys: ["id", "Sequencia", "Referencia", "Descrição"],
      items: [
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
          sequencia: "0",
          src: "imagem1.jpg",
          referencia: "sandália 16001 - Preta",
          descrição: "Produzida com os mais altos padrões de qualidade",
          liked: 0
        },
        {
          id: 5,
          sequencia: "1",
          src: "imagem2.jpg",
          referencia: "Bota 17002 - Preta",
          descrição: "Produzida com os mais altos padrões de qualidade",
          liked: 0
        },
        {
          id: 6,
          sequencia: "2",
          src: "imagem3.jpg",
          referencia: "Sapatilha 18003 - Preta/Onça",
          descrição:
            "Produzida com os mais altos padrões de qualidadeaaaaaaaaaaaaaaaaaaaaaa",
          liked: 0
        },
        {
          id: 7,
          sequencia: "3",
          src: "imagem4.jpg",
          referencia: "Tamanco 19004 - Azul/Caramelo",
          descrição: "Produzida com os mais altos padrões de qualidade",
          liked: 0
        },
        {
          id: 8,
          sequencia: "0",
          src: "imagem1.jpg",
          referencia: "sandália 16001 - Preta",
          descrição: "Produzida com os mais altos padrões de qualidade",
          liked: 0
        },
        {
          id: 9,
          sequencia: "1",
          src: "imagem2.jpg",
          referencia: "Bota 17002 - Preta",
          descrição: "Produzida com os mais altos padrões de qualidade",
          liked: 0
        },
        {
          id: 10,
          sequencia: "2",
          src: "imagem3.jpg",
          referencia: "Sapatilha 18003 - Preta/Onça",
          descrição:
            "Produzida com os mais altos padrões de qualidadeaaaaaaaaaaaaaaaaaaaaaa",
          liked: 0
        },
        {
          id: 11,
          sequencia: "3",
          src: "imagem4.jpg",
          referencia: "Tamanco 19004 - Azul/Caramelo",
          descrição: "Produzida com os mais altos padrões de qualidade",
          liked: 0
        }
      ]
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter(key => key !== `Name`);
    }
  },
  methods: {
    getImgUrl(img) {
      return require("@/assets/imagens/" + img);
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    editarProduto(id) {
      console.log(id);
    }
  },
  filters: {
    upperCase(value) {
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    toBold(value) {
      value = value.toString();
      return value.bold();
    }
  }
};
</script>

<style lang="scss">
.v-btn--absolute {
  right: 2%;
  top: 1%;
}

.li-border-bottom {
  border-bottom: solid;
  border-width: thin;
  border-color: rgba(0, 0, 0, 0.12);
}
</style>