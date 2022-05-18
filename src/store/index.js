import appConfigStoreModule from '@core/@app-config/appConfigStoreModule'
import Vue from 'vue'
import Vuex from 'vuex'
import app from './app'
import auth from './auth'
import users from './users'
import module from './modules/snackBarModule'
import providers from './providers'
import systems from './systems'
import components from './components'
import empresas from './empresas'
import empreendimentos from './empreendimentos'
import planos from './planos'
import items from './items'
import periodicidades from './periodicidades'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    appConfig: appConfigStoreModule,
    app,
    auth,
    module,
    empresas,
    empreendimentos,
    planos,
    users,
    providers,
    systems,
    components,
    items,
    periodicidades
  },
})
