<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useCocktailStore } from '@/entities/cocktail/model/useCocktailStore'
import { CocktailCode } from '@/shared/types/cocktail'

const props = defineProps<{
  cocktailCode: CocktailCode
}>()

const store = useCocktailStore()

const loadCocktails = (code: CocktailCode) => {
  store.fetchCocktails(code)
}

onMounted(() => {
  if (props.cocktailCode) {
    loadCocktails(props.cocktailCode)
  }
})

watch(
  () => props.cocktailCode,
  (newCode) => {
    if (newCode) {
      loadCocktails(newCode)
    }
  },
)
</script>

<template>
  <div class="cocktail-page">
    <div v-if="store.loading" class="cocktail-page__message cocktail-page__message--loading">Загрузка коктейлей...</div>
    <div v-else-if="store.error" class="cocktail-page__message cocktail-page__message--error">{{ store.error }}</div>
    <div v-else-if="!store.cocktails[props.cocktailCode] || store.cocktails[props.cocktailCode].length === 0" class="cocktail-page__message cocktail-page__message--no-data">
      Нет данных по коктейлю "{{ props.cocktailCode }}".
    </div>
    <div v-else class="cocktail-list">
      <div v-for="cocktail in store.cocktails[props.cocktailCode]" :key="cocktail.idDrink" class="cocktail-card">
        <h2 class="cocktail-card__title">{{ cocktail.strDrink }}</h2>
        <div class="cocktail-card__details">
          <div class="cocktail-card__info">
            <p class="cocktail-card__text"><strong>Категория:</strong> {{ cocktail.strCategory }}</p>
            <p class="cocktail-card__text"><strong>Алкоголь:</strong> {{ cocktail.strAlcoholic }}</p>
            <p class="cocktail-card__text"><strong>Бокал:</strong> {{ cocktail.strGlass }}</p>

            <h3 class="cocktail-card__subtitle">Инструкции:</h3>
            <p class="cocktail-card__text">{{ cocktail.strInstructions }}</p>

            <h3 class="cocktail-card__subtitle">Список ингредиентов:</h3>
            <ul class="cocktail-card__ingredients-list">
              <template v-for="i in 15" :key="i">
                <li v-if="cocktail[`strMeasure${i}`] && cocktail[`strIngredient${i}`]" class="cocktail-card__ingredient-item">
                  {{ cocktail[`strMeasure${i}`] }} {{ cocktail[`strIngredient${i}`] }}
                </li>
              </template>
            </ul>
          </div>
          <div class="cocktail-card__image-container">
            <img :src="cocktail.strDrinkThumb" :alt="cocktail.strDrink" loading="lazy" class="cocktail-card__image">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cocktail-page {
  padding: 20px;

  &__message {
    text-align: center;
    font-size: 1.2em;
    padding: 20px;
    border-radius: 8px;
    margin-top: 20px;

    &--loading {
      background-color: #e0f7fa;
      color: #00796b;
    }

    &--error {
      background-color: #ffe0b2;
      color: #ef6c00;
    }

    &--no-data {
      background-color: #fce4ec;
      color: #c2185b;
    }
  }
}

.cocktail-list {
  display: grid;
  gap: 40px;
}

.cocktail-card {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

  &__title {
    font-size: 2em;
    margin-bottom: 20px;
    color: #2c3e50;
    text-align: center;

    @media (max-width: 768px) {
      font-size: 1.8em;
    }
  }

  &__details {
    display: flex;
    gap: 30px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
    }
  }

  &__info {
    flex: 1;
    min-width: 280px;

    @media (max-width: 768px) {
      min-width: unset;
      width: 100%;
    }
  }

  &__text {
    margin-bottom: 10px;
    line-height: 1.8;
    color: #555;

    strong {
      color: #333;
    }
  }

  &__subtitle {
    font-size: 1.4em;
    margin-top: 25px;
    margin-bottom: 15px;
    color: #34495e;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
  }

  &__ingredients-list {
    list-style: none;
    padding: 0;
  }

  &__ingredient-item {
    margin-bottom: 8px;
    padding-left: 0;
    color: #666;
  }

  &__image-container {
    flex-shrink: 0;
    width: 250px;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
      width: 100%;
      max-width: 300px;
      height: auto;
      margin-bottom: 20px;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
}
</style>