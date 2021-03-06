const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');
//console.log(uuidv4());

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT
});

const query = (query_text, callback) => {
  pool.query(query_text, (err, res) => {callback(err, res)});
}

module.exports.query = query;