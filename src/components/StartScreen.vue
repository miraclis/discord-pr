<script setup lang="ts">
defineEmits<{
  play: []
}>()
</script>

<template>
  <main class="start-screen">
    <div class="background-grid"></div>
    <div class="orb orb-left"></div>
    <div class="orb orb-right"></div>

    <div class="solana-shape" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </div>

    <section class="hero">
      <div class="eyebrow">
        <span class="eyebrow-dot"></span>
        DISCORD ACTIVITY
      </div>

      <div class="brand-mark">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <p class="project-name">
        SOLONG
      </p>

      <h1>
        Solong
      </h1>

      <p class="description">
        Match tiles, discover the Solana ecosystem
        and clear the board.
      </p>

      <button
        class="play-button"
        type="button"
        @click="$emit('play')"
      >
        <span class="play-icon">
          ▶
        </span>

        Play now
      </button>

      <div class="features">
        <div class="feature">
          <span class="feature-icon">
            ◈
          </span>

          <div>
            <strong>
              Match
            </strong>

            <small>
              Find free pairs
            </small>
          </div>
        </div>

        <div class="feature">
          <span class="feature-icon">
            ✦
          </span>

          <div>
            <strong>
              Discover
            </strong>

            <small>
              Explore Web3
            </small>
          </div>
        </div>

        <div class="feature">
          <span class="feature-icon">
            ◉
          </span>

          <div>
            <strong>
              Complete
            </strong>

            <small>
              Clear the board
            </small>
          </div>
        </div>
      </div>
    </section>

    <footer>
      Built for the Solana ecosystem
    </footer>
  </main>
</template>

<style scoped>
.start-screen {
  position: relative;

  width: 100%;
  min-height: 100dvh;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;

  padding:
    clamp(24px, 5vw, 60px);

  color: #ffffff;

  background:
    radial-gradient(
      circle at 50% 44%,
      rgba(79, 40, 170, 0.32),
      transparent 34%
    ),
    radial-gradient(
      circle at 84% 50%,
      rgba(20, 241, 149, 0.09),
      transparent 28%
    ),
    linear-gradient(
      135deg,
      #070818 0%,
      #090524 48%,
      #060b20 100%
    );
}

.background-grid {
  position: absolute;
  inset: 0;

  pointer-events: none;

  opacity: 0.16;

  background-image:
    radial-gradient(
      rgba(255, 255, 255, 0.55) 0.7px,
      transparent 0.7px
    );

  background-size:
    30px 30px;

  mask-image:
    radial-gradient(
      circle at center,
      black,
      transparent 72%
    );
}

.orb {
  position: absolute;

  border-radius: 50%;

  filter: blur(100px);

  pointer-events: none;
}

.orb-left {
  width: 380px;
  height: 380px;

  left: -100px;
  bottom: -100px;

  background:
    rgba(153, 69, 255, 0.18);
}

.orb-right {
  width: 340px;
  height: 340px;

  right: -80px;
  top: 8%;

  background:
    rgba(20, 241, 149, 0.09);
}

.solana-shape {
  position: absolute;

  width:
    clamp(
      180px,
      24vw,
      360px
    );

  right: 4%;
  top: 50%;

  opacity: 0.055;

  transform:
    translateY(-50%)
    rotate(-4deg)
    skewX(-14deg);
}

.solana-shape span,
.brand-mark span {
  display: block;

  border-radius: 5px;

  background:
    linear-gradient(
      90deg,
      #14f195,
      #9945ff
    );
}

.solana-shape span {
  height:
    clamp(
      30px,
      4vw,
      56px
    );

  margin:
    clamp(
      16px,
      2vw,
      27px
    )
    0;
}

.hero {
  position: relative;
  z-index: 2;

  width:
    min(
      100%,
      720px
    );

  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;
}

.eyebrow {
  display: inline-flex;
  align-items: center;

  gap: 9px;

  margin-bottom: 28px;

  padding:
    8px 13px;

  border:
    1px solid
    rgba(255, 255, 255, 0.1);

  border-radius: 999px;

  color:
    rgba(255, 255, 255, 0.62);

  background:
    rgba(255, 255, 255, 0.035);

  font-size: 11px;
  font-weight: 800;

  letter-spacing: 0.15em;
}

