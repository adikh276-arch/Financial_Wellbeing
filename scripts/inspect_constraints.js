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

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    const res = await pool.query(`
      SELECT conname, contype, relname as table_name
      FROM pg_constraint c
      JOIN pg_class t ON c.conrelid = t.oid
      JOIN pg_namespace n ON t.relnamespace = n.oid
      WHERE n.nspname = 'financial_wellbeing'
    `);
    console.log('Constraints in financial_wellbeing:');
    res.rows.forEach(r => console.log(`- ${r.table_name}: ${r.conname} (${r.contype})`));
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await pool.end();
  }
}

run();
