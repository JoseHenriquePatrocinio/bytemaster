import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import OrcamentoView from '../views/OrcamentoView.vue';
import ServicoView from '../views/ServicoView.vue';
import ClienteView from '../views/ClienteView.vue';
import EstoqueView from '../views/EstoqueView.vue';
import RelatorioView from '../views/RelatorioView.vue';
import UsuarioView from '../views/UsuarioView.vue';
import LoginView from '../views/LoginView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/homeview',
    name: 'homeview',
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: '/orcamento',
    name: 'orcamento',
    component: OrcamentoView,
    meta: { requiresAuth: true },
  },
  {
    path: '/servico',
    name: 'servico',
    component: ServicoView,
    meta: { requiresAuth: true },
  },
  {
    path: '/cliente',
    name: 'cliente',
    component: ClienteView,
    meta: { requiresAuth: true },
  },
  {
    path: '/estoque',
    name: 'estoque',
    component: EstoqueView,
    meta: { requiresAuth: true },
  },
  {
    path: '/relatorio',
    name: 'relatorio',
    component: RelatorioView,
    meta: { requiresAuth: true },
  },
  {
    path: '/usuario',
    name: 'usuario.vue',
    component: UsuarioView,
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    
    if (isAuthenticated()) {
      next(); 
    } else {
      next({ name: 'login' }); 
    }
  } else {
    next(); 
  }
});

const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

export default router;