.eyebrow-dot {
  width: 7px;
  height: 7px;

  border-radius: 50%;

  background: #14f195;

  box-shadow:
    0 0 12px
    rgba(20, 241, 149, 0.8);
}

.brand-mark {
  width: 68px;

  margin-bottom: 18px;

  transform:
    skewX(-14deg);
}

.brand-mark span {
  height: 7px;

  margin: 6px 0;
}

.brand-mark span:nth-child(2) {
  transform:
    translateX(8px);
}

.project-name {
  margin:
    0 0 6px;

  color: #14f195;

  font-size: 12px;
  font-weight: 900;

  letter-spacing: 0.32em;
}

h1 {
  margin: 0;

  font-size:
    clamp(
      44px,
      7.5vw,
      86px
    );

  line-height: 0.95;

  font-weight: 900;

  letter-spacing: -0.06em;

  text-shadow:
    0 15px 40px
    rgba(0, 0, 0, 0.35);
}

h1 span {
  display: block;

  margin-top: 7px;

  color: transparent;

  background:
    linear-gradient(
      90deg,
      #14f195 8%,
      #56d5d7 42%,
      #9945ff 88%
    );

  background-clip: text;
  -webkit-background-clip: text;
}

.description {
  width:
    min(
      100%,
      500px
    );

  margin:
    25px auto 0;

  color:
    rgba(255, 255, 255, 0.63);

  font-size:
    clamp(
      14px,
      1.6vw,
      18px
    );

  line-height: 1.65;
}

.play-button {
  min-width: 190px;

  margin-top: 34px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 11px;

  padding:
    15px 26px;

  border: 0;
  border-radius: 14px;

  color: #070912;

  background:
    linear-gradient(
      100deg,
      #14f195,
      #66d9c8
    );

  box-shadow:
    0 12px 35px
    rgba(20, 241, 149, 0.18);

  font-size: 15px;
  font-weight: 900;

  cursor: pointer;

  transition:
    transform 160ms ease,
    box-shadow 160ms ease,
    filter 160ms ease;
}

.play-button:hover {
  transform:
    translateY(-3px);

  filter:
    brightness(1.05);

  box-shadow:
    0 16px 42px
    rgba(20, 241, 149, 0.28);
}

.play-button:active {
  transform:
    translateY(0);
}

.play-icon {
  font-size: 12px;
}

.features {
  width: 100%;

  margin-top: 55px;

  display: grid;
  grid-template-columns:
    repeat(3, 1fr);

  gap: 12px;
}

.feature {
  min-width: 0;

  display: flex;
  align-items: center;

  gap: 12px;

  padding:
    15px 17px;

  text-align: left;

  border:
    1px solid
    rgba(255, 255, 255, 0.08);

  border-radius: 15px;

  background:
    rgba(255, 255, 255, 0.035);

  backdrop-filter:
    blur(12px);
}

.feature-icon {
  width: 35px;
  height: 35px;

  flex: 0 0 auto;

  display: grid;
  place-items: center;

  border-radius: 10px;

  color: #14f195;

  background:
    rgba(20, 241, 149, 0.08);

  font-size: 18px;
}

.feature div {
  min-width: 0;

  display: flex;
  flex-direction: column;

  gap: 3px;
}

.feature strong {
  font-size: 13px;
}

.feature small {
  color:
    rgba(255, 255, 255, 0.43);

  font-size: 11px;
}

footer {
  position: absolute;

  left: 50%;
  bottom: 20px;

  transform:
    translateX(-50%);

  color:
    rgba(255, 255, 255, 0.28);

  font-size: 10px;

  letter-spacing: 0.08em;

  white-space: nowrap;
}

@media (
  max-width: 620px
) {
  .start-screen {
    padding:
      30px 20px
      60px;
  }

  .eyebrow {
    margin-bottom: 20px;
  }

  .features {
    margin-top: 36px;

    grid-template-columns: 1fr;
  }

  .feature {
    padding:
      11px 14px;
  }

  .solana-shape {
    right: -70px;
  }
}

@media (
  max-height: 650px
) {
  .brand-mark {
    margin-bottom: 10px;
  }

  .eyebrow {
    margin-bottom: 13px;
  }

  .description {
    margin-top: 15px;
  }

  .play-button {
    margin-top: 20px;
  }

  .features {
    margin-top: 24px;
  }

  footer {
    display: none;
  }
}
</style>