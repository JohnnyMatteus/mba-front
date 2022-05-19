import axios from "@axios";
import store from '@/store';
export default {
  namespaced: true,
  state: {
    itemsList: [],
    item: [], 
    indexEdicao: false
   },
  getters: {
    getItemsList: state => state.itemsList,
    getItem: state => state.item,
    getIndexEdicao: state => state.indexEdicao


  },
  mutations: {
    setItemList: (state, value) => { state.itemsList = value },
    setItem: (state, value) => { state.item = value },
    setIndexEdicao: (state, value) => { state.indexEdicao = value }

  },
  actions: {
    fetchItems(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get('/v1/atividade')
          .then(response => {
            const dados = response.data.data  
  
            store.commit('atividades/setItemList', dados.atividades)
            return resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchItem(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/v1/atividade/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addItem(ctx, dados) {
      return new Promise((resolve, reject) => {
        axios
          .post('/v1/atividade', dados )
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    saveOrUpdate(ctx, dados) {

      const formData = new FormData();
      formData.append('id', dados.data.id)
      formData.append('uuid', dados.data.uuid)
      formData.append('observacao', dados.data.observacao);
      formData.append('data_atividade', dados.data.data_atividade);
      formData.append('data_registro', dados.data.data_registro);
      formData.append('status', dados.data.status);
      formData.append('arquivo', dados.data.arquivo);
      formData.append('id_item_plano_manutencao', dados.data.id_item_plano_manutencao);
      formData.append('id_fornecedor', dados.data.id_fornecedor);
      formData.append('_method', dados.data._method);

      return new Promise((resolve, reject) => {
        axios
          .post(`/v1${dados.data.url}`, formData )
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    editItem(ctx, {id, dados}) {
      return new Promise((resolve, reject) => {
        axios
          .put(`/v1/atividade/${id}`, dados)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removeItem(ctx, id ) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/v1/atividade/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
};