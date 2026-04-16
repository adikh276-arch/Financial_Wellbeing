const fs = require('fs');
const f = 'src/app/learn/budgeting-basics/page.tsx';
let c = fs.readFileSync(f, 'utf8');

// Match introduction="..."
c = c.replace(/introduction="([^"]+)"/g, (m, val) => {
    return `introduction={t(${JSON.stringify(val)})}`;
});

// Match title="..."
c = c.replace(/title="([^"]+)"/g, (m, val) => {
    return `title={t(${JSON.stringify(val)})}`;
});

fs.writeFileSync(f, c);
console.log('Fixed specifically:', f);
