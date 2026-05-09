const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const targetModule = process.argv[2];

if (!targetModule) {
  console.error('Please provide a module path relative to src/app. Example: budget-planner');
  process.exit(1);
}

const modulePath = path.join('src/app', targetModule);
const outputDir = path.join(modulePath, 'i18n');

if (!fs.existsSync(modulePath)) {
  console.error(`Module path not found: ${modulePath}`);
  process.exit(1);
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log(`Extracting translations for module: ${targetModule}...`);

const config = {
  contextSeparator: '_',
  defaultValue: (locale, namespace, key) => {
    return key;
  },
  indentation: 2,
  keepRemoved: false,
  keySeparator: false,
  lexers: {
    ts: ['JsxLexer'],
    tsx: ['JsxLexer'],
    js: ['JsxLexer'],
    jsx: ['JsxLexer'],
    default: ['JsxLexer'],
  },
  locales: ['en'],
  namespaceSeparator: false,
  output: path.join(process.cwd(), outputDir, '$LOCALE.json'),
  input: [path.join(process.cwd(), modulePath, '**/*.{ts,tsx}')],
  sort: true,
};

const configPath = path.join(__dirname, 'i18next-parser.config.js');
fs.writeFileSync(configPath, `module.exports = ${JSON.stringify(config, null, 2)}`);

try {
  execSync(`npx i18next-parser --config "${configPath}"`, { stdio: 'inherit' });
  
  // Post-process en.json to ensure values = keys
  const enPath = path.join(process.cwd(), outputDir, 'en.json');
  if (fs.existsSync(enPath)) {
    const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    let changed = false;
    Object.keys(enData).forEach(key => {
      if (enData[key] === "") {
        enData[key] = key;
        changed = true;
      }
    });
    if (changed) {
      fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');
    }
  }
  
  console.log(`Extraction complete! Files generated in ${outputDir}`);
} catch (error) {
  console.error('Extraction failed:', error.message);
}
