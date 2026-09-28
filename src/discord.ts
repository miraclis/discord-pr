import { DiscordSDK } from '@discord/embedded-app-sdk'

const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID

if (!clientId) {
  throw new Error('VITE_DISCORD_CLIENT_ID is missing')
}

export const discordSdk = new DiscordSDK(clientId)

export async function initDiscord() {
  await discordSdk.ready()

  console.log('Discord SDK ready')
}