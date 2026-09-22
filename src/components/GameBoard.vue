<script setup lang="ts">
import { ref } from 'vue'
import Tile from './Tile.vue'
import type { GameTile } from '../types/game'

const tiles = ref<GameTile[]>([
  { id: 1, type: 'SOL', removed: false },
  { id: 2, type: 'SOL', removed: false },
  { id: 3, type: 'USDC', removed: false },
  { id: 4, type: 'USDC', removed: false },
  { id: 5, type: 'BONK', removed: false },
  { id: 6, type: 'BONK', removed: false }
])

const selectedTileIds = ref<number[]>([])

function selectTile(tile: GameTile) {
  if (tile.removed) return

  // якщо натиснули ще раз на вже вибрану плитку
  if (selectedTileIds.value.includes(tile.id)) {
    selectedTileIds.value = selectedTileIds.value.filter(
      id => id !== tile.id
    )
    return
  }

  // не дозволяємо вибрати більше двох плиток
  if (selectedTileIds.value.length >= 2) {
    return
  }

  selectedTileIds.value.push(tile.id)

  // якщо вибрали дві плитки
  if (selectedTileIds.value.length === 2) {
    const firstTile = tiles.value.find(
      tile => tile.id === selectedTileIds.value[0]
    )

    const secondTile = tiles.value.find(
      tile => tile.id === selectedTileIds.value[1]
    )

    if (
      firstTile &&
      secondTile &&
      firstTile.type === secondTile.type
    ) {
      firstTile.removed = true
      secondTile.removed = true
    }

    selectedTileIds.value = []
  }
}
</script>

<template>
  <div class="board">
    <Tile
      v-for="tile in tiles"
      :key="tile.id"
      :tile="tile"
      :selected="selectedTileIds.includes(tile.id)"
      @select="selectTile(tile)"
    />
  </div>
</template>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(3, 80px);
  gap: 12px;
}
</style>