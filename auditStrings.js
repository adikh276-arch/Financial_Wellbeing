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

const files = getAllFiles('src/app', []).filter(f => f.endsWith('.tsx'));
const found = {};

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // 1. Props with literal strings
  const props = ['label', 'title', 'subtitle', 'desc', 'heading', 'text', 'introduction', 'category', 'preview', 'myth', 'reality', 'content', 'readTime'];
  props.forEach(prop => {
      // prop="Text"
      const regDouble = new RegExp(`\\b${prop}="((?:[^"\\\\]|\\\\.)+)"`, 'g');
      let match;
      while ((match = regDouble.exec(content)) !== null) {
          const text = match[1];
          if (text.length > 1 && !text.includes('t(') && !text.includes('var(')) {
              if (!found[file]) found[file] = [];
              found[file].push({ type: 'PROP', prop, text, quote: '"' });
          }
      }
      // prop='Text'
      const regSingle = new RegExp(`\\b${prop}='((?:[^'\\\\]|\\\\.)+)'`, 'g');
      while ((match = regSingle.exec(content)) !== null) {
          const text = match[1];
          if (text.length > 1 && !text.includes('t(') && !text.includes('var(')) {
              if (!found[file]) found[file] = [];
              found[file].push({ type: 'PROP', prop, text, quote: "'" });
          }
      }
  });

  // 2. Object keys literal strings
  props.forEach(prop => {
      const keyDouble = new RegExp(`\\b${prop}:\\s*"((?:[^"\\\\]|\\\\.)+)"`, 'g');
      let match;
      while ((match = keyDouble.exec(content)) !== null) {
          const text = match[1];
          if (text.length > 1 && !text.includes('t(') && !text.includes('var(')) {
              if (!found[file]) found[file] = [];
              found[file].push({ type: 'OBJ_KEY', prop, text, quote: '"' });
          }
      }
      const keySingle = new RegExp(`\\b${prop}:\\s*'((?:[^'\\\\]|\\\\.)+)'`, 'g');
      while ((match = keySingle.exec(content)) !== null) {
          const text = match[1];
          if (text.length > 1 && !text.includes('t(') && !text.includes('var(')) {
              if (!found[file]) found[file] = [];
              found[file].push({ type: 'OBJ_KEY', prop, text, quote: "'" });
          }
      }
  });

  // 3. Simple Array items (string arrays)
  const arrayRegex = /\[\s*(['"])((?:(?!\1).)+)\1(?:\s*,\s*(['"])((?:(?!\3).)+)\3)*\s*\]/g;
  // This is too complex for regex, just look for individual strings in brackets
  const simpleArrayElem = /\[\s*((?:['"](?:[^'"]+)['"]\s*,\s*)*)(['"])([^'"]+)['"]\s*\]/g;
  
  // 4. Safer JSX Text: <h1>Text</h1>
  // Only match if it's purely text (no braces, no tags) inside a common text tag
  const tags = ['h1', 'h2', 'h3', 'h4', 'p', 'span', 'button', 'div'];
  tags.forEach(tag => {
      const tagRegex = new RegExp(`<${tag}[^>]*>\\s*([^<{}>]+?)\\s*</${tag}>`, 'g');
      let match;
      while ((match = tagRegex.exec(content)) !== null) {
          const text = match[1].trim();
          if (text.length > 1 && !text.includes('t(') && isNaN(text)) {
              if (!found[file]) found[file] = [];
              found[file].push({ type: 'JSX_TEXT_SAFE', tag, text });
          }
      }
  });
});

fs.writeFileSync('found_strings.json', JSON.stringify(found, null, 2));
console.log('Safe audit done.');
