import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OrcamentoView from '../views/OrcamentoView.vue'
import ServicoView from '../views/ServicoView.vue'
import ClienteView from '../views/ClienteView.vue'
import EstoqueView from '../views/EstoqueView.vue'
import RelatorioView from '../views/RelatorioView.vue'
import UsuarioView from '../views/UsuarioView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homeview',
    component: HomeView
  },
  {
    path: '/orcamento',
    name: 'orcamento',
    component: OrcamentoView
  },
  {
    path: '/servico',
    name: 'servico',
    component: ServicoView
  },
  {
    path: '/cliente',
    name: 'cliente',
    component: ClienteView
  },
  {
    path: '/estoque',
    name: 'estoque',
    component: EstoqueView
  },
  {
    path: '/relatorio',
    name: 'relatorio',
    component: RelatorioView
  },
  {
    path: '/usuario',
    name: 'usuario.vue',
    component: UsuarioView
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
