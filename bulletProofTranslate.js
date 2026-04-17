const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });
  return arrayOfFiles;
}

const enJson = JSON.parse(fs.readFileSync('src/locales/en/common.json', 'utf8'));

const files = getAllFiles('src/app', []).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // 1. Ternaries in JSX: {cond ? 'A' : 'B'}
  content = content.replace(/\{([^?}]+\?)\s*'([^']+)'\s*:\s*'([^']+)'\}/g, (match, cond, p1, p2) => {
      if (p1.length > 1 && !p1.includes('{') && p2.length > 1 && !p2.includes('{')) {
          enJson[p1] = p1;
          enJson[p2] = p2;
          changed = true;
          return `{ \${cond} t('\${p1.replace(/'/g, "\\\\'")}') : t('\${p2.replace(/'/g, "\\\\'")}') }`;
      }
      return match;
  });

  // 2. Props string literals: title="Title" -> title={t('Title')}
  // Except for things like style="...", className="...", key="...", type="...", min="...", max="..."
  const skipProps = ['className', 'style', 'key', 'type', 'min', 'max', 'id', 'href', 'backHref', 'fieldKey', 'color'];
  content = content.replace(/(\w+)="([^"]+)"/g, (match, prop, val) => {
      if (skipProps.includes(prop)) return match;
      if (val.length > 1 && /[a-zA-Z]/.test(val) && !val.includes('var(')) {
          enJson[val] = val;
          changed = true;
          return `\${prop}={t('\${val.replace(/'/g, "\\\\'")}')}`;
      }
      return match;
  });

  // 3. Static text nodes in JSX: >Text< -> >{t('Text')}<
  // This is tricky. We'll look for > followed by alphanumeric followed by <
  content = content.replace(/>\s*([A-Za-z0-9][^<>{}\n\r]*[A-Za-z0-9])\s*</g, (match, p1) => {
      // Skip if it looks like a number or is already translated
      if (/^\d+(\.\d+)?$/.test(p1)) return match;
      if (p1.startsWith('{') || p1.includes('t(')) return match;
      
      enJson[p1.trim()] = p1.trim();
      changed = true;
      return `>{t('\${p1.trim().replace(/'/g, "\\\\'")}')}<`;
  });

  // 4. Units in template literals: `${val} months` -> {t('{{count}} months', { count: val })}
  content = content.replace(/\{`\$\{(.*?)\}\s+(months|years)`\}/g, (match, val, unit) => {
      const key = `{{count}} \${unit}`;
      enJson[key] = key;
      changed = true;
      return `{t('\${key}', { count: \${val} })}`;
  });

  // 5. Special case for "2 active goals" etc
  content = content.replace(/\{goals\.length\}\s+active goals/g, (match) => {
      const key = '{{count}} active goals';
      enJson[key] = key;
      changed = true;
      return `{t('\${key}', { count: goals.length })}`;
  });

  // 6. Fix specifically identified missing t() in budget planner
  if (content.includes('label="Savings"')) {
      content = content.replace('label="Savings"', 'label={t("Savings")}');
      changed = true;
  }

  // 7. Fix any remaining {variable} that should be {t(variable)}
  // Like {goal.priority}, {cat}, {r}, {h.goal}, {h.riskLevel}
  const varsToWrap = [
    'goal.priority', 'goal.category', 'h.riskLevel', 'h.goal', 
    's.label', 'm.tag', 'mod.tag', 'mod.label', 'opt.label', 'opt',
    'p.label', 'profile.label', 'entry.name', 'a.name', 'd.name'
  ];
  for (const v of varsToWrap) {
      const regex = new RegExp(`>\\\\{\\${v}\\\\\}<`, 'g');
      if (regex.test(content)) {
          content = content.replace(regex, `>{t(\${v})}<`);
          changed = true;
      }
  }

  // 8. Fix the crash in InvestmentPlanner where INIT_FORM is missing
  if (file.includes('investment-planner') && content.includes('setForm(INIT_FORM)')) {
      content = content.replace('setForm(INIT_FORM)', 'setForm({ amount: 0, period: 5, risk: "Moderate", goal: "Wealth Creation", monthly: 0 })');
      changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
  }
}

fs.writeFileSync('src/locales/en/common.json', JSON.stringify(enJson, null, 2));
console.log('Fitted app with a bulletproof translation layer.');
