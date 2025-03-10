import { type EnvType, load } from 'ts-dotenv'

export type Env = EnvType<typeof schema>

export const schema = {
    NODE_ENV: ['production' as const, 'development' as const],
    PORT: Number,
}

export let env: Env

export function loadEnv(): void {
    env = load(schema)
}
