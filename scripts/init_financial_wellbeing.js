const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function init() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("DATABASE_URL not set in environment");
    return;
  }
  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('Initializing Extended Financial Wellbeing Schema...');
    
    await pool.query('CREATE SCHEMA IF NOT EXISTS financial_wellbeing;');
    
    const tables = [
      `CREATE TABLE IF NOT EXISTS financial_wellbeing.health_scores (
        user_id TEXT PRIMARY KEY,
        score INT,
        data JSONB,
        updated_at TIMESTAMP DEFAULT NOW()
      );`,
      `CREATE TABLE IF NOT EXISTS financial_wellbeing.budgets (
        user_id TEXT PRIMARY KEY,
        data JSONB,
        updated_at TIMESTAMP DEFAULT NOW()
      );`,
      `CREATE TABLE IF NOT EXISTS financial_wellbeing.investment_plans (
        user_id TEXT PRIMARY KEY,
        data JSONB,
        updated_at TIMESTAMP DEFAULT NOW()
      );`,
      `CREATE TABLE IF NOT EXISTS financial_wellbeing.goals (
        user_id TEXT PRIMARY KEY,
        data JSONB,
        updated_at TIMESTAMP DEFAULT NOW()
      );`,
      `CREATE TABLE IF NOT EXISTS financial_wellbeing.loan_calculations (
        user_id TEXT PRIMARY KEY,
        data JSONB,
        updated_at TIMESTAMP DEFAULT NOW()
      );`,
      `CREATE TABLE IF NOT EXISTS financial_wellbeing.emergency_funds (
        user_id TEXT PRIMARY KEY,
        data JSONB,
        updated_at TIMESTAMP DEFAULT NOW()
      );`,
      // Multi-row history tables (No user_id PK)
      `CREATE TABLE IF NOT EXISTS financial_wellbeing.loan_history (
        id SERIAL PRIMARY KEY,
        user_id TEXT,
        data JSONB,
        updated_at TIMESTAMP DEFAULT NOW()
      );`,
      `CREATE TABLE IF NOT EXISTS financial_wellbeing.budget_history (
        id SERIAL PRIMARY KEY,
        user_id TEXT,
        data JSONB,
        updated_at TIMESTAMP DEFAULT NOW()
      );`,
      `CREATE TABLE IF NOT EXISTS financial_wellbeing.emergency_fund_history (
        id SERIAL PRIMARY KEY,
        user_id TEXT,
        data JSONB,
        updated_at TIMESTAMP DEFAULT NOW()
      );`,
      `CREATE TABLE IF NOT EXISTS financial_wellbeing.spending_style_history (
        id SERIAL PRIMARY KEY,
        user_id TEXT,
        data JSONB,
        updated_at TIMESTAMP DEFAULT NOW()
      );`,
      `CREATE TABLE IF NOT EXISTS financial_wellbeing.investment_history (
        id SERIAL PRIMARY KEY,
        user_id TEXT,
        data JSONB,
        updated_at TIMESTAMP DEFAULT NOW()
      );`,
      `CREATE TABLE IF NOT EXISTS financial_wellbeing.health_score_history (
        id SERIAL PRIMARY KEY,
        user_id TEXT,
        data JSONB,
        updated_at TIMESTAMP DEFAULT NOW()
      );`,
      `CREATE TABLE IF NOT EXISTS financial_wellbeing.quiz_results (
        id SERIAL PRIMARY KEY,
        user_id TEXT,
        quiz_type TEXT,
        score INT,
        data JSONB,
        created_at TIMESTAMP DEFAULT NOW()
      );`
    ];

    for (const sql of tables) {
      await pool.query(sql);
    }

    console.log('Extended schema initialization successful!');
  } catch (err) {
    console.error('Schema initialization failed:', err);
  } finally {
    await pool.end();
  }
}

init();
