import axios from "@axios";
import store from '@/store';
export default {
  namespaced: true,
  state: {
    itemsList: [],
    item: [], 
    indexEdicao: false,
    listaEmpresas: []
   },
  getters: {
    getItemsList: state => state.itemsList,
    getItem: state => state.item,
    getIndexEdicao: state => state.indexEdicao,
    getListaEmpresas: state => state.listaEmpresas


  },
  mutations: {
    setItemList: (state, value) => { state.itemsList = value },
    setItem: (state, value) => { state.item = value },
    setIndexEdicao: (state, value) => { state.indexEdicao = value },
    setListaEmpresas: (state, value) => { state.listaEmpresas = value },    

  },
  actions: {
    fetchItems(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get('/v1/fornecedor/initialize')
          .then(response => {
            const dados = response.data.data  
  
            store.commit('providers/setItemList', dados.fornecedor)
            store.commit('providers/setListaEmpresas', dados.empresas)
            return resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchItem(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/v1/fornecedor/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addItem(ctx, dados) {
      return new Promise((resolve, reject) => {
        axios
          .post('/v1/fornecedor', dados )
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
          .put(`/v1/fornecedor/${id}`, dados)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removeItem(ctx, id ) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/v1/fornecedor/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    downloadExport(ctx, type){
      return new Promise((resolve, reject) => {
        axios
          .get(`/v1/fornecedor/export/${type}`, { responseType: 'blob' })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    }
  },
};