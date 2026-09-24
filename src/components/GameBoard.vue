<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref
} from 'vue'

import Tile from './Tile.vue'
import TopBar from './TopBar.vue'
import BottomBar from './BottomBar.vue'

import type {
  GameTile,
  MatchHistoryEntry,
  TileTone
} from '../types/game'

interface Brand {
  type: string
  label: string
  symbol: string
  tone: TileTone
}

interface TilePosition {
  x: number
  y: number
  z: number
}

type Panel = 'menu' | 'settings' | null

const brands: Brand[] = [
  {
    type: 'SOL',
    label: 'Solana',
    symbol: '≋',
    tone: 'solana'
  },
  {
    type: 'PHANTOM',
    label: 'Phantom',
    symbol: '●',
    tone: 'purple'
  },
  {
    type: 'JUPITER',
    label: 'Jupiter',
    symbol: 'JUP',
    tone: 'teal'
  },
  {
    type: 'BONK',
    label: 'Bonk',
    symbol: 'B',
    tone: 'orange'
  },
  {
    type: 'RAYDIUM',
    label: 'Raydium',
    symbol: 'R',
    tone: 'purple'
  },
  {
    type: 'ORCA',
    label: 'Orca',
    symbol: '◒',
    tone: 'gold'
  },
  {
    type: 'JITO',
    label: 'Jito',
    symbol: 'J',
    tone: 'teal'
  },
  {
    type: 'PYTH',
    label: 'Pyth',
    symbol: 'P',
    tone: 'purple'
  },
  {
    type: 'TENSOR',
    label: 'Tensor',
    symbol: '↑',
    tone: 'blue'
  },
  {
    type: 'MAGIC_EDEN',
    label: 'Magic Eden',
    symbol: 'MΞ',
    tone: 'pink'
  },
  {
    type: 'DRIFT',
    label: 'Drift',
    symbol: 'D',
    tone: 'purple'
  },
  {
    type: 'HELIUS',
    label: 'Helius',
    symbol: '☀',
    tone: 'orange'
  },
  {
    type: 'MARGINFI',
    label: 'MarginFi',
    symbol: 'M',
    tone: 'blue'
  },
  {
    type: 'METAPLEX',
    label: 'Metaplex',
    symbol: 'M',
    tone: 'purple'
  },
  {
    type: 'WORMHOLE',
    label: 'Wormhole',
    symbol: '◎',
    tone: 'blue'
  },
  {
    type: 'VALIDATOR',
    label: 'Validator',
    symbol: '▤',
    tone: 'purple'
  },
  {
    type: 'PORTAL',
    label: 'Portal',
    symbol: '◉',
    tone: 'purple'
  },
  {
    type: 'SERUM',
    label: 'Serum',
    symbol: '◍',
    tone: 'teal'
  },
  {
    type: 'SQUADS',
    label: 'Squads',
    symbol: 'SQ',
    tone: 'green'
  },
  {
    type: 'MARINADE',
    label: 'Marinade',
    symbol: 'M',
    tone: 'green'
  },
  {
    type: 'BACKPACK',
    label: 'Backpack',
    symbol: 'BP',
    tone: 'purple'
  },
  {
    type: 'STAR_ATLAS',
    label: 'Star Atlas',
    symbol: 'A',
    tone: 'blue'
  },
  {
    type: 'STEP',
    label: 'Step',
    symbol: 'S',
    tone: 'green'
  },
  {
    type: 'SAFE',
    label: 'Safe',
    symbol: '□',
    tone: 'green'
  }
]

const pairPositions: Array<
  [TilePosition, TilePosition]
