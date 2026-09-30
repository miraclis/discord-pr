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
import KnowledgeCard from './KnowledgeCard.vue'

import {
  KNOWLEDGE_BY_TYPE,
  KNOWLEDGE_ITEMS,
  KNOWLEDGE_TOTAL
} from '../data/knowledge'

import type {
  KnowledgeItem
} from '../data/knowledge'

import type {
  GameTile,
  MatchHistoryEntry
} from '../types/game'

type Brand = Pick<
  KnowledgeItem,
  'type' | 'label' | 'symbol' | 'tone'
>

interface BoardPosition {
  id: number
  x: number
  y: number
  z: number
}

type RemovalPair = [number, number]

type Panel =
  | 'menu'
  | 'settings'
  | null

// --------------------------------------------------
// TILE DATA
// --------------------------------------------------

const brands: Brand[] =
  KNOWLEDGE_ITEMS.map(item => ({
    type: item.type,
    label: item.label,
    symbol: item.symbol,
    tone: item.tone
  }))

// --------------------------------------------------
// BOARD GEOMETRY
// --------------------------------------------------

const rawPositions: Array<
  [number, number, number]
> = [
  // BASE LAYER

  [2, 4, 0],
  [12, 4, 0],

  [4, 4, 0],
  [10, 4, 0],

  [6, 4, 0],
  [8, 4, 0],

  [0, 6, 0],
  [14, 6, 0],

  [2, 6, 0],
  [12, 6, 0],

  [4, 6, 0],
  [10, 6, 0],

  [6, 6, 0],
  [8, 6, 0],

  [0, 8, 0],
  [14, 8, 0],

  [2, 8, 0],
  [12, 8, 0],

  [4, 8, 0],
  [10, 8, 0],

  [6, 8, 0],
  [8, 8, 0],

  [2, 10, 0],
  [12, 10, 0],

  [4, 10, 0],
  [10, 10, 0],

  [6, 10, 0],
  [8, 10, 0],

  // SECOND LAYER

  [3, 5, 1],
  [13, 5, 1],

  [5, 5, 1],
  [11, 5, 1],

  [7, 5, 1],
  [9, 5, 1],

  [3, 7, 1],
  [13, 7, 1],

  [5, 7, 1],
  [11, 7, 1],

  [7, 7, 1],
  [9, 7, 1],

  // TOP LAYER

  [6, 4, 2],
  [12, 4, 2],

  [8, 4, 2],
  [10, 4, 2],

  [7, 6, 2],
  [13, 6, 2],

  [9, 6, 2],
  [11, 6, 2]
]

const boardPositions: BoardPosition[] =
  rawPositions.map(
    ([x, y, z], index) => ({
      id: index + 1,
      x,
      y,
      z
    })
  )

// --------------------------------------------------
// RANDOM
// --------------------------------------------------

