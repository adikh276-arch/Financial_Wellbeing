const fs = require('fs');

const langs = [
  'ar', 'bn', 'zh', 'nl', 'fr', 'de', 'hi', 'id', 'it', 'ja', 
  'ko', 'pl', 'pt', 'ru', 'es', 'tl', 'th', 'tr', 'vi'
];

async function translateBatch(keys, targetLang) {
  try {
    const text = keys.join(' ||| ');
    const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=" + targetLang + "&dt=t&q=" + encodeURIComponent(text);
    const res = await fetch(url);
    if (!res.ok) throw new Error('status ' + res.status);
    const data = await res.json();
    const resultText = data[0].map(x => x[0]).join('');
    const results = resultText.split(/\s*\|\|\|\s*/);
    
    if (results.length !== keys.length) {
       return keys; 
    }
    return results;
  } catch(e) {
    return keys;
  }
}

async function run() {
  const enJson = JSON.parse(fs.readFileSync('src/locales/en/common.json', 'utf8'));
  
  for (const lang of langs) {
    const path = "src/locales/" + lang + "/common.json";
    let langJson = {};
    if (fs.existsSync(path)) {
       langJson = JSON.parse(fs.readFileSync(path, 'utf8'));
    }

    let missing = [];
    for (const key of Object.keys(enJson)) {
       if (!langJson[key]) missing.push(key);
    }

    if (missing.length > 0) {
      console.log("Translating " + missing.length + " for " + lang + "...");
      // Split into batches of 40 to avoid URL length limits
      for (let i = 0; i < missing.length; i += 40) {
          const chunk = missing.slice(i, i + 40);
          const results = await translateBatch(chunk, lang);
          for (let j = 0; j < chunk.length; j++) {
             langJson[chunk[j]] = results[j] || chunk[j];
          }
      }
      fs.writeFileSync(path, JSON.stringify(langJson, null, 2));
      await new Promise(r => setTimeout(r, 500));
    }
  }
  console.log('Done.');
}
run();