> = [
  // BASE LAYER
  [
    { x: 2, y: 4, z: 0 },
    { x: 12, y: 4, z: 0 }
  ],
  [
    { x: 4, y: 4, z: 0 },
    { x: 10, y: 4, z: 0 }
  ],
  [
    { x: 6, y: 4, z: 0 },
    { x: 8, y: 4, z: 0 }
  ],

  [
    { x: 0, y: 6, z: 0 },
    { x: 14, y: 6, z: 0 }
  ],
  [
    { x: 2, y: 6, z: 0 },
    { x: 12, y: 6, z: 0 }
  ],
  [
    { x: 4, y: 6, z: 0 },
    { x: 10, y: 6, z: 0 }
  ],
  [
    { x: 6, y: 6, z: 0 },
    { x: 8, y: 6, z: 0 }
  ],

  [
    { x: 0, y: 8, z: 0 },
    { x: 14, y: 8, z: 0 }
  ],
  [
    { x: 2, y: 8, z: 0 },
    { x: 12, y: 8, z: 0 }
  ],
  [
    { x: 4, y: 8, z: 0 },
    { x: 10, y: 8, z: 0 }
  ],
  [
    { x: 6, y: 8, z: 0 },
    { x: 8, y: 8, z: 0 }
  ],

  [
    { x: 2, y: 10, z: 0 },
    { x: 12, y: 10, z: 0 }
  ],
  [
    { x: 4, y: 10, z: 0 },
    { x: 10, y: 10, z: 0 }
  ],
  [
    { x: 6, y: 10, z: 0 },
    { x: 8, y: 10, z: 0 }
  ],

  // SECOND LAYER
  [
    { x: 3, y: 5, z: 1 },
    { x: 13, y: 5, z: 1 }
  ],
  [
    { x: 5, y: 5, z: 1 },
    { x: 11, y: 5, z: 1 }
  ],
  [
    { x: 7, y: 5, z: 1 },
    { x: 9, y: 5, z: 1 }
  ],

  [
    { x: 3, y: 7, z: 1 },
    { x: 13, y: 7, z: 1 }
  ],
  [
    { x: 5, y: 7, z: 1 },
    { x: 11, y: 7, z: 1 }
  ],
  [
    { x: 7, y: 7, z: 1 },
    { x: 9, y: 7, z: 1 }
  ],

  // TOP LAYER
  [
    { x: 6, y: 4, z: 2 },
    { x: 12, y: 4, z: 2 }
  ],
  [
    { x: 8, y: 4, z: 2 },
    { x: 10, y: 4, z: 2 }
  ],
  [
    { x: 7, y: 6, z: 2 },
    { x: 13, y: 6, z: 2 }
  ],
  [
    { x: 9, y: 6, z: 2 },
    { x: 11, y: 6, z: 2 }
  ]
]

function createInitialTiles(): GameTile[] {
  const result: GameTile[] = []

  let id = 1

  pairPositions.forEach((positions, index) => {
    const brand = brands[index]

    positions.forEach(position => {
      result.push({
        id,
        type: brand.type,
        label: brand.label,
        symbol: brand.symbol,
        tone: brand.tone,

        x: position.x,
        y: position.y,
        z: position.z,

        removed: false
      })

      id++
    })
  })

  return result
}

const tiles = ref<GameTile[]>(createInitialTiles())

const selectedTileIds = ref<number[]>([])
const hintedTileIds = ref<number[]>([])

const score = ref(0)
const elapsedSeconds = ref(0)

const hintsLeft = ref(3)
const shufflesLeft = ref(3)

const history = ref<MatchHistoryEntry[]>([])

const panel = ref<Panel>(null)

const reducedMotion = ref(false)

const boardLocked = ref(false)

let timerId: number | undefined
let selectionTimeoutId: number | undefined
let hintTimeoutId: number | undefined

const activeTiles = computed(() =>
  tiles.value.filter(tile => !tile.removed)
)

const pairsLeft = computed(() =>
  activeTiles.value.length / 2
)

const isCompleted = computed(() =>
  activeTiles.value.length === 0
)

const canUndo = computed(() =>
  history.value.length > 0
)

const formattedTime = computed(() => {
  const minutes = Math.floor(
    elapsedSeconds.value / 60
  )

  const seconds =
    elapsedSeconds.value % 60

  return `${String(minutes).padStart(2, '0')}:${String(
    seconds
  ).padStart(2, '0')}`
})

function rectanglesOverlap(
  first: GameTile,
  second: GameTile
) {
  const firstLeft = first.x
  const firstRight = first.x + 2
  const firstTop = first.y
  const firstBottom = first.y + 2

  const secondLeft = second.x
  const secondRight = second.x + 2
  const secondTop = second.y
  const secondBottom = second.y + 2

  return (
    firstLeft < secondRight &&
    firstRight > secondLeft &&
    firstTop < secondBottom &&
    firstBottom > secondTop
  )
}

function verticalOverlap(
  first: GameTile,
  second: GameTile
) {
  return (
    first.y < second.y + 2 &&
    first.y + 2 > second.y
  )
}

