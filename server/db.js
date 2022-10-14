const Pool = require("pg").Pool;
const pool = new Pool({
  // user: "postgres",
  // password: "root",
  // host: "localhost",
  // port: 5432,
  // database: "postgres",
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

module.exports = pool;
