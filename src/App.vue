<script setup lang="ts">
import Menu from '@/features/Menu/Menu.vue'
</script>

<template>
  <div class="main">
    <div class="main-layout">
      <aside class="main-layout__sidebar">
        <Menu />
      </aside>
      <main class="main-layout__content">
        <router-view />
      </main>
    </div>
  </div>
</template>