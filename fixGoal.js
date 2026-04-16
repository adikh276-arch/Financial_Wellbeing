const fs = require('fs');
const file = 'src/app/goal-planner/page.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/\{goals\.length\}\s+active goals/g, "{t('{{count}} active goals', { count: goals.length })}");
content = content.replace(/'Modify Goal'/g, "t('Modify Goal')");
content = content.replace(/'Define Strategic Goal'/g, "t('Define Strategic Goal')");
content = content.replace(/'Update Strategy'/g, "t('Update Strategy')");
content = content.replace(/'Deploy Goal'/g, "t('Deploy Goal')");
content = content.replace(/{goal\.priority}/g, "{t(goal.priority)}");
content = content.replace(/`\$\{months\} months`/g, "t('{{count}} months', { count: months })");

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed Goal Planner.');
