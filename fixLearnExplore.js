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

const files = getAllFiles('src/app/learn', []).concat(getAllFiles('src/app/explore', [])).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // 1. Target props
  const props = ['title', 'subtitle', 'heading', 'introduction', 'category', 'label', 'desc'];
  props.forEach(p => {
    // Regex that handles escaped quotes slightly better
    const reg = new RegExp(`(${p})=["']((?:[^"']|\\\\.)+)["']`, 'g');
    content = content.replace(reg, (match, prop, val) => {
        if (val.includes(' ') || val.length > 5) {
            changed = true;
            return `${prop}={t(${JSON.stringify(val)})}`;
        }
        return match;
    });
  });

  // 2. Target array strings
  const arrReg = /(content|keyTakeaways|actionSteps|sections):\s*\[([\s\S]+?)\]\s*(?:,|\})/g;
  content = content.replace(arrReg, (match, prop, elements) => {
      const newElements = elements.replace(/['"]((?:[^"']|\\\\.)+)['"]/g, (m, val) => {
          if ((val.includes(' ') || val.length > 8) && !val.includes('var(') && !val.includes('t(')) {
              changed = true;
              return `t(${JSON.stringify(val)})`;
          }
          return m;
      });
      return `${prop}: [${newElements}]`;
  });

  if (changed) {
    fs.writeFileSync(file, content);
    console.log('Fixed learn/explore page correctly:', file);
  }
});
