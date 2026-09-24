<script setup lang="ts">
defineProps<{
  score: number
  canUndo: boolean
}>()

const emit = defineEmits<{
  undo: []
}>()
</script>

<template>
  <footer class="bottom-bar">
    <div class="score">
      <span class="trophy">🏆</span>

      <span>
        Score:
        <strong>{{ score }}</strong>
      </span>
    </div>

    <button
      class="undo-button"
      type="button"
      :disabled="!canUndo"
      @click="emit('undo')"
    >
      <span class="undo-icon">↶</span>

      Undo
    </button>
  </footer>
</template>

<style scoped>
.bottom-bar {
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;
  z-index: 2000;
}

.score,
.undo-button {
  min-height: 48px;

  display: flex;
  align-items: center;

  gap: 10px;

  padding: 0 18px;

  border: 1px solid rgba(255, 255, 255, 0.14);

  border-radius: 999px;

  background:
    linear-gradient(
      180deg,
      rgba(18, 20, 44, 0.85),
      rgba(7, 9, 29, 0.86)
    );

  color: #fff;

  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 8px 22px rgba(0, 0, 0, 0.2);
}

.score {
  font-size: clamp(14px, 1.25vw, 18px);
}

.trophy {
  font-size: 18px;
}

.undo-button {
  font-size: 16px;

  cursor: pointer;
}

.undo-icon {
  font-size: 22px;
}

.undo-button:hover:not(:disabled) {
  border-color: rgba(153, 69, 255, 0.55);
}

.undo-button:disabled {
  opacity: 0.4;
  cursor: default;
}
</style>