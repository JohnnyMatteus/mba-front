import axios from "@axios";
import store from '@/store';
export default {
  namespaced: true,
  state: {
    itemsList: [],
    item: [], 
    indexEdicao: false,
    loading: false
   },
  getters: {
    getItemsList: state => state.itemsList,
    getItem: state => state.item,
    getIndexEdicao: state => state.indexEdicao,
    getLoading: state => state.loading

  },
  mutations: {
    setItemList: (state, value) => { state.itemsList = value },
    setItem: (state, value) => { state.item = value },
    setIndexEdicao: (state, value) => { state.indexEdicao = value }, 
    setLoading: (state, value) => { state.loading = value } 

  },
  actions: {
    fetchItems(ctx) {
      store.commit('planos/setLoading', true)
      return new Promise((resolve, reject) => {
        axios
          .get('/v1/plano-manutencao')
          .then(response => {
            const dados = response.data.data  
  
            store.commit('planos/setItemList', dados.planos)
            store.commit('planos/setLoading', false)

            return resolve(response)
          })
          .catch(error => {
            window.location.reload()
            reject(error)
          })
      })
    },
    fetchItem(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/v1/plano-manutencao/${id}`)
          .then(response => resolve(response))
                    .catch(error => {
            window.location.reload()
            reject(error)
          })
      })
    },
    addItem(ctx, dados) {
      return new Promise((resolve, reject) => {
        axios
          .post('/v1/plano-manutencao', dados )
          .then(response => resolve(response))
                    .catch(error => {
            window.location.reload()
            reject(error)
          })
      })
    },
    saveOrUpdate(ctx, dados) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/v1${dados.data.url}`, dados.data )
          .then(response => resolve(response))
                    .catch(error => {
            window.location.reload()
            reject(error)
          })
      })
    },
    editItem(ctx, {id, dados}) {
      return new Promise((resolve, reject) => {
        axios
          .put(`/v1/plano-manutencao/${id}`, dados)
          .then(response => resolve(response))
                    .catch(error => {
            window.location.reload()
            reject(error)
          })
      })
    },
    removeItem(ctx, id ) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/v1/plano-manutencao/${id}`)
          .then(response => resolve(response))
                    .catch(error => {
            window.location.reload()
            reject(error)
          })
      })
    },
  },
};