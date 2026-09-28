export type TileType =
  | 'SOL'
  | 'JUP'
  | 'BONK'
  | 'PHANTOM'
  | 'ORCA'
  | 'JITO'
  | 'DRIFT'
  | 'PYTH'
  | 'TENSOR'
  | 'ME'
  | 'WORM'
  | 'HELIUS'

export interface GameTile {
  id: number
  type: TileType
  removed: boolean
  x: number
  y: number
  z: number
}

export interface MatchHistoryEntry {
  tileIds: [number, number]
  scoreBefore: number
}