import os

pages = {
    'src/app/page.tsx': 'Dashboard',
    'src/app/budget-planner/page.tsx': 'Budget Planner',
    'src/app/goal-planner/page.tsx': 'Goal Planner',
    'src/app/investment-planner/page.tsx': 'Investment Planner',
    'src/app/loan-emi-planner/page.tsx': 'Loan & EMI Planner',
    'src/app/financial-health-score/page.tsx': 'Financial Health Score',
    'src/app/emergency-fund/page.tsx': 'Emergency Fund',
    'src/app/learn/page.tsx': 'Financial Learn Hub',
    'src/app/check-ins/page.tsx': 'Financial Check-ins',
    'src/app/explore/page.tsx': 'Explore Finance',
    'src/app/check-ins/investment-readiness/page.tsx': 'Investment Readiness',
    'src/app/check-ins/money-stress-quiz/page.tsx': 'Money Stress Quiz',
    'src/app/check-ins/savings-check-up/page.tsx': 'Savings Check-up',
    'src/app/check-ins/spending-style-quiz/page.tsx': 'Spending Style Quiz',
    'src/app/explore/financial-articles/page.tsx': 'Financial Articles',
    'src/app/explore/financial-faqs/page.tsx': 'Financial FAQs',
    'src/app/explore/financial-myths/page.tsx': 'Financial Myths',
    'src/app/explore/financial-stories/page.tsx': 'Financial Stories',
    'src/app/explore/financial-tips/page.tsx': 'Financial Tips',
    'src/app/learn/50-30-20-rule/page.tsx': '50/30/20 Rule',
    'src/app/learn/avoid-common-money-mistakes/page.tsx': 'Common Money Mistakes',
    'src/app/learn/budgeting-basics/page.tsx': 'Budgeting Basics',
    'src/app/learn/debt-management/page.tsx': 'Debt Management',
    'src/app/learn/emergency-fund/page.tsx': 'Emergency Fund Basics',
    'src/app/learn/financial-goals/page.tsx': 'Setting Financial Goals',
    'src/app/learn/investing-basics/page.tsx': 'Investing Basics',
    'src/app/learn/mindful-spending/page.tsx': 'Mindful Spending',
    'src/app/learn/plan-for-your-future/page.tsx': 'Plan for Your Future',
    'src/app/learn/saving-habits/page.tsx': 'Saving Habits',
    'src/app/learn/understand-your-income-expenses/page.tsx': 'Understanding Income & Expenses',
    'src/app/learn/your-money-priorities/page.tsx': 'Your Money Priorities',
}

def inject_metadata(path, title):
    if not os.path.exists(path):
        return
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'export const metadata' in content:
        return
        
    # Inject after imports
    lines = content.split('\n')
    last_import = 0
    for i, line in enumerate(lines[:15]):
        if line.startswith('import ') or line.startswith("'use client'"):
            last_import = i
            
    # We need Metadata type import if not present
    if "import { Metadata }" not in content and "import type { Metadata }" not in content:
        if lines[0].startswith("'use client'"):
            lines.insert(1, "import type { Metadata } from 'next';")
            last_import += 1
        else:
            lines.insert(0, "import type { Metadata } from 'next';")
            last_import += 1
            
    metadata_block = f"\nexport const metadata: Metadata = {{\n  title: '{title}',\n}};"
    lines.insert(last_import + 1, metadata_block)
    
    with open(path, 'w', encoding='utf-8', newline='') as f:
        f.write('\n'.join(lines))
    print(f"Injected metadata for: {path}")

for path, title in pages.items():
    inject_metadata(path, title)
