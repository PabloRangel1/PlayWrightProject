const {Pool} = require('pg')

const DbCofig = {
  user: 'postgres',
  host: 'localhost',
  database: 'zombieplus',
  password: 'pwd123',
  port: 5432
}

export async function executeSQL(sqlScript) {
    try {
        const pool = new Pool(DbCofig)
        const client = await pool.connect()

        const result = await client.query(sqlScript)
        console.log(result.rows)
    } catch (error) {
        console.log('Erro ao executar SQL' + error)
    }
}