function isTileFree(tile: GameTile): boolean {
  if (tile.removed) {
    return false
  }

  const hasTileAbove = tiles.value.some(other =>
    !other.removed &&
    other.id !== tile.id &&
    other.z > tile.z &&
    rectanglesOverlap(tile, other)
  )

  if (hasTileAbove) {
    return false
  }

  const blockedOnLeft = tiles.value.some(other =>
    !other.removed &&
    other.id !== tile.id &&
    other.z === tile.z &&
    other.x + 2 === tile.x &&
    verticalOverlap(tile, other)
  )

  const blockedOnRight = tiles.value.some(other =>
    !other.removed &&
    other.id !== tile.id &&
    other.z === tile.z &&
    tile.x + 2 === other.x &&
    verticalOverlap(tile, other)
  )

  return !blockedOnLeft || !blockedOnRight
}

function getTileStyle(tile: GameTile) {
  return {
    left: `${
      4 +
      tile.x * 5.65 +
      tile.z * 0.35
    }%`,

    top: `${
      2 +
      tile.y * 7.25 -
      tile.z * 1
    }%`,

    zIndex:
      tile.z * 100 +
      tile.y * 10 +
      tile.x
  }
}

function clearSelectionTimer() {
  if (selectionTimeoutId !== undefined) {
    window.clearTimeout(selectionTimeoutId)

    selectionTimeoutId = undefined
  }
}

function clearHintTimer() {
  if (hintTimeoutId !== undefined) {
    window.clearTimeout(hintTimeoutId)

    hintTimeoutId = undefined
  }
}

function selectTile(tile: GameTile) {
  if (
    boardLocked.value ||
    !isTileFree(tile)
  ) {
    return
  }

  if (
    selectedTileIds.value.includes(tile.id)
  ) {
    selectedTileIds.value = []

    return
  }

  if (selectedTileIds.value.length === 0) {
    selectedTileIds.value = [tile.id]

    return
  }

  const firstTile = tiles.value.find(
    item =>
      item.id === selectedTileIds.value[0]
  )

  if (!firstTile) {
    selectedTileIds.value = []

    return
  }

  selectedTileIds.value = [
    firstTile.id,
    tile.id
  ]

  boardLocked.value = true

  if (firstTile.type === tile.type) {
    const scoreBefore = score.value

    selectionTimeoutId =
      window.setTimeout(() => {
        history.value.push({
          tileIds: [
            firstTile.id,
            tile.id
          ],
          scoreBefore
        })

        firstTile.removed = true
        tile.removed = true

        score.value += 100

        selectedTileIds.value = []
        hintedTileIds.value = []

        boardLocked.value = false
      }, 180)

    return
  }

  selectionTimeoutId =
    window.setTimeout(() => {
      selectedTileIds.value = []

      boardLocked.value = false
    }, 450)
}

function findFreePair():
  [GameTile, GameTile] | null {
  const freeTiles = tiles.value.filter(
    tile => isTileFree(tile)
  )

  for (
    let firstIndex = 0;
    firstIndex < freeTiles.length;
    firstIndex++
  ) {
    for (
      let secondIndex = firstIndex + 1;
      secondIndex < freeTiles.length;
      secondIndex++
    ) {
      const first = freeTiles[firstIndex]
      const second = freeTiles[secondIndex]

      if (first.type === second.type) {
        return [first, second]
      }
    }
  }

  return null
}

function useHint() {
  if (
    hintsLeft.value <= 0 ||
    isCompleted.value
  ) {
    return
  }

  const pair = findFreePair()

  if (!pair) {
    return
  }

  clearHintTimer()

  hintedTileIds.value = [
    pair[0].id,
    pair[1].id
  ]

  hintsLeft.value--

  hintTimeoutId =
    window.setTimeout(() => {
      hintedTileIds.value = []
    }, 1600)
}

function shuffleArray<T>(items: T[]): T[] {
  const result = [...items]

  for (
    let index = result.length - 1;
    index > 0;
    index--
  ) {
    const randomIndex = Math.floor(
      Math.random() * (index + 1)
    )

    ;[
      result[index],
      result[randomIndex]
    ] = [
      result[randomIndex],
      result[index]
    ]
  }

  return result
}

