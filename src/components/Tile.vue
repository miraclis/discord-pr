<script setup lang="ts">
import type { GameTile } from '../types/game'

defineProps<{
  tile: GameTile
  selected: boolean
  free: boolean
  hinted: boolean
}>()

defineEmits<{
  select: []
}>()
</script>

<template>
  <button
    v-if="!tile.removed"
    class="tile"
    :class="[
      `tone-${tile.tone}`,
      {
        selected,
        blocked: !free,
        hinted
      }
    ]"
    :disabled="!free"
    type="button"
    @click="$emit('select')"
  >
    <span class="tile-face">
      <span class="tile-icon">
        {{ tile.symbol }}
      </span>

      <span class="tile-label">
        {{ tile.label }}
      </span>
    </span>
  </button>
</template>

<style scoped>
.tile {
  position: absolute;

  width: 11.6%;
  aspect-ratio: 0.82;

  padding: 0;

  border: 1px solid rgba(190, 169, 120, 0.8);
  border-radius: 10%;

  background:
    linear-gradient(
      145deg,
      #fff9ea 0%,
      #f4e9cd 55%,
      #dfcfaa 100%
    );

  box-shadow:
    0 7px 0 #b7a47b,
    0 12px 18px rgba(0, 0, 0, 0.38),
    inset 1px 1px 1px rgba(255, 255, 255, 0.9);

  color: #111;

  cursor: pointer;

  transform: translateY(0);

  transition:
    transform 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease,
    opacity 160ms ease;
}

.tile-face {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 8%;

  padding: 10% 6%;
}

.tile-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 42%;

  font-size: clamp(16px, 2.4vw, 34px);
  line-height: 1;

  font-weight: 900;

  color: var(--tile-accent);

  text-shadow:
    0 1px 0 rgba(255, 255, 255, 0.5);
}

.tile-label {
  max-width: 100%;

  font-size: clamp(6px, 0.8vw, 12px);
  line-height: 1;

  font-weight: 900;

  letter-spacing: 0.01em;

  text-align: center;
  text-transform: uppercase;

  white-space: nowrap;
}

.tile:hover:not(:disabled) {
  transform: translateY(-4px);

  box-shadow:
    0 9px 0 #b7a47b,
    0 16px 24px rgba(0, 0, 0, 0.45);
}

.tile.selected {
  transform: translateY(-9px);

  box-shadow:
    0 8px 0 #b7a47b,
    0 0 0 3px #14f195,
    0 0 24px rgba(20, 241, 149, 0.55),
    0 18px 26px rgba(0, 0, 0, 0.45);
}

.tile.blocked {
  filter:
    brightness(0.52)
    saturate(0.7);

  cursor: default;
}

.tile.blocked .tile-face {
  opacity: 0.82;
}

.tile.hinted {
  animation: hint-pulse 0.8s ease-in-out infinite alternate;

  box-shadow:
    0 8px 0 #b7a47b,
    0 0 0 3px #ffd84d,
    0 0 30px rgba(255, 216, 77, 0.65);
}

.tile:disabled {
  opacity: 1;
}

.tone-solana {
  --tile-accent: #6f45dd;
}

.tone-purple {
  --tile-accent: #7047bc;
}

.tone-teal {
  --tile-accent: #32a99c;
}

.tone-gold {
  --tile-accent: #d39027;
}

.tone-pink {
  --tile-accent: #d33c98;
}

.tone-blue {
  --tile-accent: #287eb7;
}

.tone-green {
  --tile-accent: #47aa71;
}

.tone-orange {
  --tile-accent: #d57936;
}

@keyframes hint-pulse {
  from {
    transform: translateY(-3px) scale(1);
  }

  to {
    transform: translateY(-8px) scale(1.035);
  }
}
</style>