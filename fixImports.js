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

const lucideIcons = [
  'TrendingUp', 'ChevronLeft', 'ChevronRight', 'ArrowRight', 'Shield', 'Zap', 'Target', 'Check', 
  'Save', 'RotateCcw', 'PieChart', 'Landmark', 'Activity', 'BarChart3', 'Wallet', 'Search', 
  'Calculator', 'Heart', 'AlertCircle', 'Clock', 'Compass', 'Trophy', 'Rocket', 'Gem', 
  'Quote', 'MapPin', 'Plus', 'Edit2', 'Trash2', 'X', 'CheckCircle2', 'Layout', 'Calendar',
  'Plane', 'Home', 'GraduationCap', 'Car', 'Umbrella', 'AlertTriangle', 'ShoppingBag', 
  'Tv', 'Dumbbell', 'BarChart2', 'Smile', 'Utensils', 'HeartPulse', 'Info', 'Scale'
];

const files = getAllFiles('src/app', []).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // 1. Ensure useTranslation is imported if t is used
  if (content.includes('t(') && !content.includes("from 'react-i18next'")) {
    const importMatch = content.match(/^import .*? from 'react';/m);
    if (importMatch) {
       content = content.replace(importMatch[0], importMatch[0] + "\nimport { useTranslation } from 'react-i18next';");
    } else {
       content = "import { useTranslation } from 'react-i18next';\n" + content;
    }
    changed = true;
  }

  // 2. Ensure all used Lucide icons are imported
  const usedIcons = lucideIcons.filter(icon => {
     // Check for <Icon or Icon: or icon: Icon
     const regex = new RegExp(`\\b\${icon}\\b`, 'g');
     return regex.test(content);
  });

  if (usedIcons.length > 0) {
    const lucideLine = content.match(/^import \{ (.*?) \} from 'lucide-react';/m);
    if (lucideLine) {
        let currentIcons = lucideLine[1].split(',').map(i => i.trim());
        let neededIcons = usedIcons.filter(i => !currentIcons.includes(i));
        if (neededIcons.length > 0) {
            content = content.replace(lucideLine[0], `import { \${[...new Set([...currentIcons, ...neededIcons])].join(', ')} } from 'lucide-react';`);
            changed = true;
        }
    } else {
        // If no lucide-react import at all, add it after react
        const importMatch = content.match(/^import .*? from 'react';/m);
        if (importMatch) {
           content = content.replace(importMatch[0], importMatch[0] + `\nimport { \${usedIcons.join(', ')} } from 'lucide-react';`);
        } else {
           content = `import { \${usedIcons.join(', ')} } from 'lucide-react';\n` + content;
        }
        changed = true;
    }
  }

  // 3. Fix the specific broken check-in string I identified earlier
  if (content.includes("{STYLES.find(s => {t('s.id === prevResult.styleId')?.label}')}")) {
      content = content.replace("{STYLES.find(s => {t('s.id === prevResult.styleId')?.label}')}", "{t(STYLES.find(s => s.id === prevResult.styleId)?.label || '')}");
      changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
  }
}

console.log('Fixed imports and broken strings.');
