import Vue from 'vue'
import Vuex from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import common from './modules/common'
import user from './modules/user'
import interf from './modules/interface'


Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    common,
    user,
    interf,
  },
  mutations: {
    // 重置vuex本地储存状态
    resetStore (state) {
      Object.keys(state).forEach((key) => {
        state[key] = cloneDeep(window.SITE_CONFIG['storeState'][key])
      })
    }
  },
  actions:{
    init:function (context) {
      console.log("执行1111接口初始化")
     // return interf.init
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
