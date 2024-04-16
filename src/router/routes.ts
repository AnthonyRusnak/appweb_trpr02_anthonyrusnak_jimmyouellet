import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
    {
      // Route par défaut
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      // Route de page "à propos"
      path: '/scores',
      name: 'Scores',
      component: () => import('../views/ScoreboardView.vue')
    },
    {
      // Route pour aller à la page de création de personnage
      path: '/character',
      name: 'CharacterCreation',
      component: () => import('../views/CharacterCreationView.vue'),
    },
    {
      // Route pour aller à la page de jeu
      path: '/game/:playerName/:playerTitleId',
      name: 'Game',
      component: () => import('../views/GameView.vue'),
      props: true
    },
    {
      // Route 404
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
  
  export default routes