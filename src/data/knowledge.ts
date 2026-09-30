import type { TileTone } from '../types/game'

export type KnowledgeCategory =
  | 'Solana Core'
  | 'Wallet'
  | 'DeFi'
  | 'Staking'
  | 'Data'
  | 'Infrastructure'
  | 'NFT'
  | 'Interoperability'
  | 'Security'
  | 'Gaming'

export interface KnowledgeItem {
  type: string
  label: string
  symbol: string
  tone: TileTone

  category: KnowledgeCategory
  description: string
  source: string
}

export const KNOWLEDGE_ITEMS: KnowledgeItem[] = [
  {
    type: 'SOLANA',
    label: 'Solana',
    symbol: '≋',
    tone: 'solana',
    category: 'Solana Core',
    description:
      'Solana is a blockchain where programs execute instructions inside transactions while application state is stored in accounts.',
    source: 'Official Solana Documentation'
  },

  {
    type: 'ACCOUNT',
    label: 'Account',
    symbol: '@',
    tone: 'blue',
    category: 'Solana Core',
    description:
      'Accounts are where Solana stores state. Programs read from and write to accounts during transaction execution.',
    source: 'Official Solana Documentation'
  },

  {
    type: 'PROGRAM',
    label: 'Program',
    symbol: '{}',
    tone: 'purple',
    category: 'Solana Core',
    description:
      'Programs are Solana smart contracts. Programs contain executable code, while mutable state lives in separate accounts.',
    source: 'Official Solana Documentation'
  },

  {
    type: 'TRANSACTION',
    label: 'Transaction',
    symbol: 'TX',
    tone: 'teal',
    category: 'Solana Core',
    description:
      'A transaction is an atomic unit of execution. It can contain one or more instructions that run in sequence.',
    source: 'Official Solana Documentation'
  },

  {
    type: 'INSTRUCTION',
    label: 'Instruction',
    symbol: '›',
    tone: 'gold',
    category: 'Solana Core',
    description:
      'An instruction tells a Solana program what operation to perform and which accounts and data it should use.',
    source: 'Official Solana Documentation'
  },

  {
    type: 'PDA',
    label: 'PDA',
    symbol: '◇',
    tone: 'purple',
    category: 'Solana Core',
    description:
      'A Program Derived Address is deterministically created from seeds and a program ID. A PDA has no private key.',
    source: 'Official Solana Documentation'
  },

  {
    type: 'CPI',
    label: 'CPI',
    symbol: '⇄',
    tone: 'blue',
    category: 'Solana Core',
    description:
      'Cross-Program Invocation lets one Solana program call an instruction on another program during execution.',
    source: 'Official Solana Documentation'
  },

  {
    type: 'VALIDATOR',
    label: 'Validator',
    symbol: '▤',
    tone: 'green',
    category: 'Solana Core',
    description:
      'Validators process transactions and vote on blocks, helping Solana reach consensus and keep the network running.',
    source: 'Official Solana Documentation'
  },

  {
    type: 'STAKING',
    label: 'Staking',
    symbol: '◆',
    tone: 'green',
    category: 'Staking',
    description:
      'SOL holders can delegate stake to validators to help secure the network while retaining control of their tokens.',
    source: 'Official Solana Documentation'
  },

  {
    type: 'TOKEN',
    label: 'Token',
    symbol: 'T',
    tone: 'gold',
    category: 'Solana Core',
    description:
      'Most tokens on Solana use the Token Program or Token-2022. Token accounts hold balances for a specific mint.',
    source: 'Official Solana Documentation'
  },

  {
    type: 'NFT',
    label: 'NFT',
    symbol: '◫',
    tone: 'pink',
    category: 'NFT',
    description:
      'NFTs are unique digital assets. Metaplex provides standards and developer tools for creating NFTs on Solana.',
    source: 'Official Metaplex Documentation'
  },

  {
    type: 'RPC',
    label: 'RPC',
    symbol: '↯',
    tone: 'blue',
    category: 'Infrastructure',
    description:
      'Applications use JSON-RPC endpoints to read blockchain data and communicate with nodes in a Solana cluster.',
    source: 'Official Solana Documentation'
  },

  {
    type: 'PHANTOM',
    label: 'Phantom',
    symbol: '●',
    tone: 'purple',
    category: 'Wallet',
    description:
      'Phantom is a self-custodial crypto wallet that supports Solana and several other blockchain networks.',
    source: 'Official Phantom Documentation'
  },

  {
    type: 'JUPITER',
    label: 'Jupiter',
    symbol: 'J',
    tone: 'teal',
    category: 'DeFi',
    description:
      'Jupiter is an onchain finance platform on Solana with products for token swaps, lending, perpetual trading and more.',
    source: 'Official Jupiter Website'
  },

  {
    type: 'RAYDIUM',
    label: 'Raydium',
    symbol: 'R',
    tone: 'purple',
    category: 'DeFi',
    description:
      'Raydium is a Solana DeFi protocol for token swaps and permissionless liquidity pools.',
    source: 'Official Raydium Documentation'
  },

  {
    type: 'ORCA',
    label: 'Orca',
    symbol: '◒',
    tone: 'gold',
    category: 'DeFi',
    description:
      'Orca is a decentralized exchange and liquidity platform built around trading and liquidity on Solana.',
    source: 'Official Orca Documentation'
  },

  {
    type: 'JITO',
    label: 'Jito',
    symbol: 'J',
    tone: 'teal',
    category: 'Staking',
    description:
      'Jito provides liquid staking on Solana. JitoSOL accrues staking rewards together with MEV-related rewards.',
    source: 'Official Jito Documentation'
  },

  {
    type: 'PYTH',
    label: 'Pyth',
    symbol: 'P',
    tone: 'purple',
    category: 'Data',
    description:
      'Pyth provides real-time financial market data that smart-contract applications can use as onchain price feeds.',
    source: 'Official Pyth Documentation'
  },

  {
    type: 'HELIUS',
    label: 'Helius',
    symbol: '☀',
    tone: 'orange',
    category: 'Infrastructure',
    description:
      'Helius is a Solana developer platform providing RPC infrastructure, transaction delivery, data streaming and APIs.',
    source: 'Official Helius Website'
  },

  {
    type: 'METAPLEX',
    label: 'Metaplex',
    symbol: 'M',
    tone: 'purple',
    category: 'NFT',
    description:
      'Metaplex provides standards and developer tools for creating, managing and working with digital assets on Solana.',
    source: 'Official Metaplex Documentation'
  },

  {
    type: 'WORMHOLE',
    label: 'Wormhole',
    symbol: '◎',
    tone: 'blue',
    category: 'Interoperability',
    description:
      'Wormhole is a cross-chain messaging and interoperability protocol connecting Solana with other blockchain ecosystems.',
    source: 'Official Wormhole Documentation'
  },

  {
    type: 'SQUADS',
    label: 'Squads',
    symbol: 'SQ',
    tone: 'green',
    category: 'Security',
    description:
      'Squads provides multisignature wallets on Solana, where multiple members can be required to approve a transaction.',
    source: 'Official Squads Documentation'
  },

  {
    type: 'MARINADE',
    label: 'Marinade',
    symbol: 'M',
    tone: 'green',
    category: 'Staking',
    description:
      'Marinade is a Solana staking platform supporting native staking and liquid staking through mSOL.',
    source: 'Official Marinade Documentation'
  },

  {
    type: 'STAR_ATLAS',
    label: 'Star Atlas',
    symbol: 'A',
    tone: 'blue',
    category: 'Gaming',
    description:
      'Star Atlas is a blockchain gaming ecosystem. Its SAGE strategy game uses Solana for onchain gameplay and assets.',
    source: 'Official Star Atlas Documentation'
  }
]

export const KNOWLEDGE_BY_TYPE =
  Object.fromEntries(
    KNOWLEDGE_ITEMS.map(
      item => [
        item.type,
        item
      ]
    )
  ) as Record<
    string,
    KnowledgeItem
  >

export const KNOWLEDGE_TOTAL =
  KNOWLEDGE_ITEMS.length