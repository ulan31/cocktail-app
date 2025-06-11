import { api } from '@/shared/api/http'
import type { CocktailResponse } from '@/shared/types/cocktail'

export const getCocktails = async (code: string): Promise<CocktailResponse> => {
  const { data } = await api.get(`/search.php?s=${code}`)
  return data
}
