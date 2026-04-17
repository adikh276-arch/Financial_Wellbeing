const fs = require('fs');
const path = require('path');

const found = JSON.parse(fs.readFileSync('found_strings.json', 'utf8'));

Object.keys(found).forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  const items = found[file].sort((a, b) => b.text.length - a.text.length);

  items.forEach(item => {
    let search;
    let replacement;
    const rawVal = item.text.replace(/\\'/g, "'").replace(/\\"/g, '"');

    if (item.type === 'JSX_TEXT_SAFE') {
        const escapedText = item.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const reg = new RegExp(`>\\s*${escapedText}\\s*<`, 'g');
        if (reg.test(content)) {
            content = content.replace(reg, `>{t(${JSON.stringify(rawVal)})}<`);
            changed = true;
        }
    } else if (item.type === 'PROP') {
        search = `${item.prop}=${item.quote}${item.text}${item.quote}`;
        replacement = `${item.prop}={t(${JSON.stringify(rawVal)})}`;
    } else if (item.type === 'OBJ_KEY') {
        search = `${item.prop}: ${item.quote}${item.text}${item.quote}`;
        replacement = `${item.prop}: t(${JSON.stringify(rawVal)})`;
    }

    if (search && content.includes(search)) {
        content = content.replace(search, replacement);
        changed = true;
    } else if (item.type === 'OBJ_KEY') {
        search = `${item.prop}:${item.quote}${item.text}${item.quote}`;
        if (content.includes(search)) {
            content = content.replace(search, `${item.prop}: t(${JSON.stringify(rawVal)})`);
            changed = true;
        }
    }
  });

  if (changed) {
    if (!content.includes('useTranslation')) {
        content = content.replace(/import {/, "import { useTranslation,");
        if (!content.includes('useTranslation')) {
             content = "import { useTranslation } from 'react-i18next';\n" + content;
        }
    }
    if (!content.includes('const { t } = useTranslation();')) {
        content = content.replace(/(export default function \w+.*{)/, "$1\n  const { t } = useTranslation();");
    }
    fs.writeFileSync(file, content);
    console.log('Processed:', file);
  }
});
