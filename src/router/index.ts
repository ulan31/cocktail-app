import { createRouter, createWebHistory, RouteLocationNormalized, RouteLocationNormalizedLoaded, NavigationGuardNext } from 'vue-router'
import CocktailDetailsPage from '@/pages/CocktailDetailsPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import { COCKTAIL_CODES } from '@/shared/types/cocktail'

const routes = [
  { path: '/', redirect: `/${COCKTAIL_CODES[0]}` },
  {
    path: '/:cocktailCode',
    component: CocktailDetailsPage,
    props: true,
    beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: NavigationGuardNext) => {
      const cocktailCode = to.params.cocktailCode as string
      if (COCKTAIL_CODES.includes(cocktailCode)) {
        next()
      } else {
        next('/404')
      }
    },
  },
  { path: '/:pathMatch(.*)*', component: NotFoundPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
