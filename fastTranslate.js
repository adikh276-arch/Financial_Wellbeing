const fs = require('fs');

const langs = [
  'ar', 'bn', 'zh', 'nl', 'fr', 'de', 'hi', 'id', 'it', 'ja', 
  'ko', 'pl', 'pt', 'ru', 'es', 'tl', 'th', 'tr', 'vi'
];

async function translateText(text, targetLang) {
  try {
    const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=" + targetLang + "&dt=t&q=" + encodeURIComponent(text);
    const res = await fetch(url);
    if (!res.ok) throw new Error('status ' + res.status);
    const data = await res.json();
    return data[0].map(x => x[0]).join('');
  } catch(e) {
    return text; // fallback
  }
}

async function run() {
  const enJson = JSON.parse(fs.readFileSync('src/locales/en/common.json', 'utf8'));
  
  // Create jobs
  const jobs = [];
  for (const lang of langs) {
    const path = "src/locales/" + lang + "/common.json";
    let langJson = {};
    if (fs.existsSync(path)) {
       langJson = JSON.parse(fs.readFileSync(path, 'utf8'));
    }

    let missing = [];
    for (const key of Object.keys(enJson)) {
       if (!langJson[key] || langJson[key] === "\${encodeURIComponent(text)}") {
           missing.push(key);
       }
    }

    if (missing.length > 0) {
      console.log("Found " + missing.length + " missing for " + lang);
      jobs.push({ lang, path, langJson, missing });
    }
  }

  // Execute jobs concurrently with delay limit inside each queue
  const concurrencyLimit = 15;
  for (let i = 0; i < jobs.length; i += concurrencyLimit) {
      const batch = jobs.slice(i, i + concurrencyLimit);
      await Promise.all(batch.map(async job => {
          for (const key of job.missing) {
              job.langJson[key] = await translateText(key, job.lang);
              await new Promise(r => setTimeout(r, Math.random() * 50 + 20)); // jitter
          }
          fs.writeFileSync(job.path, JSON.stringify(job.langJson, null, 2));
      }));
      console.log("Finished batch...");
  }
  console.log('Translations synced fast.');
}
run();
