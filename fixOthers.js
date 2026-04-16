const fs = require('fs');

// Investment Planner
const investFile = 'src/app/investment-planner/page.tsx';
let invest = fs.readFileSync(investFile, 'utf8');
invest = invest.replace(/Forecasted Wealth \(\$\{form\.period\}Y\)/g, "{t('Forecasted Wealth ({{count}}Y)', { count: form.period })}");
invest = invest.replace(/\{profile\.label\} Strategy/g, "{t('{{strategy}} Strategy', { strategy: t(profile.label) })}");
invest = invest.replace(/\{saved \? 'Success' : 'Save'\}/g, "{saved ? t('Success') : t('Save')}");
invest = invest.replace(/setStep\(0\); setForm\(INIT_FORM\);/g, "setStep(0); setForm({ amount: 0, period: 5, risk: 'Moderate', goal: 'Wealth Creation', monthly: 0 });");
fs.writeFileSync(investFile, invest, 'utf8');
console.log('Fixed Investment Planner.');

// Budget Planner
const budgetFile = 'src/app/budget-planner/page.tsx';
let budget = fs.readFileSync(budgetFile, 'utf8');
budget = budget.replace(/\{surplus >= 0 \? 'Monthly Surplus' : 'Monthly Deficit'\}/g, "{surplus >= 0 ? t('Monthly Surplus') : t('Monthly Deficit')}");
budget = budget.replace(/\{saved \? 'Saved!' : 'Save Result'\}/g, "{saved ? t('Saved!') : t('Save Result')}");
budget = budget.replace(/label="Savings"/g, "label={t('Savings')}");
budget = budget.replace(/\{d\.name\}/g, "{t(d.name)}");
fs.writeFileSync(budgetFile, budget, 'utf8');
console.log('Fixed Budget Planner.');