function shuffleArray<T>(
  source: T[]
): T[] {
  const result = [...source]

  for (
    let index = result.length - 1;
    index > 0;
    index--
  ) {
    const randomIndex =
      Math.floor(
        Math.random() *
        (index + 1)
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

// --------------------------------------------------
// GEOMETRY
// --------------------------------------------------

function rectanglesOverlap(
  first: BoardPosition,
  second: BoardPosition
): boolean {
  return (
    first.x < second.x + 2 &&
    first.x + 2 > second.x &&
    first.y < second.y + 2 &&
    first.y + 2 > second.y
  )
}

function verticalOverlap(
  first: BoardPosition,
  second: BoardPosition
): boolean {
  return (
    first.y < second.y + 2 &&
    first.y + 2 > second.y
  )
}

function isPositionFree(
  tile: BoardPosition,
  activeTiles: BoardPosition[]
): boolean {
  const hasTileAbove =
    activeTiles.some(other =>
      other.id !== tile.id &&
      other.z > tile.z &&
      rectanglesOverlap(
        tile,
        other
      )
    )

  if (hasTileAbove) {
    return false
  }

  const blockedOnLeft =
    activeTiles.some(other =>
      other.id !== tile.id &&
      other.z === tile.z &&
      other.x + 2 === tile.x &&
      verticalOverlap(
        tile,
        other
      )
    )

  const blockedOnRight =
    activeTiles.some(other =>
      other.id !== tile.id &&
      other.z === tile.z &&
      tile.x + 2 === other.x &&
      verticalOverlap(
        tile,
        other
      )
    )

  return (
    !blockedOnLeft ||
    !blockedOnRight
  )
}

// --------------------------------------------------
// SOLVABLE BOARD GENERATOR
// --------------------------------------------------

function findRemovalPlan(
  sourcePositions: BoardPosition[]
): RemovalPair[] | null {
  const failedStates =
    new Set<string>()

  function solve(
    remaining: BoardPosition[]
  ): RemovalPair[] | null {
    if (
      remaining.length === 0
    ) {
      return []
    }

    const stateKey =
      remaining
        .map(tile => tile.id)
        .sort(
          (a, b) =>
            a - b
        )
        .join(',')

    if (
      failedStates.has(
        stateKey
      )
    ) {
      return null
    }

    const freeTiles =
      remaining.filter(tile =>
        isPositionFree(
          tile,
          remaining
        )
      )

    if (
      freeTiles.length < 2
    ) {
      failedStates.add(
        stateKey
      )

      return null
    }

    const candidates:
      Array<{
        first: BoardPosition
        second: BoardPosition
        distance: number
      }> = []

    for (
      let firstIndex = 0;
      firstIndex <
      freeTiles.length;
      firstIndex++
    ) {
      for (
        let secondIndex =
          firstIndex + 1;
        secondIndex <
        freeTiles.length;
        secondIndex++
      ) {
        const first =
          freeTiles[firstIndex]

        const second =
          freeTiles[secondIndex]

        candidates.push({
          first,
          second,

          distance:
            Math.abs(
              first.x -
              second.x
            ) +
            Math.abs(
              first.y -
              second.y
            ) +
            Math.abs(
              first.z -
              second.z
            ) * 2
        })
      }
    }

    candidates.sort(
      (a, b) =>
        b.distance -
        a.distance
    )

    for (
      const candidate
      of candidates
    ) {
      const next =
        remaining.filter(tile =>
          tile.id !==
            candidate.first.id &&
          tile.id !==
            candidate.second.id
        )

      const rest =
        solve(next)

      if (rest) {
        return [
          [
            candidate.first.id,
            candidate.second.id
          ],
          ...rest
        ]
      }
    }

    failedStates.add(
      stateKey
    )

    return null
  }

  return solve(
    sourcePositions.map(
      position => ({
        ...position
      })
    )
  )
}

// --------------------------------------------------
// ASSIGN TILE THEMES
// --------------------------------------------------

function createBrandMap(
  positions: BoardPosition[],
  brandPool: Brand[] = brands
): Map<number, Brand> {
  const solution =
    findRemovalPlan(
      positions
    )

  if (!solution) {
    throw new Error(
      'Board geometry is not solvable.'
    )
  }

  if (
    solution.length >
    brandPool.length
  ) {
    throw new Error(
      'Not enough knowledge items for this board.'
    )
  }

  const randomizedBrands =
    shuffleArray(
      brandPool
    ).slice(
      0,
      solution.length
    )

  const result =
    new Map<number, Brand>()

  solution.forEach(
    (
      [firstId, secondId],
      index
    ) => {
      const brand =
        randomizedBrands[index]

      result.set(
        firstId,
        brand
      )

      result.set(
        secondId,
        brand
      )
    }
  )

  return result
}

// --------------------------------------------------
// CREATE GAME
// --------------------------------------------------

function createInitialTiles():
  GameTile[] {
  const brandMap =
    createBrandMap(
      boardPositions
    )

  return boardPositions.map(
    position => {
      const brand =
        brandMap.get(
          position.id
        )

      if (!brand) {
        throw new Error(
          `Missing data for tile ${position.id}`
        )
      }

      return {
        id: position.id,

        type: brand.type,
        label: brand.label,
        symbol: brand.symbol,
        tone: brand.tone,

        x: position.x,
        y: position.y,
        z: position.z,

        removed: false
      }
    }
  )
}

// --------------------------------------------------
// STATE
// --------------------------------------------------

const tiles =
  ref<GameTile[]>(
    createInitialTiles()
  )

const selectedTileIds =
  ref<number[]>([])

const hintedTileIds =
  ref<number[]>([])

const discoveredTypes =
  ref<string[]>([])

const activeKnowledge =
  ref<KnowledgeItem | null>(
    null
  )

const score =
  ref(0)

const elapsedSeconds =
  ref(0)

const hintsLeft =
  ref(3)

const shufflesLeft =
  ref(3)

const history =
  ref<MatchHistoryEntry[]>([])

const panel =
  ref<Panel>(null)

const reducedMotion =
  ref(false)

const boardLocked =
  ref(false)

let timerId:
  number | undefined

let selectionTimeoutId:
  number | undefined

let hintTimeoutId:
  number | undefined

let knowledgeTimeoutId:
  number | undefined

// --------------------------------------------------
// COMPUTED
// --------------------------------------------------

const activeTiles =
  computed(() =>
    tiles.value.filter(
      tile =>
        !tile.removed
    )
  )

const pairsLeft =
  computed(() =>
    activeTiles.value.length /
    2
  )

const isCompleted =
  computed(() =>
    activeTiles.value.length ===
    0
  )

const canUndo =
  computed(() =>
    history.value.length > 0
  )

const discoveredCount =
  computed(() =>
    discoveredTypes.value.length
  )

const formattedTime =
  computed(() => {
    const minutes =
      Math.floor(
        elapsedSeconds.value /
        60
      )

    const seconds =
      elapsedSeconds.value %
      60

    return `${
      String(minutes)
        .padStart(
          2,
          '0'
        )
    }:${
      String(seconds)
        .padStart(
          2,
          '0'
        )
    }`
  })

// --------------------------------------------------
// CURRENT FREE CHECK
// --------------------------------------------------

function isTileFree(
  tile: GameTile
): boolean {
  if (
    tile.removed
  ) {
    return false
  }

  const positions:
    BoardPosition[] =
    activeTiles.value.map(
      activeTile => ({
        id:
          activeTile.id,

        x:
          activeTile.x,

        y:
          activeTile.y,

        z:
          activeTile.z
      })
    )

  return isPositionFree(
    {
      id: tile.id,
      x: tile.x,
      y: tile.y,
      z: tile.z
    },
    positions
  )
}

// --------------------------------------------------
// TILE POSITION
// --------------------------------------------------

function getTileStyle(
  tile: GameTile
) {
  return {
    left: `${
      4 +
      tile.x * 5.65 +
      tile.z * 0.35
    }%`,

    top: `${
      2 +
      tile.y * 7.25 -
      tile.z
    }%`,

    zIndex:
      tile.z * 100 +
      tile.y * 10 +
      tile.x
  }
}

// --------------------------------------------------
// TIMERS
// --------------------------------------------------

function clearSelectionTimer() {
  if (
    selectionTimeoutId !==
    undefined
  ) {
    window.clearTimeout(
      selectionTimeoutId
    )

    selectionTimeoutId =
      undefined
  }
}

function clearHintTimer() {
  if (
    hintTimeoutId !==
    undefined
  ) {
    window.clearTimeout(
      hintTimeoutId
    )

    hintTimeoutId =
      undefined
  }
}

function clearKnowledgeTimer() {
  if (
    knowledgeTimeoutId !==
    undefined
  ) {
    window.clearTimeout(
      knowledgeTimeoutId
    )

    knowledgeTimeoutId =
      undefined
  }
}

// --------------------------------------------------
// KNOWLEDGE
// --------------------------------------------------

function closeKnowledge() {
  clearKnowledgeTimer()

  activeKnowledge.value =
    null
}

function discoverTile(
  type: string
) {
  const knowledge =
    KNOWLEDGE_BY_TYPE[type]

  if (!knowledge) {
    return
  }

  if (
    discoveredTypes.value.includes(
      type
    )
  ) {
    return
  }

  discoveredTypes.value = [
    ...discoveredTypes.value,
    type
  ]

  activeKnowledge.value =
    knowledge

  clearKnowledgeTimer()

  knowledgeTimeoutId =
    window.setTimeout(
      () => {
        activeKnowledge.value =
          null

        knowledgeTimeoutId =
          undefined
      },
      6500
    )
}

// --------------------------------------------------
// SELECT TILE
// --------------------------------------------------

function selectTile(
  tile: GameTile
) {
  if (
    boardLocked.value ||
    !isTileFree(tile)
  ) {
    return
  }

  if (
    selectedTileIds.value.includes(
      tile.id
    )
  ) {
    selectedTileIds.value =
      []

    return
  }

  if (
    selectedTileIds.value.length ===
    0
  ) {
    selectedTileIds.value =
      [tile.id]

    return
  }

  const firstTile =
    tiles.value.find(
      item =>
        item.id ===
        selectedTileIds.value[0]
    )

  if (!firstTile) {
    selectedTileIds.value =
      []

    return
  }

  selectedTileIds.value = [
    firstTile.id,
    tile.id
  ]

  boardLocked.value =
    true

  // MATCH
  if (
    firstTile.type ===
    tile.type
  ) {
    const scoreBefore =
      score.value

    selectionTimeoutId =
      window.setTimeout(
        () => {
          history.value.push({
            tileIds: [
              firstTile.id,
              tile.id
            ],

            scoreBefore
          })

          firstTile.removed =
            true

          tile.removed =
            true

          score.value +=
            100

          discoverTile(
            firstTile.type
          )

          selectedTileIds.value =
            []

          hintedTileIds.value =
            []

          boardLocked.value =
            false
        },
        180
      )

    return
  }

  // WRONG PAIR
  selectionTimeoutId =
    window.setTimeout(
      () => {
        selectedTileIds.value =
          []

        boardLocked.value =
          false
      },
      450
    )
}

// --------------------------------------------------
// FIND AVAILABLE MATCH
// --------------------------------------------------

function findFreePair():
  [GameTile, GameTile] | null {
  const freeTiles =
    tiles.value.filter(
      tile =>
        !tile.removed &&
        isTileFree(tile)
    )

  for (
    let firstIndex = 0;
    firstIndex <
    freeTiles.length;
    firstIndex++
  ) {
    for (
      let secondIndex =
        firstIndex + 1;

      secondIndex <
      freeTiles.length;

      secondIndex++
    ) {
      const first =
        freeTiles[firstIndex]

      const second =
        freeTiles[secondIndex]

      if (
        first.type ===
        second.type
      ) {
        return [
          first,
          second
        ]
      }
    }
  }

  return null
}

// --------------------------------------------------
// HINT
// --------------------------------------------------

function useHint() {
  if (
    hintsLeft.value <= 0 ||
    isCompleted.value ||
    boardLocked.value
  ) {
    return
  }

  const pair =
    findFreePair()

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
    window.setTimeout(
      () => {
        hintedTileIds.value =
          []

        hintTimeoutId =
          undefined
      },
      1600
    )
}

// --------------------------------------------------
// SHUFFLE
// --------------------------------------------------

function shuffleTiles() {
  if (
    shufflesLeft.value <= 0 ||
    isCompleted.value ||
    boardLocked.value
  ) {
    return
  }

  closeKnowledge()

  const remainingTiles =
    tiles.value.filter(
      tile =>
        !tile.removed
    )

  const remainingPositions:
    BoardPosition[] =
    remainingTiles.map(
      tile => ({
        id: tile.id,
        x: tile.x,
        y: tile.y,
        z: tile.z
      })
    )

  const remainingTypes =
    new Set(
      remainingTiles.map(
        tile =>
          tile.type
      )
    )

  const remainingBrands =
    brands.filter(
      brand =>
        remainingTypes.has(
          brand.type
        )
    )

  const newBrandMap =
    createBrandMap(
      remainingPositions,
      remainingBrands
    )

  remainingTiles.forEach(
    tile => {
      const brand =
        newBrandMap.get(
          tile.id
        )

      if (!brand) {
        throw new Error(
          `Missing shuffled data for tile ${tile.id}`
        )
      }

      tile.type =
        brand.type

      tile.label =
        brand.label

      tile.symbol =
        brand.symbol

      tile.tone =
        brand.tone
    }
  )

  selectedTileIds.value =
    []

  hintedTileIds.value =
    []

  // Undo старої розкладки
  // після shuffle вже не валідний.
  history.value =
    []

  shufflesLeft.value--
}

// --------------------------------------------------
// UNDO
// --------------------------------------------------

function undoLastMove() {
  if (
    boardLocked.value
  ) {
    return
  }

  const last =
    history.value.pop()

  if (!last) {
    return
  }

  clearSelectionTimer()

  last.tileIds.forEach(
    id => {
      const tile =
        tiles.value.find(
          item =>
            item.id === id
        )

      if (tile) {
        tile.removed =
          false
      }
    }
  )

  score.value =
    last.scoreBefore

  selectedTileIds.value =
    []

  hintedTileIds.value =
    []

  boardLocked.value =
    false
}

// --------------------------------------------------
// RESET
// --------------------------------------------------

function resetGame() {
  clearSelectionTimer()
  clearHintTimer()
  clearKnowledgeTimer()

  tiles.value =
    createInitialTiles()

  selectedTileIds.value =
    []

  hintedTileIds.value =
    []

  discoveredTypes.value =
    []

  activeKnowledge.value =
    null

  score.value =
    0

  elapsedSeconds.value =
    0

  hintsLeft.value =
    3

  shufflesLeft.value =
    3

  history.value =
    []

  boardLocked.value =
    false

  panel.value =
    null
}

// --------------------------------------------------
// TIMER
// --------------------------------------------------

onMounted(() => {
  timerId =
    window.setInterval(
      () => {
        if (
          !isCompleted.value &&
          panel.value === null
        ) {
          elapsedSeconds.value++
        }
      },
      1000
    )
})

onBeforeUnmount(() => {
  if (
    timerId !== undefined
  ) {
    window.clearInterval(
      timerId
    )
  }

  clearSelectionTimer()
  clearHintTimer()
  clearKnowledgeTimer()
})
</script>

<template>
  <div
    class="game-shell"
    :class="{
      'reduce-motion': reducedMotion
    }"
  >
    <div
      class="background-orb orb-one"
    ></div>

    <div
      class="background-orb orb-two"
    ></div>

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
        <div
          class="board-glow"
        ></div>

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
            :free="
              isTileFree(tile)
            "
            :style="
              getTileStyle(tile)
            "
            @select="
              selectTile(tile)
            "
          />
        </div>

        <div
          v-if="isCompleted"
          class="complete-overlay"
        >
          <div
            class="complete-card"
          >
            <div
              class="complete-icon"
            >
              🏆
            </div>

            <div class="complete-label">
              LEVEL COMPLETE
            </div>

            <h2>
              Board cleared
            </h2>

            <p>
              Score
              <strong>
                {{ score }}
              </strong>
            </p>

            <p>
              Time
              <strong>
                {{ formattedTime }}
              </strong>
            </p>

            <p>
              Discoveries
              <strong>
                {{ discoveredCount }}
                /
                {{ KNOWLEDGE_TOTAL }}
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

    <div
      class="discovery-counter"
    >
      <span class="discovery-dot">
      </span>

      <span>
        Discoveries
      </span>

      <strong>
        {{ discoveredCount }}
        /
        {{ KNOWLEDGE_TOTAL }}
      </strong>
    </div>

    <BottomBar
      :score="score"
      :can-undo="canUndo"
      @undo="undoLastMove"
    />

    <KnowledgeCard
      v-if="activeKnowledge"
      :item="activeKnowledge"
      :discovered="discoveredCount"
      :total="KNOWLEDGE_TOTAL"
      @close="closeKnowledge"
    />

    <div
      v-if="panel"
      class="modal-backdrop"
      @click.self="
        panel = null
      "
    >
      <div class="modal">
        <button
          class="modal-close"
          type="button"
          @click="
            panel = null
          "
        >
          
        </button>

        <template
          v-if="
            panel === 'menu'
          "
        >
          <h2>
            Solong
          </h2>

          <p>
            Match free pairs,
            discover Solana concepts
            and clear the board.
          </p>

          <div class="rules">
            <div>
              <span>01</span>

              A tile cannot be covered
              by another tile.
            </div>

            <div>
              <span>02</span>

              At least one side of the
              tile must be open.
            </div>

            <div>
              <span>03</span>

              Match identical tiles
              to unlock knowledge cards.
            </div>
          </div>

          <button
            class="primary-button"
            type="button"
            @click="
              panel = null
            "
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

        <template v-else>
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
              v-model="
                reducedMotion
              "
              type="checkbox"
            />
          </label>

          <button
            class="primary-button"
            type="button"
            @click="
              panel = null
            "
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
    clamp(
      14px,
      2vw,
      28px
    );

  color: #fff;

  background:
    radial-gradient(
      circle at 50% 42%,
      rgba(
        55,
        20,
        125,
        0.42
      ),
      transparent 35%
    ),
    radial-gradient(
      circle at 86% 55%,
      rgba(
        20,
        241,
        149,
        0.11
      ),
      transparent 24%
    ),
    radial-gradient(
      circle at 12% 80%,
      rgba(
        153,
        69,
        255,
        0.15
      ),
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
      rgba(
        255,
        255,
        255,
        0.4
      )
      0.6px,
      transparent 0.6px
    );

  background-size:
    28px 28px;

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
    rgba(
      102,
      42,
      255,
      0.18
    );
}

.orb-two {
  width: 300px;
  height: 300px;

  right: 12%;
  top: 35%;

  background:
    rgba(
      20,
      241,
      149,
      0.08
    );
}

.background-logo {
  position: absolute;

  right: 4%;
  top: 32%;

  width:
    clamp(
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

  width:
    min(
      92vw,
      840px,
      calc(
        (100dvh - 190px) *
        1.34
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
    translate(
      -50%,
      -50%
    );

  border-radius: 50%;

  background:
    rgba(
      90,
      33,
      180,
      0.24
    );

  filter: blur(70px);

  z-index: 0;

  pointer-events: none;
}

/* ---------------------------
   DISCOVERY COUNTER
--------------------------- */

.discovery-counter {
  position: absolute;

  left: 50%;

  bottom:
    clamp(
      17px,
      2vw,
      28px
    );

  z-index: 90;

  transform:
    translateX(-50%);

  display: flex;
  align-items: center;

  gap: 7px;

  padding:
    9px 14px;

  border:
    1px solid
    rgba(
      255,
      255,
      255,
      0.09
    );

  border-radius: 999px;

  color:
    rgba(
      255,
      255,
      255,
      0.52
    );

  background:
    rgba(
      5,
      6,
      22,
      0.74
    );

  backdrop-filter:
    blur(14px);

  font-size: 10px;

  pointer-events: none;
}

.discovery-counter strong {
  color: #14f195;

  font-size: 11px;
}

.discovery-dot {
  width: 6px;
  height: 6px;

  border-radius: 50%;

  background: #14f195;

  box-shadow:
    0 0 10px
    rgba(
      20,
      241,
      149,
      0.75
    );
}

/* ---------------------------
   COMPLETE
--------------------------- */

.complete-overlay {
  position: absolute;
  inset: 0;

  display: grid;
  place-items: center;

  z-index: 1500;

  border-radius: 30px;

  background:
    rgba(
      5,
      6,
      22,
      0.72
    );

  backdrop-filter:
    blur(12px);
}

.complete-card {
  width:
    min(
      90%,
      340px
    );

  padding: 32px;

  text-align: center;

  border:
    1px solid
    rgba(
      255,
      255,
      255,
      0.14
    );

  border-radius: 22px;

  background:
    linear-gradient(
      160deg,
      rgba(
        25,
        23,
        56,
        0.98
      ),
      rgba(
        8,
        9,
        28,
        0.98
      )
    );

  box-shadow:
    0 25px 60px
    rgba(
      0,
      0,
      0,
      0.5
    );
}

.complete-icon {
  font-size: 42px;
}

.complete-label {
  margin-top: 8px;

  color: #14f195;

  font-size: 9px;
  font-weight: 900;

  letter-spacing: 0.16em;
}

.complete-card h2 {
  margin:
    8px 0 20px;

  font-size: 26px;
}

.complete-card p {
  display: flex;

  justify-content:
    space-between;

  gap: 20px;

  margin:
    8px 0;

  color:
    rgba(
      255,
      255,
      255,
      0.58
    );

  font-size: 13px;
}

.complete-card p strong {
  color: #fff;
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

/* ---------------------------
   MODAL
--------------------------- */

.modal-backdrop {
  position: fixed;
  inset: 0;

  z-index: 5000;

  display: grid;
  place-items: center;

  padding: 20px;

  background:
    rgba(
      2,
      3,
      14,
      0.72
    );

  backdrop-filter:
    blur(12px);
}

.modal {
  width:
    min(
      100%,
      420px
    );

  position: relative;

  padding: 30px;

  border:
    1px solid
    rgba(
      255,
      255,
      255,
      0.14
    );

  border-radius: 24px;

  background:
    linear-gradient(
      145deg,
      rgba(
        27,
        23,
        61,
        0.98
      ),
      rgba(
        8,
        9,
        28,
        0.98
      )
    );

  box-shadow:
    0 28px 80px
    rgba(
      0,
      0,
      0,
      0.55
    );
}

.modal h2 {
  margin:
    0 0 10px;

  font-size: 27px;
}

.modal p {
  color:
    rgba(
      255,
      255,
      255,
      0.68
    );

  line-height: 1.55;
}

.modal-close {
  position: absolute;

  right: 17px;
  top: 14px;

  border: 0;

  background:
    transparent;

  color:
    rgba(
      255,
      255,
      255,
      0.65
    );

  font-size: 30px;

  cursor: pointer;
}

.rules {
  display: grid;

  gap: 10px;

  margin:
    24px 0;
}

.rules div {
  display: flex;
  align-items: center;

  gap: 13px;

  padding: 12px;

  border-radius: 12px;

  background:
    rgba(
      255,
      255,
      255,
      0.05
    );

  color:
    rgba(
      255,
      255,
      255,
      0.76
    );

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
    rgba(
      255,
      255,
      255,
      0.13
    );

  background:
    rgba(
      255,
      255,
      255,
      0.05
    );

  color: #fff;
}

.setting-row {
  display: flex;
  align-items: center;

  justify-content:
    space-between;

  gap: 20px;

  margin:
    25px 0;

  padding: 15px;

  border-radius: 14px;

  background:
    rgba(
      255,
      255,
      255,
      0.05
    );
}

.setting-row div {
  display: flex;
  flex-direction: column;

  gap: 5px;
}

.setting-row small {
  color:
    rgba(
      255,
      255,
      255,
      0.55
    );
}

.setting-row input {
  width: 20px;
  height: 20px;

  accent-color: #14f195;
}

:global(
  .reduce-motion .tile
) {
  transition:
    none !important;
}

:global(
  .reduce-motion
  .tile.hinted
) {
  animation:
    none !important;
}

@media (
  max-width: 700px
) {
  .discovery-counter {
    bottom: 13px;

    padding:
      7px 10px;
  }
}

@media (
  max-height: 700px
) {
  .game-shell {
    padding:
      10px 16px;
  }

  .board {
    width:
      min(
        84vw,
        720px,
        calc(
          (100dvh - 155px) *
          1.34
        )
      );
  }

  .discovery-counter {
    bottom: 8px;
  }
}
</style>