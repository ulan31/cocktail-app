<script setup lang="ts">
import { useRoute } from 'vue-router'
import { COCKTAIL_CODES } from '@/shared/types/cocktail'

const cocktailCodes = COCKTAIL_CODES
const route = useRoute()

const isActive = (code: string) => route.path === `/${code}`
</script>

<template>
  <nav class="menu">
    <RouterLink
      v-for="code in cocktailCodes"
      :key="code"
      :to="`/${code}`"
      class="menu-item"
      :class="{ active: isActive(code) }"
    >
      {{ code }}
    </RouterLink>
  </nav>
</template>

<style scoped lang="scss">
.menu {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
  padding: 8px 0;
  border-bottom: 1px solid #ccc;

  .menu-item {
    padding: 6px 12px;
    text-transform: capitalize;
    text-decoration: none;
    color: #333;
    border-radius: 4px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #f0f0f0;
    }

    &.active {
      background-color: #007bff;
      color: white;
    }
  }
}
</style>

