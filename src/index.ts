import { createApp } from './app'
import { env, loadEnv } from './env'

loadEnv()

const app = createApp()
app.listen({ port: env.PORT })
