const Pool = require("pg").Pool;
const pool = new Pool({
  // user: "postgres",
  // password: "root",
  // host: "localhost",
  // port: 5432,
  // database: "postgres",
  pgUser: process.env.PGUSER,
  pgHost: process.env.PGHOST,
  pgDatabase: process.env.PGDATABASE,
  pgPassword: process.env.PGPASSWORD,
  pgPort: process.env.PGPORT,
});

module.exports = pool;
