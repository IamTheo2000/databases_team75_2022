const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'vaseis',
    password: 'Thalis2021',
    port: 5432,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}