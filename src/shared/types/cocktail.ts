export interface Cocktail {
  idDrink: string
  strDrink: string
  strCategory: string
  strAlcoholic: string
  strGlass: string
  strInstructions: string
  strDrinkThumb: string
  [key: `strIngredient${number}`]: string | null
  [key: `strMeasure${number}`]: string | null
}

export interface CocktailResponse {
  drinks: Cocktail[] | null
}

export const COCKTAIL_CODES = ['margarita', 'mojito', 'a1', 'kir'] as const
export type CocktailCode = typeof COCKTAIL_CODES[number]