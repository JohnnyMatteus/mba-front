<template language="html">
  <div class="gestao-items-planos">
    <crud
      :title="'Lista de atividades'"
      buttonAddItemText="Nova atividade"
      :dialog.sync="dialog"
      :formTitle="formTitle"
      :callBackModalCancelar="fechar"
      :callBackModalSalvar="salvar"
      :callBackModalInsert="resetFields"
      :loadingButtonSave="loadingSalvar"
      :tamanhoModalCrud="600"
      searchLabelText="Pesquisar na lista"
      :searchTextField.sync="searchTextField"
      :dialogDelete.sync="dialogDelete"
    >
      <template slot="data-table">
        <v-data-table
          :loading="loadingTable"
          :headers="computedHeaders"
          :items="listaItens"
          :search="searchTextField"
          items-per-page-text="Linhas por página"
          no-results-text="Nenhum registro encontrado"
          no-data-text="Nenhum registro encontrado"
          mobile-breakpoint="0"
        >
          <template #[`item.status`]="{ item }">
            <v-chip
              small
              :color="resolveStatusVariant(item.status)"
              :class="`${resolveStatusVariant(item.status)}--text`"
              class="v-chip-light-bg font-weight-semibold text-capitalize"
            >
              {{ resolveNameStatusVariant(item.status) }}
            </v-chip>
          </template>
          <template v-slot:[`item.rota`]="{ item }">
            <span v-if="item.rota !== ''">{{ item.rota }}</span>
            <span v-else>
              <v-chip label> Lista </v-chip>
            </span>
          </template>
          <template v-slot:[`item.acao`]="{ item }">
            <v-menu bottom left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item @click="toggleModalLateral(item)">
                  <v-list-item-title>
                    <v-icon size="20" class="me-2"> mdi-eye </v-icon>
                    <span>Visualizar</span>
                  </v-list-item-title>
                </v-list-item>

                <v-list-item @click="registrarAtividade(item)">
                  <v-list-item-title>
                    <v-icon size="20" class="me-2"> mdi-application-edit-outline </v-icon>
                    <span>Tarefas</span>
                  </v-list-item-title>
                </v-list-item>

                <v-list-item @click="editar(item)">
                  <v-list-item-title>
                    <v-icon size="20" class="me-2"> mdi-pencil </v-icon>
                    <span>Editar</span>
                  </v-list-item-title>
                </v-list-item>

                <v-list-item @click="remover(item, true)">
                  <v-list-item-title>
                    <v-icon size="20" class="me-2"> mdi-delete </v-icon>
                    <span>Apagar</span>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </template>
      <!-- ------------- MODAL DE DELETE --------------------------------------------- -->
      <template slot="modalDelete/titleModal">Excluir o registro?</template>
      <template slot="modalDelete/contentModal">
        <p>
          Atenção! Você está prestes a realizar uma ação que não pode ser
          desfeita.
        </p>
        <p>Você realmente deseja excluir esse registro?</p>
      </template>
      <template slot="modalDelete/contentModal">
        <p>
          Atenção! Você está prestes a realizar uma ação que não pode ser
          desfeita.
        </p>
        <p>Você realmente deseja excluir esse registro?</p>
      </template>
      <template slot="modalDelete/actionsModal">
        <v-btn depressed @click="dialogDelete = false">Fechar</v-btn>
        <v-btn color="error" @click="remover()">Excluir</v-btn>
        <v-spacer class="d-none d-md-block"></v-spacer>
      </template>
      <!-- ------------- MODAL DE CADASTRO --------------------------------------------- -->
      <template slot="contentModalCrud">
        <v-row>
          <v-col cols="12" md="6">
            <v-select
              :items="itemsEquipamentos"
              item-text="nome"
              item-value="id"
              outlined
              dense
              label="Equipamento"
              id="id_componente"
              name="id_componente"
              persistent-hint
              v-model="objetoEdicao.id_componente"
              :hint="errors.first('id_componente')"
              :error="errors.collect('id_componente').length ? true : false"
              v-validate="'required'"
              data-vv-scope="plano"
              data-vv-validate-on="change"
              data-vv-as="id_componente"
            ></v-select>
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              :items="itemsSistemas"
              item-text="nome"
              item-value="id"
              outlined
              dense
              label="Sistema"
              id="id_sistema"
              name="id_sistema"
              persistent-hint
              v-model="objetoEdicao.id_sistema"
              :hint="errors.first('id_sistema')"
              :error="errors.collect('id_sistema').length ? true : false"
              v-validate="'required'"
              data-vv-scope="plano"
              data-vv-validate-on="change"
              data-vv-as="id_sistema"
            ></v-select>
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              :items="itemsPeriodicidades"
              item-text="nome"
              item-value="id"
              outlined
              dense
              label="Periodicidade"
              id="id_periodicidade"
              name="id_periodicidade"
              persistent-hint
              v-model="objetoEdicao.id_periodicidade"
              :hint="errors.first('id_periodicidade')"
              :error="errors.collect('id_periodicidade').length ? true : false"
              v-validate="'required'"
              data-vv-scope="plano"
              data-vv-validate-on="change"
              data-vv-as="id_periodicidade"
            ></v-select>
          </v-col>

          <v-col cols="12" md="6">
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
              v-model="objetoEdicao.id_fornecedor"
              :hint="errors.first('fornecedor_id')"
              :error="errors.collect('fornecedor_id').length ? true : false"
              v-validate="'required'"
              data-vv-scope="plano"
              data-vv-validate-on="change"
              data-vv-as="id_fornecedor"
            ></v-select>
          </v-col>

          <v-col cols="12" sm="12" md="12">
            <v-select
              :items="itemsStatus"
              v-model="objetoEdicao.status"
              :hint="errors.first('status')"
              :error="errors.collect('status').length ? true : false"
              v-validate="'required'"
              data-vv-scope="plano"
              data-vv-validate-on="change"
              data-vv-as="status"
              dense
              outlined
              persistent-hint
              label="Status"
            ></v-select>
          </v-col>

          <v-col cols="12">
            <v-textarea
              label="Descrição"
              outlined
              rows="3"
              id="nome"
              name="nome"
              persistent-hint
              v-model="objetoEdicao.nome"
              :hint="errors.first('nome')"
              :error="errors.collect('nome').length ? true : false"
              v-validate="'required'"
              data-vv-scope="plano"
              data-vv-validate-on="change"
              data-vv-as="nome"
            ></v-textarea>
          </v-col>
        </v-row>
      </template>
    </crud>
    <!-- ------------- MODAL DE VISUALIZAÇÃO --------------------------------------------- -->
    <modalLateral
      :show="modalLateral.show"
      :hide="toggleModalLateral"
      :title="modalLateral.title"
      :headers="
        headersModal.filter((header) => {
          return headersModal.value != 'visualizar';
        })
      "
      :item="modalLateral.item"
    >
      <template v-slot:[`item.created_at`]="{ item }">
        <span>{{ item.created_at | dateTimeFormatBr() }} </span>
      </template>
      <template v-slot:[`item.updated_at`]="{ item }">
        <span>{{ item.updated_at | dateTimeFormatBr() }} </span>
      </template>
    </modalLateral>
    <modal-atividades
      :visible="showFormAtividades"
      :item_plano="item_plano"
      @close="showFormAtividades = false"
    ></modal-atividades>
  </div>
