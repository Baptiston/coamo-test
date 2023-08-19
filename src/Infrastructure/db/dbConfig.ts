interface DBConfig {
    driver: string
    host: string
    port: number
    user: string
    password: string
    database: string
}

export const getDbConfig = (): DBConfig => {

    let dbConfig: DBConfig = {
        driver: process.env.DB_DRIVER,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }

    return dbConfig
}
