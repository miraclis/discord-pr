<script setup lang="ts">
defineProps<{
  pairsLeft: number
  time: string
  hintsLeft: number
  shufflesLeft: number
}>()

const emit = defineEmits<{
  menu: []
  hint: []
  shuffle: []
  settings: []
}>()
</script>

<template>
  <header class="top-bar">
    <div class="top-left">
      <button
        class="icon-button menu-button"
        type="button"
        aria-label="Open menu"
        @click="emit('menu')"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="brand">
        <div class="solana-mark">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <span class="brand-name">
          Solana Mahjong
        </span>
      </div>
    </div>

    <div class="game-info">
      <span>
        Pairs:
        <strong>{{ pairsLeft }}</strong>
      </span>

      <span class="info-divider"></span>

      <span>
        Time:
        <strong>{{ time }}</strong>
      </span>
    </div>

    <div class="top-actions">
      <button
        class="action-button"
        type="button"
        :disabled="hintsLeft <= 0"
        @click="emit('hint')"
      >
        <span class="action-icon">💡</span>

        <span class="action-label">
          Hint
        </span>

        <span class="counter">
          {{ hintsLeft }}
        </span>
      </button>

      <button
        class="action-button"
        type="button"
        :disabled="shufflesLeft <= 0"
        @click="emit('shuffle')"
      >
        <span class="action-icon">⤨</span>

        <span class="action-label">
          Shuffle
        </span>

        <span class="counter">
          {{ shufflesLeft }}
        </span>
      </button>

      <button
        class="icon-button"
        type="button"
        aria-label="Open settings"
        @click="emit('settings')"
      >
        ⚙
      </button>
    </div>
  </header>
</template>

<style scoped>
.top-bar {
  width: 100%;

  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;

  gap: 20px;

  padding: 4px 0;

  position: relative;
  z-index: 2000;
}

.top-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;

  font-weight: 800;
}

.brand-name {
  white-space: nowrap;

  font-size: clamp(15px, 1.5vw, 22px);
}

.solana-mark {
  width: 32px;

  display: flex;
  flex-direction: column;

  gap: 4px;

  transform: skewX(-18deg);
}

.solana-mark span {
  display: block;

  height: 5px;
  border-radius: 2px;

  background: linear-gradient(
    90deg,
    #14f195,
    #80ecff,
    #9945ff
  );
}

.solana-mark span:nth-child(2) {
  transform: translateX(5px);
}

.icon-button,
.action-button,
.game-info {
  min-height: 48px;

  border: 1px solid rgba(255, 255, 255, 0.13);

  background:
    linear-gradient(
      180deg,
      rgba(16, 18, 42, 0.82),
      rgba(6, 8, 27, 0.82)
    );

  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 7px 20px rgba(0, 0, 0, 0.22);

  color: white;
}

.icon-button {
  width: 48px;
  height: 48px;

  display: grid;
  place-items: center;

  flex-shrink: 0;

  padding: 0;

  border-radius: 50%;

  font-size: 20px;

  cursor: pointer;
}

.menu-button {
  gap: 4px;
  align-content: center;
}

.menu-button span {
  width: 21px;
  height: 2px;

  border-radius: 3px;

  background: #fff;
}

.game-info {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 22px;

  padding: 0 28px;

  border-radius: 999px;

  font-size: clamp(13px, 1.2vw, 18px);

  white-space: nowrap;
}

.info-divider {
  width: 1px;
  height: 18px;

  background: rgba(255, 255, 255, 0.14);
}

.top-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  gap: 10px;
}

.action-button {
  height: 48px;

  display: flex;
  align-items: center;

  gap: 8px;

  padding: 0 13px;

  border-radius: 999px;

  font-size: 15px;

  cursor: pointer;
}

.action-icon {
  font-size: 18px;
}

.counter {
  width: 24px;
  height: 24px;

  display: grid;
  place-items: center;

  border-radius: 50%;

  background: #1688ff;

  font-size: 12px;
  font-weight: 800;

  box-shadow: 0 0 12px rgba(22, 136, 255, 0.4);
}

button:hover:not(:disabled) {
  border-color: rgba(153, 69, 255, 0.55);

  background:
    linear-gradient(
      180deg,
      rgba(30, 27, 64, 0.95),
      rgba(10, 10, 34, 0.95)
    );
}

button:disabled {
  opacity: 0.45;
  cursor: default;
}

@media (max-width: 850px) {
  .top-bar {
    grid-template-columns: 1fr auto;
  }

  .game-info {
    grid-column: 1 / -1;
    grid-row: 2;

    justify-self: center;

    min-height: 40px;

    padding: 0 20px;
  }

  .top-actions {
    grid-column: 2;
    grid-row: 1;
  }

  .brand-name {
    display: none;
  }
}

@media (max-width: 520px) {
  .action-label {
    display: none;
  }

  .action-button {
    padding: 0 8px;
  }

  .top-left {
    gap: 8px;
  }
}
</style>