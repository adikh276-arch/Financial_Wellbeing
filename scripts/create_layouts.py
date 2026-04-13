import os

layouts = {
    'src/app/budget-planner': 'Budget Planner',
    'src/app/goal-planner': 'Goal Planner',
    'src/app/investment-planner': 'Investment Planner',
    'src/app/loan-emi-planner': 'Loan & EMI Planner',
    'src/app/financial-health-score': 'Financial Health Score',
    'src/app/emergency-fund': 'Emergency Fund',
    'src/app/learn': 'Financial Learn Hub',
    'src/app/check-ins': 'Financial Check-ins',
    'src/app/explore': 'Explore Finance',
}

# Sub-pages
sub_pages = {
    'src/app/check-ins/investment-readiness': 'Investment Readiness',
    'src/app/check-ins/money-stress-quiz': 'Money Stress Quiz',
    'src/app/check-ins/savings-check-up': 'Savings Check-up',
    'src/app/check-ins/spending-style-quiz': 'Spending Style Quiz',
    'src/app/explore/financial-articles': 'Financial Articles',
    'src/app/explore/financial-faqs': 'Financial FAQs',
    'src/app/explore/financial-myths': 'Financial Myths',
    'src/app/explore/financial-stories': 'Financial Stories',
    'src/app/explore/financial-tips': 'Financial Tips',
    'src/app/learn/50-30-20-rule': '50/30/20 Rule',
    'src/app/learn/avoid-common-money-mistakes': 'Common Money Mistakes',
    'src/app/learn/budgeting-basics': 'Budgeting Basics',
    'src/app/learn/debt-management': 'Debt Management',
    'src/app/learn/emergency-fund': 'Emergency Fund Basics',
    'src/app/learn/financial-goals': 'Setting Financial Goals',
    'src/app/learn/investing-basics': 'Investing Basics',
    'src/app/learn/mindful-spending': 'Mindful Spending',
    'src/app/learn/plan-for-your-future': 'Plan for Your Future',
    'src/app/learn/saving-habits': 'Saving Habits',
    'src/app/learn/understand-your-income-expenses': 'Understanding Income & Expenses',
    'src/app/learn/your-money-priorities': 'Your Money Priorities',
}

def create_layout(dir_path, title):
    content = "import type { Metadata } from 'next';\n\n"
    content += "export const metadata: Metadata = {\n"
    content += f"  title: '{title}',\n"
    content += "};\n\n"
    content += "export default function Layout({ children }: { children: React.ReactNode }) {\n"
    content += "  return <>{children}</>;\n"
    content += "}\n"

    if not os.path.exists(dir_path):
        os.makedirs(dir_path, exist_ok=True)
    
    path = os.path.join(dir_path, 'layout.tsx').replace('\\', '/')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Created layout for: {dir_path}")

all_items = {**layouts, **sub_pages}
for dir_path, title in all_items.items():
    create_layout(dir_path, title)
