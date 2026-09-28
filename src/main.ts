import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { initDiscord } from './discord'

async function bootstrap() {
  try {
    await initDiscord()
    console.log('Running inside Discord')
  } catch (error) {
    console.warn(
      'Discord SDK is not available. Running in browser mode.',
      error
    )
  }

  createApp(App).mount('#app')
}

bootstrap()