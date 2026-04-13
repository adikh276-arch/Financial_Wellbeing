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
    const tables = ['health_scores', 'budgets', 'investment_plans', 'goals', 'loan_calculations', 'emergency_funds', 'quiz_results'];
    for (const table of tables) {
      const res = await pool.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_schema = 'financial_wellbeing' AND table_name = '${table}'
      `);
      console.log(`\nColumns for ${table}:`);
      res.rows.forEach(r => console.log(`- ${r.column_name} (${r.data_type})`));
    }
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await pool.end();
  }
}

run();
