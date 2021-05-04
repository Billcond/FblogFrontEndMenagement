import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allArticles:[],
    curArticles:[],
    javascriptArticles:[],
    cssArticles:[],
    htmlArticles:[],
    nodeArticles:[],
    koaArticles:[],
    vueArticles:[],
    reactArticles:[],
    otherArticles:[],
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