</template>

<script>
import Crud from "@/components/Crud.vue";
import ModalLateral from "@/components/ModalLateral.vue";
import store from "@/store";
import modalAtividades from '../Atividades.vue';


export default {
  name: "plano-view",
  components: { Crud, ModalLateral, modalAtividades },
  data: () => ({
    searchTextField: "",
    dialog: false,
    loadingTable: false,
    loadingControl: {
      dataTable: false,
    },
    headers: [
      { text: "Nome", value: "nome", sortable: false, hide: "smAndDown" },
      { text: "Equipamento", value: "equipamento" },
      { text: "Sistema", value: "sistema" },
      { text: "Periodicidade", value: "periodicidade" },
      { text: "Fornecedor", value: "fornecedor" },
      { text: "Ações", value: "acao", sortable: false, align: "center" },
    ],
    headersModal: [
      {
        text: "Uuid",
        value: "uuid",
      },
      {
        text: "Nome",
        value: "nome",
      },
      {
        text: "Periodicidade",
        value: "periodicidade",
      },
      {
        text: "Sistema",
        value: "sistema",
      },
      {
        text: "Fornecedor",
        value: "fornecedor",
      },
      {
        text: "Equipamento",
        value: "equipamento",
      },
      {
        text: "Status",
        value: "status",
      },
      {
        text: "Data de início",
        value: "data_inicial",
      },
      {
        text: "Data final",
        value: "data_final",
      },
      {
        text: "Data de criação",
        value: "created_at",
      },
      {
        text: "Última alteração",
        value: "updated_at",
      },
    ],
    itemsStatus: [
      { text: "Ativo", value: "A" },
      { text: "Inativo", value: "I" },
    ],
    itemsPeriodicidades: [],
    itemsFornecedores: [],
    itemsEquipamentos: [],
    itemsSistemas: [],
    objetoSalvar: [],
    dialogDelete: false,
    loadingSalvar: false,
    dialog: false,
    showFormAtividades:false,
    modalLateral: {
      show: false,
      item: [],
      title: "",
    },
    buttonAction: false,
    objetoEdicao: {
      nome: "",
      status: "",
    },
    indexEdicao: 0,
    edicao: false,
    listaEmpreendimentos: [],
    id_plano: 0,
    item_plano: []
  }),
  methods: {
    editar(item) {
      this.edicao = true;
      this.indexEdicao = this.listaItens.indexOf(item);
      this.objetoEdicao = Object.assign({}, item);
      this.dialog = true;
    },
    resetFields() {},
    fechar() {
      this.dialog = false;
      this.edicao = false;
      this.objetoEdicao = {};
    },
    salvar() {
      this.$validator.validate("plano.*").then((result) => {
        if (result) {
          this.loadingSalvar = true;
          this.loadingTable = true;
          let url =
            this.edicao === false
              ? "/item-plano-manutencao"
              : "/item-plano-manutencao/" + this.objetoEdicao.id;
          let method = this.edicao === false ? "POST" : "PUT";
          let text =
            this.edicao === false ? "item cadastrado." : "item atualizado.";
          let erro =
            this.edicao === false
              ? "Erro ao salvar item."
              : "Erro ao atualizar item.";
          let data = this.objetoEdicao;
          data._method = method;
          data.url = url;
          data.id_plano = this.id_plano;

          this.$store
            .dispatch("items/saveOrUpdate", { data })
            .then(() => {
              this.$store.dispatch("items/fetchItems");
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
              this.fechar();
              this.loadingTable = false;
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
    remover(item, openModal = false) {
      if (openModal) {
        this.item = item;
        this.dialogDelete = true;
      } else {
        this.loadingTable = true;
        let item = this.item;
        this.indexEdicao = this.listaItens.indexOf(item);
        this.$store
          .dispatch("items/removeItem", this.item.id)
          .then((response) => {
            if (response.data.data === true) {
              this.listaItens.pop(this.indexEdicao);
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
      }
    },
    toggleModalLateral(item) {
      this.modalLateral.title = this.modalLateral.show ? "" : item.nome;
      this.modalLateral.item = this.modalLateral.show ? [] : item;
      this.modalLateral.show = this.modalLateral.show ? false : true;
    },
    resolveStatusVariant(status) {
      if (status === "P") return "warning";
      if (status === "A") return "success";
      if (status === "I") return "secondary";

      return "warning";
    },
    resolveNameStatusVariant(status) {
      if (status === "P") return "PENDENTE";
      if (status === "A") return "ATIVO";
      if (status === "I") return "INATIVO";

      return "PENDENTE";
    },
    parseDate(dates) {
      if (!dates) return null;
      const [month, day, year] = dates.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    registrarAtividade(item)
    {
      this.item_plano = item;
      this.showFormAtividades = true;
    }
  },
  computed: {
    computedHeaders() {
      return this.headers.filter(
        (h) => !h.hide || !this.$vuetify.breakpoint[h.hide]
      );
    },
    formTitle() {
      return this.edicao === false ? "Cadastrar atividade" : "Editar atividade";
    },
    listaItens: {
      get() {
        return this.$store.getters["items/getItemsList"];
      },
      set(value) {
        this.$store.dispatch("items/setItemList", value);
      },
    },
    fornecedores: {
      get() {
        return store.getters["providers/getItemsList"];
      },
      set(value) {
        store.dispatch("providers/setItemList", value);
      },
    },
    equipamentos: {
      get() {
        return this.$store.getters["components/getItemsList"];
      },
      set(value) {
        this.$store.dispatch("components/setItemList", value);
      },
    },
  },
  created() {
    this.id_plano = this.$route.params.id;
    this.$store.dispatch("items/fetchItems");
    this.$store
      .dispatch("providers/fetchItems")
      .then((resp) => (this.itemsFornecedores = resp.data.data.fornecedor));
    this.$store
      .dispatch("components/fetchItems")
      .then((resp) => (this.itemsEquipamentos = resp.data.data.componentes));
    this.$store
      .dispatch("systems/fetchItems")
      .then((resp) => (this.itemsSistemas = resp.data.data.sistemas));
    this.$store
      .dispatch("periodicidades/fetchItems")
      .then(
        (resp) => (this.itemsPeriodicidades = resp.data.data.periodicidade)
      );
  },
};
</script>

<style>
</style>