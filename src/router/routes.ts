import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
    {
      // Route par défaut
      // La route / est associé au composant HomeView. C'est ce composant qui est chargé quand l'utilisateur navigue vers la page principale de l'application.
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      // Route de page "à propos"
      // Un import dynamique permet de charger un composant uniquement quand il est nécessaire. Si l'utilisateur n'a pas besoin de la page About, alors le composant AboutView ne sera pas chargé. Cela permet d'optimiser le temps de chargement de l'application.
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
      // Route 404
      // Dans l'exemple ci-dessous, le paramètre dynamique pathMatch est égal à la partie de l'url qui suit le caractère /. Par exemple, si l'url est /foo, alors le paramètre pathMatch sera égal à foo. L'expression régulière (.*)* qui suit le paramètre dynamique correspond à n'importe quel caractère. Donc, '/:pathMatch(.*)*' correspond à n'importe quel chemin de l'URL. C'est la façon dont on définit une route 404 dans Vue.js.
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
  
  export default routes