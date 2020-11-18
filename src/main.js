import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import drizzleVuePlugin from '@drizzle/vue-plugin'
import drizzleOptions from './drizzleOptions'

import App from './App.vue'
import Stake from './Stake.vue'
import Pools from './Pools.vue'
import ZGovernance from './ZGovernance.vue'


Vue.use(Vuex)
const store = new Vuex.Store({ state: {} })

Vue.use(drizzleVuePlugin, { store, drizzleOptions })

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
	{ path: '/', redirect: '/stake' },
	{ path: '/stake', component: Stake },
	{ path: '/pools', component: Pools },
	{ path: '/zgovernance', component: ZGovernance }
]

const router = new VueRouter({
  routes
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')