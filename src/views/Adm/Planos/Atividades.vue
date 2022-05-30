<template>
  <v-dialog v-model="show" persistent max-width="1350px">
    <v-card>
      <v-card-title>
        <span class="headline">Tarefas</span>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="listaItens"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  registrar tarefa
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-menu
                          ref="menuref"
                          v-model="menu1"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              outlined
                              dense
                              v-model="editedItem.data_atividade"
                              label="Data da atividade"
                              persistent-hint
                              v-bind="attrs"
                              v-on="on"
                              :hint="errors.first('data_atividade')"
                              :error="
                                errors.collect('data_atividade').length
                                  ? true
                                  : false
                              "
                              v-validate="'required'"
                              data-vv-scope="atividade"
                            ></v-text-field>
                          </template>

                          <v-date-picker
                            v-model="editedItem.data_atividade"
                            no-title
                            color="primary"
                            @input="menu1 = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-menu
                          ref="menuref"
                          v-model="menu2"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              outlined
                              dense
                              v-model="editedItem.data_registro"
                              label="Data da registro"
                              persistent-hint
                              v-bind="attrs"
                              v-on="on"
                              :hint="errors.first('data_registro')"
                              :error="
                                errors.collect('data_registro').length
                                  ? true
                                  : false
                              "
                              v-validate="'required'"
                              data-vv-scope="atividade"
                            ></v-text-field>
                          </template>

                          <v-date-picker
                            v-model="editedItem.data_registro"
                            no-title
                            color="primary"
                            @input="menu2 = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-select
                          :items="itemsFornecedores"
                          item-text="nome"
                          item-value="id"
                          outlined
                          dense
                          label="Fornecedores"
                          id="id_fornecedor"
                          name="id_fornecedor"
                          persistent-hint
                          v-model="editedItem.id_fornecedor"
                          :hint="errors.first('fornecedor_id')"
                          :error="
                            errors.collect('fornecedor_id').length
                              ? true
                              : false
                          "
                          v-validate="'required'"
                          data-vv-scope="atividade"
                          data-vv-validate-on="change"
                          data-vv-as="id_fornecedor"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-select
                          :items="itemsStatus"
                          v-model="editedItem.status"
                          :hint="errors.first('status')"
                          :error="
                            errors.collect('status').length ? true : false
                          "
                          v-validate="'required'"
                          data-vv-scope="atividade"
                          data-vv-validate-on="change"
                          data-vv-as="status"
                          dense
                          persistent-hint
                          label="Status"
                          outlined
                        ></v-select>
                      </v-col>
                      <div class="col-12">
                        <v-file-input
                          v-model="editedItem.arquivo"
                          label="Comprovante Fiscal"
                          accept=".pdf, .doc, .docx"
                          outlined
                          dense
                        ></v-file-input>
                      </div>
                      <v-col cols="12">
                        <v-textarea
                          label="Observação"
                          outlined
                          rows="3"
                          id="observacao"
                          name="observacao"
                          persistent-hint
                          v-model="editedItem.observacao"
                          :hint="errors.first('observacao')"
                          :error="
                            errors.collect('observacao').length ? true : false
                          "
                          v-validate="'required'"
                          data-vv-scope="atividade"
                          data-vv-validate-on="change"
                          data-vv-as="observacao"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Fechar
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                    :loading="loadingSalvar"
                  >
                    salvar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Tem certeza de que deseja excluir este item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Fechar</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >Excluir</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <!-- updated_at -->
          <template #[`item.updated_at`]="{ item }">
            <span>{{ item.updated_at | dateTimeFormatBr() }}</span>
          </template>
          <!-- data_atividade -->
          <template #[`item.data_atividade`]="{ item }">
            <span>{{ item.data_atividade | dateFormatBr() }}</span>
          </template>
          <!-- data_registro -->
          <template #[`item.data_registro`]="{ item }">
            <span>{{ item.data_registro | dateFormatBr() }}</span>
          </template>
          <template #[`item.status`]="{ item }">
            <span>{{ resolveNameStatusVariant(item.status) }}</span>
          </template>
          <template #[`item.comprovante_fiscal`]="{ item }">
            <span><a :href="item.comprovante_fiscal" target="_blank">Download</a></span>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)">
              mdi-delete
            </v-icon> </template
          >
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reiniciar </v-btn>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" outlined @click.stop="show = false">
          Fechar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import store from "@/store";