function shuffleTiles() {
  if (
    shufflesLeft.value <= 0 ||
    isCompleted.value
  ) {
    return
  }

  selectedTileIds.value = []
  hintedTileIds.value = []

  const active =
    tiles.value.filter(
      tile => !tile.removed
    )

  const free =
    active.filter(tile =>
      isTileFree(tile)
    )

  if (active.length < 2) {
    return
  }

  const faces = active.map(tile => ({
    type: tile.type,
    label: tile.label,
    symbol: tile.symbol,
    tone: tile.tone
  }))

  const grouped =
    new Map<
      string,
      typeof faces
    >()

  faces.forEach(face => {
    const group =
      grouped.get(face.type) ?? []

    group.push(face)

    grouped.set(face.type, group)
  })

  const availablePairs =
    [...grouped.values()].filter(
      group => group.length >= 2
    )

  if (
    free.length >= 2 &&
    availablePairs.length > 0
  ) {
    const randomPair =
      availablePairs[
        Math.floor(
          Math.random() *
          availablePairs.length
        )
      ]

    const chosenType =
      randomPair[0].type

    let removedFaces = 0

    const remainingFaces =
      faces.filter(face => {
        if (
          face.type === chosenType &&
          removedFaces < 2
        ) {
          removedFaces++

          return false
        }

        return true
      })

    const shuffledRest =
      shuffleArray(remainingFaces)

    Object.assign(
      free[0],
      randomPair[0]
    )

    Object.assign(
      free[1],
      randomPair[1]
    )

    const freeIds =
      new Set([
        free[0].id,
        free[1].id
      ])

    const otherTiles =
      active.filter(
        tile =>
          !freeIds.has(tile.id)
      )

    otherTiles.forEach(
      (tile, index) => {
        Object.assign(
          tile,
          shuffledRest[index]
        )
      }
    )
  } else {
    const shuffled =
      shuffleArray(faces)

    active.forEach(
      (tile, index) => {
        Object.assign(
          tile,
          shuffled[index]
        )
      }
    )
  }

  shufflesLeft.value--
}

function undoLastMove() {
  const last =
    history.value.pop()

  if (!last) {
    return
  }

  clearSelectionTimer()

  last.tileIds.forEach(id => {
    const tile =
      tiles.value.find(
        item => item.id === id
      )

    if (tile) {
      tile.removed = false
    }
  })

  score.value =
    last.scoreBefore

  selectedTileIds.value = []
  hintedTileIds.value = []

  boardLocked.value = false
}

function resetGame() {
  clearSelectionTimer()
  clearHintTimer()

  tiles.value =
    createInitialTiles()

  selectedTileIds.value = []
  hintedTileIds.value = []

  score.value = 0
  elapsedSeconds.value = 0

  hintsLeft.value = 3
  shufflesLeft.value = 3

  history.value = []

  boardLocked.value = false

  panel.value = null
}

onMounted(() => {
  timerId =
    window.setInterval(() => {
      if (
        !isCompleted.value &&
        panel.value === null
      ) {
        elapsedSeconds.value++
      }
    }, 1000)
})

onBeforeUnmount(() => {
  if (timerId !== undefined) {
    window.clearInterval(timerId)
  }

  clearSelectionTimer()
  clearHintTimer()
})
</script>

