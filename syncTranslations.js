const fs = require('fs');
const https = require('https');

const env = fs.readFileSync('.env.local', 'utf8');
const API_KEY = env.match(/GOOGLE_TRANSLATE_API_KEY=(.*)/)[1].trim();

const locales = ['ar', 'bn', 'zh', 'nl', 'fr', 'de', 'hi', 'id', 'it', 'ja', 'ko', 'pl', 'pt', 'ru', 'es', 'tl', 'th', 'tr', 'vi'];

async function translateBatch(texts, target) {
    if (texts.length === 0) return [];
    return new Promise((resolve) => {
        const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
        const data = JSON.stringify({ q: texts, target });
        
        const req = https.request(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    const result = JSON.parse(body);
                    if (result.data && result.data.translations) {
                        resolve(result.data.translations.map(t => t.translatedText));
                    } else {
                        console.error("Batch error:", body.slice(0, 200));
                        resolve(texts);
                    }
                } catch (e) {
                    resolve(texts);
                }
            });
        });
        req.on('error', () => resolve(texts));
        req.write(data);
        req.end();
    });
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function sync() {
    const en = JSON.parse(fs.readFileSync('src/locales/en/common.json', 'utf8'));
    const keys = Object.keys(en);

    for (const locale of locales) {
        process.stdout.write(`Syncing ${locale}... `);
        const p = `src/locales/${locale}/common.json`;
        let target = fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : {};

        const missingKeys = keys.filter(k => !target[k] || target[k] === k);
        if (missingKeys.length === 0) {
            console.log("Up to date.");
            continue;
        }

        console.log(`Translating ${missingKeys.length} keys...`);
        const batchSize = 50;
        for (let i = 0; i < missingKeys.length; i += batchSize) {
            const batch = missingKeys.slice(i, i + batchSize);
            const results = await translateBatch(batch.map(k => en[k]), locale);
            batch.forEach((k, idx) => {
                target[k] = results[idx] || en[k];
            });
            process.stdout.write('.');
            await sleep(1000); // Wait 1s between batches
        }

        fs.writeFileSync(p, JSON.stringify(target, null, 2));
        console.log(" Done.");
    }
}

sync();
