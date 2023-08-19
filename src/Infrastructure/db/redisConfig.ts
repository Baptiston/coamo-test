import { ClientOpts, createClient } from 'redis'

const redisConfig = createClient({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD
})

export default redisConfig as ClientOpts