<template>
  <div
    class="game-shell"
    :class="{
      'reduce-motion': reducedMotion
    }"
  >
    <div class="background-orb orb-one"></div>
    <div class="background-orb orb-two"></div>

    <div class="background-logo">
      <span></span>
      <span></span>
      <span></span>
    </div>

    <TopBar
      :pairs-left="pairsLeft"
      :time="formattedTime"
      :hints-left="hintsLeft"
      :shuffles-left="shufflesLeft"
      @menu="panel = 'menu'"
      @hint="useHint"
      @shuffle="shuffleTiles"
      @settings="panel = 'settings'"
    />

    <main class="game-stage">
      <div class="board-wrapper">
        <div class="board-glow"></div>

        <div class="board">
          <Tile
            v-for="tile in tiles"
            :key="tile.id"
            :tile="tile"
            :selected="
              selectedTileIds.includes(
                tile.id
              )
            "
            :hinted="
              hintedTileIds.includes(
                tile.id
              )
            "
            :free="isTileFree(tile)"
            :style="
              getTileStyle(tile)
            "
            @select="selectTile(tile)"
          />
        </div>

        <div
          v-if="isCompleted"
          class="complete-overlay"
        >
          <div class="complete-card">
            <div class="complete-icon">
              🏆
            </div>

            <h2>
              Board Complete
            </h2>

            <p>
              Score:
              <strong>
                {{ score }}
              </strong>
            </p>

            <p>
              Time:
              <strong>
                {{ formattedTime }}
              </strong>
            </p>

            <button
              type="button"
              @click="resetGame"
            >
              Play again
            </button>
          </div>
        </div>
      </div>
    </main>

    <BottomBar
      :score="score"
      :can-undo="canUndo"
      @undo="undoLastMove"
    />

    <div
      v-if="panel"
      class="modal-backdrop"
      @click.self="panel = null"
    >
      <div class="modal">
        <button
          class="modal-close"
          type="button"
          @click="panel = null"
        >
          ×
        </button>

        <template
          v-if="panel === 'menu'"
        >
          <h2>
            Solana Mahjong
          </h2>

          <p>
            Match two identical free
            tiles to clear the board.
          </p>

          <div class="rules">
            <div>
              <span>01</span>

              A tile cannot have another
              tile covering it.
            </div>

            <div>
              <span>02</span>

              At least one side must be
              open.
            </div>

            <div>
              <span>03</span>

              Match identical Web3 tiles.
            </div>
          </div>

          <button
            class="primary-button"
            type="button"
            @click="panel = null"
          >
            Continue
          </button>

          <button
            class="secondary-button"
            type="button"
            @click="resetGame"
          >
            New game
          </button>
        </template>

        <template
          v-else
        >
          <h2>
            Settings
          </h2>

          <label
            class="setting-row"
          >
            <div>
              <strong>
                Reduce motion
              </strong>

              <small>
                Disable most tile
                animations.
              </small>
            </div>

            <input
              v-model="reducedMotion"
              type="checkbox"
            />
          </label>

          <button
            class="primary-button"
            type="button"
            @click="panel = null"
          >
            Done
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-shell {
  min-height: 100dvh;
  width: 100%;

  position: relative;
  isolation: isolate;

  overflow: hidden;

  display: flex;
  flex-direction: column;

  padding:
    clamp(14px, 2vw, 28px);

  color: #fff;

  background:
    radial-gradient(
      circle at 50% 42%,
      rgba(55, 20, 125, 0.42),
      transparent 35%
    ),
    radial-gradient(
      circle at 86% 55%,
      rgba(20, 241, 149, 0.11),
      transparent 24%
    ),
    radial-gradient(
      circle at 12% 80%,
      rgba(153, 69, 255, 0.15),
      transparent 28%
    ),
    linear-gradient(
      135deg,
      #070818 0%,
      #090526 45%,
      #080b25 100%
    );
}

.game-shell::before {
  content: '';

  position: absolute;
  inset: 0;

  z-index: -3;

  opacity: 0.26;

  background-image:
    radial-gradient(
      rgba(255, 255, 255, 0.4)
      0.6px,
      transparent 0.6px
    );

  background-size: 28px 28px;

  mask-image:
    linear-gradient(
      to bottom,
      transparent,
      black,
      transparent
    );
}

.background-orb {
  position: absolute;

  border-radius: 50%;

  filter: blur(80px);

  pointer-events: none;

  z-index: -2;
}

.orb-one {
  width: 380px;
  height: 380px;

  left: 22%;
  top: 28%;

  background:
    rgba(102, 42, 255, 0.18);
}

.orb-two {
  width: 300px;
  height: 300px;

  right: 12%;
  top: 35%;

  background:
    rgba(20, 241, 149, 0.08);
}

.background-logo {
  position: absolute;

  right: 4%;
  top: 32%;

  width: clamp(
    90px,
    12vw,
    170px
  );

  opacity: 0.09;

  transform:
    rotate(-2deg)
    skewX(-15deg);

  z-index: -1;
}

.background-logo span {
  display: block;

  height: 24px;

  margin: 13px 0;

  border-radius: 5px;

  background:
    linear-gradient(
      90deg,
      #14f195,
      #9945ff
    );

  filter: blur(1px);
}

.game-stage {
  min-height: 0;
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;
}

.board-wrapper {
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
}

.board {
  position: relative;

  width: min(
    92vw,
    840px,
    calc(
      (100dvh - 190px) * 1.34
    )
  );

  aspect-ratio: 1.34;

  z-index: 2;
}

