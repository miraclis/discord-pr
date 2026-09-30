<script setup lang="ts">
import type {
  KnowledgeItem
} from '../data/knowledge'

defineProps<{
  item: KnowledgeItem
  discovered: number
  total: number
}>()

defineEmits<{
  close: []
}>()
</script>

<template>
  <aside class="knowledge-card">
    <button
      class="close"
      type="button"
      aria-label="Close"
      @click="$emit('close')"
    >
      ×
    </button>

    <div class="eyebrow">
      NEW DISCOVERY
    </div>

    <div class="title-row">
      <div
        class="icon"
        :class="`tone-${item.tone}`"
      >
        {{ item.symbol }}
      </div>

      <div>
        <small>
          {{ item.category }}
        </small>

        <h3>
          {{ item.label }}
        </h3>
      </div>
    </div>

    <p>
      {{ item.description }}
    </p>

    <div class="source">
      <span>
        VERIFIED
      </span>

      {{ item.source }}
    </div>

    <div class="progress-row">
      <span>
        Discovered
      </span>

      <strong>
        {{ discovered }} / {{ total }}
      </strong>
    </div>

    <div class="progress">
      <div
        class="progress-value"
        :style="{
          width:
            `${(discovered / total) * 100}%`
        }"
      ></div>
    </div>
  </aside>
</template>

<style scoped>
.knowledge-card {
  position: fixed;

  top: 92px;
  right:
    clamp(
      14px,
      2vw,
      28px
    );

  z-index: 3000;

  width:
    min(
      350px,
      calc(100vw - 28px)
    );

  padding:
    20px 20px 17px;

  border:
    1px solid
    rgba(
      255,
      255,
      255,
      0.12
    );

  border-radius: 20px;

  color: #fff;

  background:
    linear-gradient(
      145deg,
      rgba(
        24,
        22,
        55,
        0.97
      ),
      rgba(
        8,
        10,
        30,
        0.97
      )
    );

  box-shadow:
    0 22px 60px
    rgba(
      0,
      0,
      0,
      0.48
    );

  backdrop-filter:
    blur(20px);

  animation:
    card-in
    240ms
    ease-out;
}

.close {
  position: absolute;

  right: 13px;
  top: 10px;

  width: 32px;
  height: 32px;

  border: 0;

  color:
    rgba(
      255,
      255,
      255,
      0.5
    );

  background:
    transparent;

  font-size: 24px;

  cursor: pointer;
}

.eyebrow {
  margin-bottom: 15px;

  color: #14f195;

  font-size: 9px;
  font-weight: 900;

  letter-spacing: 0.17em;
}

.title-row {
  display: flex;
  align-items: center;

  gap: 12px;
}

.icon {
  width: 47px;
  height: 47px;

  flex: 0 0 auto;

  display: grid;
  place-items: center;

  border-radius: 14px;

  background:
    rgba(
      255,
      255,
      255,
      0.07
    );

  color:
    var(
      --knowledge-accent
    );

  font-size: 22px;
  font-weight: 900;

  box-shadow:
    inset 0 0 0 1px
    rgba(
      255,
      255,
      255,
      0.07
    );
}

.title-row small {
  display: block;

  margin-bottom: 3px;

  color:
    rgba(
      255,
      255,
      255,
      0.42
    );

  font-size: 10px;

  text-transform: uppercase;

  letter-spacing: 0.08em;
}

h3 {
  margin: 0;

  font-size: 22px;

  line-height: 1;
}

p {
  margin:
    17px 0 16px;

  color:
    rgba(
      255,
      255,
      255,
      0.73
    );

  font-size: 13px;

  line-height: 1.55;
}

.source {
  padding:
    9px 11px;

  border-radius: 10px;

  color:
    rgba(
      255,
      255,
      255,
      0.5
    );

  background:
    rgba(
      255,
      255,
      255,
      0.04
    );

  font-size: 9px;
}

.source span {
  margin-right: 6px;

  color: #14f195;

  font-weight: 900;

  letter-spacing: 0.08em;
}

.progress-row {
  display: flex;

  justify-content:
    space-between;

  margin-top: 15px;

  color:
    rgba(
      255,
      255,
      255,
      0.45
    );

  font-size: 10px;
}

.progress-row strong {
  color:
    rgba(
      255,
      255,
      255,
      0.82
    );
}

.progress {
  width: 100%;
  height: 4px;

  margin-top: 7px;

  overflow: hidden;

  border-radius: 999px;

  background:
    rgba(
      255,
      255,
      255,
      0.08
    );
}

.progress-value {
  height: 100%;

  border-radius: inherit;

  background:
    linear-gradient(
      90deg,
      #14f195,
      #9945ff
    );

  transition:
    width
    300ms
    ease;
}

.tone-solana {
  --knowledge-accent:
    #14f195;
}

.tone-purple {
  --knowledge-accent:
    #9a6bff;
}

.tone-teal {
  --knowledge-accent:
    #2dd4bf;
}

.tone-gold {
  --knowledge-accent:
    #e5a832;
}

.tone-pink {
  --knowledge-accent:
    #ec4899;
}

.tone-blue {
  --knowledge-accent:
    #38a4e8;
}

.tone-green {
  --knowledge-accent:
    #47c47b;
}

.tone-orange {
  --knowledge-accent:
    #f09045;
}

@keyframes card-in {
  from {
    opacity: 0;

    transform:
      translateY(-10px)
      scale(0.97);
  }

  to {
    opacity: 1;

    transform:
      translateY(0)
      scale(1);
  }
}

@media (
  max-width: 700px
) {
  .knowledge-card {
    top: auto;

    left: 14px;
    right: 14px;
    bottom: 70px;

    width: auto;
  }
}
</style>