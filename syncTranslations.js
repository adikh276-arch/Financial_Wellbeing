const fs = require('fs');
const https = require('https');

// Read API Key from .env.local
const env = fs.readFileSync('.env.local', 'utf8');
const API_KEY = env.match(/GOOGLE_TRANSLATE_API_KEY=(.*)/)[1].trim();

const langs = [
  'ar', 'bn', 'zh', 'nl', 'fr', 'de', 'hi', 'id', 'it', 'ja', 
  'ko', 'pl', 'pt', 'ru', 'es', 'tl', 'th', 'tr', 'vi'
];

async function translateBatch(keys, targetLang) {
    if (!API_KEY) throw new Error("API Key missing");
    
    return new Promise((resolve) => {
        const data = JSON.stringify({
            q: keys,
            target: targetLang
        });

        const options = {
            hostname: 'translation.googleapis.com',
            path: `/language/translate/v2?key=${API_KEY}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(body);
                    if (json.data && json.data.translations) {
                        resolve(json.data.translations.map(t => t.translatedText));
                    } else {
                        console.error("\nError for " + targetLang + " Batch: " + JSON.stringify(keys).substring(0, 100) + "...", json);
                        resolve(keys); // Fallback to original
                    }
                } catch (e) {
                    console.error("\nParse Error for " + targetLang, e);
                    resolve(keys);
                }
            });
        });

        req.on('error', (e) => {
            console.error("\nRequest Error for " + targetLang, e);
            resolve(keys);
        });

        req.write(data);
        req.end();
    });
}

async function run() {
  const enJson = JSON.parse(fs.readFileSync('src/locales/en/common.json', 'utf8'));
  
  for (const lang of langs) {
    const path = "src/locales/" + lang + "/common.json";
    let langJson = fs.existsSync(path) ? JSON.parse(fs.readFileSync(path, 'utf8')) : {};

    let missing = Object.keys(enJson).filter(k => !langJson[k] || langJson[k] === k);

    if (missing.length > 0) {
      console.log("\nTranslating " + missing.length + " for " + lang + "...");
      // Using batch size 20 to be safe and adding a delay
      for (let i = 0; i < missing.length; i += 20) {
          const chunk = missing.slice(i, i + 20);
          const results = await translateBatch(chunk.map(k => enJson[k]), lang);
          chunk.forEach((key, j) => {
             langJson[key] = results[j] || key;
          });
          process.stdout.write('.');
          await new Promise(r => setTimeout(r, 1000)); // Rate limit protection
      }
      fs.writeFileSync(path, JSON.stringify(langJson, null, 2));
      console.log(" Done.");
    }
  }
}

run();
