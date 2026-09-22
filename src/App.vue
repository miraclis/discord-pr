<script setup lang="ts">
import GameBoard from './components/GameBoard.vue'
</script>

<template>
  <main>
    <h1>Solong</h1>
    <GameBoard />
  </main>
</template>

<style scoped>
main {
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
}
</style>