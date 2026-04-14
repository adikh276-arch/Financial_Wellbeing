import json
import os
import concurrent.futures
from deep_translator import GoogleTranslator
import time

LANGS = ["ar", "bn", "de", "es", "fr", "gu", "hi", "it", "ja", "kn", "ko", "ml", "mr", "pa", "pt", "ru", "ta", "te", "zh"]
# Note: folder is 'zh', target is 'zh-CN'

def process_lang(lang, texts):
    target_lang = 'zh-CN' if lang == 'zh' else lang
    try:
        translator = GoogleTranslator(source='en', target=target_lang)
        # Deep translator might fail on large batches. We break into chunks of 100
        print(f"[{lang}] Starting translation for {len(texts)} keys...")
        
        translated_texts = []
        chunk_size = 50
        for i in range(0, len(texts), chunk_size):
            chunk = texts[i:i+chunk_size]
            # Retry mechanism
            for attempt in range(3):
                try:
                    res = translator.translate_batch(chunk)
                    translated_texts.extend(res)
                    break
                except Exception as e:
                    print(f"[{lang}] Chunk error: {e}, retrying...")
                    time.sleep(2)
            else:
                # If all retries fail, just use English
                print(f"[{lang}] Chunk translation failed completely. Using original.")
                translated_texts.extend(chunk)
                
            time.sleep(0.5)

        results = {}
        for original, translated in zip(texts, translated_texts):
            results[original] = translated if translated else original
            
        out_dir = f'src/locales/{lang}'
        os.makedirs(out_dir, exist_ok=True)
        with open(f'{out_dir}/common.json', 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2, ensure_ascii=False)
        print(f"[{lang}] Successfully wrote {len(results)} translated strings.")
    except Exception as e:
        print(f"[{lang}] Failed completely: {e}")

def main():
    print("Loading english string keys...")
    with open('src/locales/en/common.json', 'r', encoding='utf-8') as f:
        en_data = json.load(f)
    
    texts = list(en_data.keys())
    
    # Process sequentially to avoid abusing ratelimits and getting banned
    # Or small thread pool
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
        futures = [executor.submit(process_lang, lang, texts) for lang in LANGS]
        concurrent.futures.wait(futures)

if __name__ == '__main__':
    main()