.board-glow {
  position: absolute;

  width: 72%;
  height: 60%;

  left: 50%;
  top: 52%;

  transform:
    translate(-50%, -50%);

  border-radius: 50%;

  background:
    rgba(90, 33, 180, 0.24);

  filter: blur(70px);

  z-index: 0;

  pointer-events: none;
}

.complete-overlay {
  position: absolute;
  inset: 0;

  display: grid;
  place-items: center;

  z-index: 1500;

  border-radius: 30px;

  background:
    rgba(5, 6, 22, 0.68);

  backdrop-filter: blur(10px);
}

.complete-card {
  width: min(
    90%,
    330px
  );

  padding: 32px;

  text-align: center;

  border:
    1px solid
    rgba(255, 255, 255, 0.14);

  border-radius: 22px;

  background:
    linear-gradient(
      160deg,
      rgba(25, 23, 56, 0.97),
      rgba(8, 9, 28, 0.97)
    );

  box-shadow:
    0 25px 60px
    rgba(0, 0, 0, 0.5);
}

.complete-icon {
  font-size: 42px;
}

.complete-card h2 {
  margin:
    12px 0 18px;
}

.complete-card p {
  margin: 7px 0;

  color:
    rgba(255, 255, 255, 0.75);
}

.complete-card button {
  width: 100%;

  margin-top: 22px;
  padding: 13px;

  border: 0;
  border-radius: 12px;

  background:
    linear-gradient(
      90deg,
      #14f195,
      #8b5cf6
    );

  color: #080914;

  font-weight: 900;

  cursor: pointer;
}

.modal-backdrop {
  position: fixed;
  inset: 0;

  z-index: 5000;

  display: grid;
  place-items: center;

  padding: 20px;

  background:
    rgba(2, 3, 14, 0.72);

  backdrop-filter: blur(12px);
}

.modal {
  width: min(
    100%,
    420px
  );

  position: relative;

  padding: 30px;

  border:
    1px solid
    rgba(255, 255, 255, 0.14);

  border-radius: 24px;

  background:
    linear-gradient(
      145deg,
      rgba(27, 23, 61, 0.98),
      rgba(8, 9, 28, 0.98)
    );

  box-shadow:
    0 28px 80px
    rgba(0, 0, 0, 0.55);
}

.modal h2 {
  margin: 0 0 10px;

  font-size: 27px;
}

.modal p {
  color:
    rgba(255, 255, 255, 0.68);

  line-height: 1.55;
}

.modal-close {
  position: absolute;

  right: 17px;
  top: 14px;

  border: 0;

  background: transparent;

  color:
    rgba(255, 255, 255, 0.65);

  font-size: 30px;

  cursor: pointer;
}

.rules {
  display: grid;

  gap: 10px;

  margin: 24px 0;
}

.rules div {
  display: flex;
  align-items: center;

  gap: 13px;

  padding: 12px;

  border-radius: 12px;

  background:
    rgba(255, 255, 255, 0.05);

  color:
    rgba(255, 255, 255, 0.76);

  font-size: 14px;
}

.rules span {
  color: #14f195;

  font-weight: 900;
}

.primary-button,
.secondary-button {
  width: 100%;

  padding: 13px;

  margin-top: 10px;

  border-radius: 12px;

  font-weight: 800;

  cursor: pointer;
}

.primary-button {
  border: 0;

  background:
    linear-gradient(
      90deg,
      #14f195,
      #9945ff
    );

  color: #080914;
}

.secondary-button {
  border:
    1px solid
    rgba(255, 255, 255, 0.13);

  background:
    rgba(255, 255, 255, 0.05);

  color: #fff;
}

.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;

  margin:
    25px 0;

  padding: 15px;

  border-radius: 14px;

  background:
    rgba(255, 255, 255, 0.05);
}

.setting-row div {
  display: flex;
  flex-direction: column;

  gap: 5px;
}

.setting-row small {
  color:
    rgba(255, 255, 255, 0.55);
}

.setting-row input {
  width: 20px;
  height: 20px;

  accent-color: #14f195;
}

:global(.reduce-motion .tile) {
  transition: none !important;
}

:global(
  .reduce-motion
  .tile.hinted
) {
  animation: none !important;
}

@media (max-height: 700px) {
  .game-shell {
    padding:
      10px 16px;
  }

  .board {
    width: min(
      84vw,
      720px,
      calc(
        (100dvh - 155px) * 1.34
      )
    );
  }
}
</style>