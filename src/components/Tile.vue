<script setup lang="ts">
import type { GameTile } from '../types/game'

defineProps<{
  tile: GameTile
  selected: boolean
}>()

defineEmits<{
  select: []
}>()
</script>

<template>
  <button
    class="tile"
    :class="{ selected }"
    :disabled="tile.removed"
    @click="$emit('select')"
  >
    {{ tile.type }}
  </button>
</template>

<style scoped>
.tile {
  width: 80px;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: white;
  color: black;
  font-size: 18px;
  cursor: pointer;
}

.tile.selected {
  border: 3px solid #14f195;
  transform: translateY(-4px);
}

.tile:disabled {
  visibility: hidden;
}
</style>