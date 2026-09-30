<script setup lang="ts">
import { ref } from 'vue'

import StartScreen from './components/StartScreen.vue'
import GameBoard from './components/GameBoard.vue'

type Screen =
  | 'start'
  | 'game'

const screen =
  ref<Screen>('start')

function startGame() {
  screen.value = 'game'
}
</script>

<template>
  <StartScreen
    v-if="screen === 'start'"
    @play="startGame"
  />

  <GameBoard
    v-else
  />
</template>