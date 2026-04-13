const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

let connectionString;
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/DATABASE_URL=(.*)/);
  if (match) connectionString = match[1].trim();
}

if (!connectionString) {
  console.error('DATABASE_URL not found in .env.local');
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    const res = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'financial_wellbeing'
    `);
    console.log('Tables in financial_wellbeing schema:');
    res.rows.forEach(r => console.log(`- ${r.table_name}`));
  } catch (err) {
    console.error('Error fetching tables:', err.message);
  } finally {
    await pool.end();
  }
}

run();
