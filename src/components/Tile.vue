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

  border:
    1px solid
    rgba(190, 169, 120, 0.8);

  border-radius: 10%;

  background:
    linear-gradient(
      145deg,
      #fff9ea 0%,
      #f4e9cd 55%,
      #dfcfaa 100%
    );

  box-shadow:
    0 6px 0 #b7a47b,
    0 10px 16px rgba(0, 0, 0, 0.38);

  color: #111;

  cursor: pointer;

  overflow: hidden;

  /* Важливо:
     тепер текст може масштабуватися
     від ширини самої плитки */
  container-type: inline-size;

  transition:
    transform 160ms ease,
    filter 160ms ease,
    box-shadow 160ms ease;
}

.tile-face {
  position: absolute;
  inset: 0;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: 5%;

  padding:
    10%
    7%
    8%;

  overflow: hidden;
}

.tile-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  flex: 0 0 auto;

  color: var(--tile-accent);

  /*
    cqw = % від ширини САМОЇ плитки.
    Тому іконка реально зменшується
    разом із плиткою.
  */
  font-size: clamp(
    11px,
    30cqw,
    32px
  );

  line-height: 0.9;

  font-weight: 900;

  text-align: center;

  white-space: nowrap;
}

.tile-label {
  display: block;

  width: 100%;
  max-width: 100%;

  flex: 0 0 auto;

  /*
    Головний фікс написів.
  */
  font-size: clamp(
    4px,
    11cqw,
    10px
  );

  line-height: 1;

  font-weight: 900;

  text-transform: uppercase;
  text-align: center;

  letter-spacing: -0.02em;

  color: #111;

  white-space: normal;

  overflow-wrap: anywhere;

  /*
    Не даємо назві вилізти
    за нижню частину плитки.
  */
  max-height: 2em;

  overflow: hidden;
}

/* ------------------------------
   INTERACTION
------------------------------ */

.tile:hover:not(:disabled) {
  transform:
    translateY(-3px);
}

.tile.selected {
  transform:
    translateY(-7px);

  box-shadow:
    0 7px 0 #b7a47b,
    0 0 0 3px #14f195,
    0 0 22px
      rgba(20, 241, 149, 0.5);
}

.tile.blocked {
  filter:
    brightness(0.52)
    saturate(0.7);

  cursor: default;
}

.tile.hinted {
  box-shadow:
    0 7px 0 #b7a47b,
    0 0 0 3px #ffd84d,
    0 0 26px
      rgba(255, 216, 77, 0.6);
}

.tile:disabled {
  opacity: 1;
}

/* ------------------------------
   COLORS
------------------------------ */

.tone-solana {
  --tile-accent: #6f45dd;
}

.tone-purple {
  --tile-accent: #7047bc;
}

.tone-teal {
  --tile-accent: #268d82;
}

.tone-gold {
  --tile-accent: #b47c20;
}

.tone-pink {
  --tile-accent: #bd327f;
}

.tone-blue {
  --tile-accent: #2474a8;
}

.tone-green {
  --tile-accent: #378a5b;
}

.tone-orange {
  --tile-accent: #bf652c;
}
</style>