export default {
  props: ["visible", "item_plano"],
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Observação",
        align: "start",
        sortable: false,
        value: "observacao",
      },
      { text: "Fornecedor", value: "fornecedor_nome" },
      { text: "Data atividade", value: "data_atividade" },
      { text: "Data registro", value: "data_registro" },
      { text: "Comprovante", value: "comprovante_fiscal" },
      { text: "Última atualização", value: "updated_at" },
      { text: "Status", value: "status" },
      { text: "Ações", value: "actions", sortable: false },
    ],
    itemsStatus: [
      { text: "A fazer", value: "A" },
      { text: "Não realizada", value: "I" },
      { text: "Pendente", value: "P" },
      { text: "Realizada", value: "D" },
    ],
    loadingSalvar: false,
    editedIndex: -1,
    menu1: "",
    menu2: "",
    editedItem: {
      data_atividade: "",
      data_registro: "",
      observacao: "",
      status: "A",
      id_item_plano_manutencao: "",
      id_fornecedor: "",
    },
    defaultItem: {
      nome: "",
      descricao: "",
      status: "A",
    },
    itemsFornecedores: [],
  }),
  methods: {
    initialize() {},

    editItem(item) {
      this.editedIndex = this.listaItens.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.listaItens.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$store
        .dispatch("atividades/removeItem", this.editedItem.id)
        .then((response) => {
          if (response.data.data === true) {
            this.listaItens.splice(this.editedIndex, 1);
            this.$store.dispatch("module/openSnackBar", {
              color: "success",
              timeout: 3000,
              text: "Registro removido.",
            });
            this.item = {};
          }
        })
        .catch(() => {
          store.dispatch("module/openSnackBar", {
            color: "error",
            timeout: 3000,
            text: "Não foi possivel remover o registro.",
          });
        })
        .finally(() => {
          this.loadingTable = false;
          this.dialogDelete = false;
        });
      this.closeDelete();
    },

    close() {
      this.loadingSalvar = false;
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      this.$validator.validate("atividade.*").then((result) => {
        if (result) {
          this.loadingSalvar = true;
          let url =
            this.editedIndex === -1
              ? "/atividade"
              : "/atividade/" + this.editedItem.id;
          let method = this.editedIndex === -1 ? "POST" : "PUT";
          let text =
            this.editedIndex === -1
              ? "atividade cadastrado."
              : "atividade atualizado.";
          let erro =
            this.editedIndex === -1
              ? "Erro ao salvar item."
              : "Erro ao atualizar item.";
          let data = this.editedItem;
          data._method = method;
          data.id_item_plano_manutencao = this.item_plano.id;
          data.url = url;
          this.$store
            .dispatch("atividades/saveOrUpdate", { data })
            .then(() => {
              this.editedIndex === -1
                ? this.listaItens.push(this.editedItem)
                : Object.assign(
                    this.listaItens[this.editedIndex],
                    this.editedItem
                  );
              this.$store.dispatch("module/openSnackBar", {
                color: "success",
                timeout: 3000,
                text: text,
              });
            })
            .catch((error) => {
              this.$store.dispatch("module/openSnackBar", {
                color: "error",
                timeout: 3000,
                text: erro,
              });
            })
            .finally(() => {
              this.close();
            });
        } else {
          this.$store.dispatch("module/openSnackBar", {
            color: "error",
            timeout: 3000,
            text: "Preencha todo formulário antes de salvar!",
          });
        }
      });
    },

    resolveNameStatusVariant(status) {
      if (status === "D") return "REALIZADA";
      if (status === "P") return "PENDENTE";
      if (status === "A") return "A FAZER";
      if (status === "I") return "NÃO REALIZADA";

      return "PENDENTE";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    store.dispatch("atividades/fetchItems");
    this.$store
      .dispatch("providers/fetchItems")
      .then((resp) => (this.itemsFornecedores = resp.data.data.fornecedor));
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      },
    },
    computedHeaders() {
      return this.headers.filter(
        (h) => !h.hide || !this.$vuetify.breakpoint[h.hide]
      );
    },
    formTitle() {
      return this.editedIndex === -1 ? "Cadastrar tarefa" : "Editar tarefa";
    },
    listaItens: {
      get() {
        return store.getters["atividades/getItemsList"];
      },
      set(value) {
        store.dispatch("atividades/setItemList", value);
      },
    },
    usuario: {
      get() {
        return this.$store.getters["auth/getUsuario"];
      },
    },
    papel: {
      get() {
        return this.$store.getters["auth/getRole"];
      },
    },
  },
};
</script>