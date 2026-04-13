import os
import re
import json

def extract_strings(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Regex for text inside tags: >Text<
    # Exclude tags that are likely code or empty
    jsx_text = re.findall(r'>([^<{>\n\t\r ][^<{>\n\t\r]*?)<', content)
    
    # Regex for common props: label, placeholder, title, description, desc
    prop_text = re.findall(r"(?:label|placeholder|title|description|desc|text|options|tips|pros|cons):\s*['\"]([^'\"]+?)['\"]", content)
    
    # Regex for static arrays like const QUESTIONS = [...]
    # This is harder, but let's see what we get
    
    return set(jsx_text + prop_text)

def main():
    root_dir = 'src'
    all_strings = set()
    files_to_scan = []
    
    for root, dirs, files in os.walk(root_dir):
        if 'node_modules' in root or 'locales' in root or 'lib' in root:
            continue
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                files_to_scan.append(os.path.join(root, file))
    
    for file in files_to_scan:
        strings = extract_strings(file)
        all_strings.update(strings)
        print(f"Scanned {file}: Found {len(strings)} strings")

    print(f"\nTotal unique strings found: {len(all_strings)}")
    
    with open('found_strings.json', 'w', encoding='utf-8') as f:
        json.dump(sorted(list(all_strings)), f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    main()
