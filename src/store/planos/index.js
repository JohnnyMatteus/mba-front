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
          .get('/v1/plano-manutencao')
          .then(response => {
            const dados = response.data.data  
  
            store.commit('planos/setItemList', dados.planos)
            return resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchItem(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/v1/plano-manutencao/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addItem(ctx, dados) {
      return new Promise((resolve, reject) => {
        axios
          .post('/v1/plano-manutencao', dados )
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    saveOrUpdate(ctx, dados) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/v1${dados.data.url}`, dados.data )
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    editItem(ctx, {id, dados}) {
      return new Promise((resolve, reject) => {
        axios
          .put(`/v1/plano-manutencao/${id}`, dados)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removeItem(ctx, id ) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/v1/plano-manutencao/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
};