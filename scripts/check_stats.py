import json
import os

def main():
    if not os.path.exists('found_strings.json'):
        print("Run scan_strings.py first")
        return

    with open('found_strings.json', 'r', encoding='utf-8') as f:
        found_strings = json.load(f)
    
    total_strings = len(found_strings)
    locales_dir = 'src/locales'
    langs = [d for d in os.listdir(locales_dir) if os.path.isdir(os.path.join(locales_dir, d))]
    
    print(f"--- Translation Statistics ---")
    print(f"Total Unique UI Strings: {total_strings}")
    print(f"Total Target Languages:  {len(langs)}")
    print(f"\nCompletion Status:")
    print(f"{'Lang':<6} | {'Translated':<10} | {'Progress':<8}")
    print("-" * 30)
    
    for lang in sorted(langs):
        file_path = os.path.join(locales_dir, lang, 'common.json')
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            # Count how many of the found_strings are keys in the data
            translated_count = 0
            for s in found_strings:
                if s in data and data[s] != s: # If key exists and value is NOT the same as key (implies translation happened)
                    translated_count += 1
                elif lang == 'en' and s in data: # EN is 100% by definition
                    translated_count += 1
            
            pct = (translated_count / total_strings) * 100
            print(f"{lang:<6} | {translated_count:<10} | {pct:>6.1f}%")
        else:
            print(f"{lang:<6} | {'Missing':<10} | 0.0%")

if __name__ == "__main__":
    main()
