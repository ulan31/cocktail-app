import { setActivePinia, createPinia } from 'pinia'
import { useCocktailStore } from './useCocktailStore'
import { getCocktails } from '../api/getCocktails'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { CocktailCode, CocktailResponse } from '@/shared/types/cocktail'

vi.mock('../api/getCocktails', () => ({
  getCocktails: vi.fn(),
}))

const mockCocktailData: CocktailResponse = {
  drinks: [
    {
      idDrink: '11007',
      strDrink: 'Margarita',
      strCategory: 'Ordinary Drink',
      strAlcoholic: 'Alcoholic',
      strGlass: 'Cocktail glass',
      strInstructions: 'Rub the rim of a cocktail glass with the lime slice to make the salt stick to it. Take care not to get salt inside the glass. Shake the tequila, Cointreau and lime juice with ice in a cocktail shaker. Strain into the salt-rimmed glass. Garnish with a slice of lime. (Optional: use a shaker with a strainer already built in.)',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/5nfw7a1606774696.jpg',
      strIngredient1: 'Tequila',
      strMeasure1: '1 1/2 oz ',
      strIngredient2: 'Triple sec',
      strMeasure2: '1/2 oz ',
      strIngredient3: 'Lime juice',
      strMeasure3: '1 oz ',
      strIngredient4: null,
      strMeasure4: null,
      strImageSource: null,
      strImageAttribution: null,
      strCreativeCommonsConfirmed: 'No',
      dateModified: '2016-11-04 09:17:09'
    },
  ],
}

describe('useCocktailStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('should initialize with empty cocktails and no loading/error', () => {
    const store = useCocktailStore()
    expect(store.cocktails).toEqual({})
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('should fetch cocktails and update state', async () => {
    ;(getCocktails as vi.Mock).mockResolvedValueOnce(mockCocktailData)

    const store = useCocktailStore()
    const cocktailCode: CocktailCode = 'margarita'

    await store.fetchCocktails(cocktailCode)

    expect(getCocktails).toHaveBeenCalledTimes(1)
    expect(getCocktails).toHaveBeenCalledWith(cocktailCode)
    expect(store.cocktails[cocktailCode]).toEqual(mockCocktailData.drinks)
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('should not re-fetch cocktails if data already exists', async () => {
    ;(getCocktails as vi.Mock).mockResolvedValueOnce(mockCocktailData)

    const store = useCocktailStore()
    const cocktailCode: CocktailCode = 'margarita'

    await store.fetchCocktails(cocktailCode)
    await store.fetchCocktails(cocktailCode)

    expect(getCocktails).toHaveBeenCalledTimes(1)
    expect(store.cocktails[cocktailCode]).toEqual(mockCocktailData.drinks)
  })

  it('should handle API errors', async () => {
    // Мокаем ошибку API
    ;(getCocktails as vi.Mock).mockRejectedValueOnce(new Error('Network error'))

    const store = useCocktailStore()
    const cocktailCode: CocktailCode = 'mojito'

    await store.fetchCocktails(cocktailCode)

    expect(getCocktails).toHaveBeenCalledTimes(1)
    expect(getCocktails).toHaveBeenCalledWith(cocktailCode)
    expect(store.cocktails[cocktailCode]).toBeUndefined()
    expect(store.loading).toBe(false)
    expect(store.error).toBe('Ошибка загрузки')
  })
})
