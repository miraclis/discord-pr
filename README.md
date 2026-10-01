# Solong

Solong is a small Discord game inspired by Mahjong Solitaire.

The idea is simple: you match free tiles like in Mahjong, but instead of traditional symbols the tiles represent concepts and projects from the Solana ecosystem.

When you discover a new pair, the game shows a short explanation of what it means. So you can just play, but at the same time slowly learn things like transactions, validators, staking, RPC, wallets, DeFi and other parts of the ecosystem.

## Why I made it

I wanted to make something that feels more like a game than a course.

Learning Web3 can get confusing pretty quickly because there are a lot of new terms and projects. Solong tries to make the first contact with them a bit easier by putting the learning part inside a simple game.

It started as a hackathon project and later became a Discord Activity.

## How it works

The gameplay is based on Mahjong Solitaire:

- match two identical free tiles
- a tile must not be covered by another tile
- at least one of its sides must be open
- clear all pairs to finish the board

On top of that, Solong adds a small learning layer.

When you match a new type of tile for the first time, you unlock a short knowledge card explaining what it is.

The game also keeps track of how many topics you have discovered during the current run.

## Features

- Mahjong Solitaire-inspired gameplay
- solvable board generation
- 24 learning topics
- knowledge cards
- discovery progress
- score and timer
- hints
- shuffle
- undo
- responsive interface
- Discord Activity support
- browser version

## Tech stack

- Vue 3
- TypeScript
- Vite
- Discord Embedded App SDK
- Cloudflare Workers for deployment

## Run locally

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
VITE_DISCORD_CLIENT_ID=your_discord_application_id
```

Start the development server:

```bash
npm run dev
```

Build the production version:

```bash
npm run build
```

The production files will be generated in the `dist` folder.

## Discord Activity

Solong can run directly inside Discord using the Discord Embedded App SDK.

For local testing inside Discord, you need your own Discord application and its Application ID.

The Discord Client Secret should never be stored in the frontend.

## Current state

Solong is currently an MVP.

The main game is playable, knowledge cards work, and the project can run both in a normal browser and as a Discord Activity.

I may add more features later, for example:

- achievements
- quizzes
- leaderboard
- Discord profiles
- more levels
- more learning topics

For now, I want to keep the project simple and easy to understand.

## Live version

https://solong.mihail-allo3065.workers.dev

## Disclaimer

Solong is an independent educational project.

It is not an official product of Discord, Solana Foundation, or any of the third-party projects mentioned in the game.

The information inside the game is provided for educational purposes and should not be treated as financial or investment advice.