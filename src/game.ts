export type TileTone =
  | 'solana'
  | 'purple'
  | 'teal'
  | 'gold'
  | 'pink'
  | 'blue'
  | 'green'
  | 'orange'

export interface GameTile {
  id: number

  type: string
  label: string
  symbol: string
  tone: TileTone

  x: number
  y: number
  z: number

  removed: boolean
}

export interface MatchHistoryEntry {
  tileIds: [
    number,
    number
  ]

  scoreBefore: number
}