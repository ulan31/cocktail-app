import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getCocktails } from '@/entities/cocktail/api/getCocktails'
import type { Cocktail, CocktailCode } from '@/shared/types/cocktail'

export const useCocktailStore = defineStore('cocktail', () => {
  const cocktails = ref<Record<string, Cocktail[]>>({})
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchCocktails = async (code: CocktailCode) => {
    if (cocktails.value[code]) return

    loading.value = true
    error.value = null
    try {
      const res = await getCocktails(code)
      cocktails.value[code] = res.drinks || []
    } catch (err) {
      error.value = 'Ошибка загрузки'
    } finally {
      loading.value = false
    }
  }

  return {
    cocktails,
    loading,
    error,
    fetchCocktails,
  }
})
