'use server';

import { cookies } from 'next/headers';
import { pool } from '@/lib/db';

const KEY_TO_TABLE: Record<string, string> = {
  'financial_health_score': 'financial_wellbeing.health_scores',
  'budget': 'financial_wellbeing.budgets',
  'investment_form': 'financial_wellbeing.investment_plans',
  'goals': 'financial_wellbeing.goals',
  'loan_emi_form': 'financial_wellbeing.loan_calculations',
  'emergency_fund': 'financial_wellbeing.emergency_funds',
  'loan_history': 'financial_wellbeing.loan_history',
  'budget_history': 'financial_wellbeing.budget_history',
  'emergency_fund_history': 'financial_wellbeing.emergency_fund_history',
  'spending_style_history': 'financial_wellbeing.spending_style_history',
  'invest_history': 'financial_wellbeing.investment_history',
  'health_score_history': 'financial_wellbeing.health_score_history',
  'money_stress_history': 'financial_wellbeing.quiz_results',
  'savings_checkup_history': 'financial_wellbeing.quiz_results',
  'investment_readiness_history': 'financial_wellbeing.quiz_results',
  'budget_buddy_history': 'financial_wellbeing.budget_buddy_history',
  'debt_management_history': 'financial_wellbeing.debt_management_history',
  'savings_goal_history': 'financial_wellbeing.savings_goal_history',
};

export async function fetchUserRecord(key: string) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('financial_wellbeing_user_id')?.value;

    if (!userId || !key) return null;

    const tableName = KEY_TO_TABLE[key];
    if (!tableName) return null;

    let query = '';
    let values = [userId];

    const isMultiRow = tableName.includes('_history') || tableName.includes('quiz_results');

    if (isMultiRow) {
      if (tableName.includes('quiz_results')) {
        query = `
          SELECT data, score, quiz_type, created_at 
          FROM ${tableName} 
          WHERE user_id = $1 AND quiz_type = $2 
          ORDER BY created_at DESC 
          LIMIT 10
        `;
        values = [userId, key];
      } else {
        query = `
          SELECT data, updated_at as created_at
          FROM ${tableName} 
          WHERE user_id = $1
          ORDER BY updated_at DESC 
          LIMIT 10
        `;
      }
    } else {
      query = `SELECT data FROM ${tableName} WHERE user_id = $1`;
    }

    const res = await pool.query(query, values);

    if (res.rows.length === 0) {
      return isMultiRow ? [] : null;
    }

    if (isMultiRow) {
      return res.rows.map(r => {
        const detail = Array.isArray(r.data) ? r.data[0] : (typeof r.data === 'object' ? r.data : {});
        return {
          ...detail,
          score: r.score || detail.score || detail.totalStress,
          date: r.created_at || detail.date
        };
      });
    }

    return res.rows[0].data;
  } catch (err) {
    console.error('fetchUserRecord error');
    // We intentionally swallow specific errors to avoid leaking DB details
    return null;
  }
}

export async function saveUserRecord(key: string, data: any, score?: number) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('financial_wellbeing_user_id')?.value;

    if (!userId || !key) return { success: false, error: 'Unauthorized' };

    const tableName = KEY_TO_TABLE[key];
    if (!tableName) return { success: true, message: 'Key not mapped' };

    let query = '';
    let values: any[] = [];

    const isHistoryTable = tableName.includes('_history') || tableName.includes('quiz_results');

    if (isHistoryTable) {
      if (tableName.includes('quiz_results')) {
        query = `
          INSERT INTO ${tableName} (user_id, quiz_type, score, data, created_at)
          VALUES ($1, $2, $3, $4, NOW())
        `;
        values = [userId, key, score || 0, JSON.stringify(data)];
      } else {
        query = `
          INSERT INTO ${tableName} (user_id, data, updated_at)
          VALUES ($1, $2, NOW())
        `;
        values = [userId, JSON.stringify(data)];
      }
    } else {
      const tablesWithScore = ['financial_wellbeing.health_scores'];
      if (tablesWithScore.includes(tableName)) {
        query = `
          INSERT INTO ${tableName} (user_id, score, data, updated_at)
          VALUES ($1, $2, $3, NOW())
          ON CONFLICT (user_id) DO UPDATE SET
            score = EXCLUDED.score,
            data = EXCLUDED.data,
            updated_at = NOW()
        `;
        values = [userId, score || 0, JSON.stringify(data)];
      } else {
        query = `
          INSERT INTO ${tableName} (user_id, data, updated_at)
          VALUES ($1, $2, NOW())
          ON CONFLICT (user_id) DO UPDATE SET
            data = EXCLUDED.data,
            updated_at = NOW()
        `;
        values = [userId, JSON.stringify(data)];
      }
    }

    await pool.query(query, values);
    return { success: true };
  } catch (err) {
    console.error('saveUserRecord error');
    // Return a generic error to the client, hiding DB specific errors
    return { success: false, error: 'Server error' };
  }
}
