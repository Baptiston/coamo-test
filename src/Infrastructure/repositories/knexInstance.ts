import knex from 'knex'
import { getDbConfig } from '@/Infrastructure/db/dbConfig'

export function knexInstance() {
  const { host, port, user, password, database, driver } = getDbConfig()

  return knex({
    client: driver,
    connection: {
      host,
      port,
      user,
      password,
      database
    },
    pool: { min: 0, max: 10 }
  })
}
