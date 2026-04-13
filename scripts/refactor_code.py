import json
import os
import re

def refactor_file(file_path, mapping):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Ensure useTranslation is imported and used
    has_use_t = "useTranslation()" in content
    needs_use_t = False
    
    # Sort mapping by length of text descending to avoid partial matches
    sorted_texts = sorted(mapping.keys(), key=len, reverse=True)
    
    new_content = content
    
    # Process Props first: label="Text" -> label={t('key')}
    for text in sorted_texts:
        key = mapping[text]
        # Regex for common props like label="Text" or placeholder='Text'
        # We look for label="Text" and replace with label={t('key')}
        # Note: we need to handle both single and double quotes
        for prop in ['label', 'placeholder', 'title', 'description', 'desc', 'text']:
            pattern = re.compile(rf'{prop}=([\'"]){re.escape(text)}\1')
            if pattern.search(new_content):
                new_content = pattern.sub(rf'{prop}={{t("{key}")}}', new_content)
                needs_use_t = True

    # Process JSX Text: >Text< -> >{t('key')}<
    for text in sorted_texts:
        key = mapping[text]
        pattern = re.compile(rf'>\s*{re.escape(text)}\s*<')
        if pattern.search(new_content):
            new_content = pattern.sub(rf'>{{t("{key}")}}<', new_content)
            needs_use_t = True

    # Process Strings in Objects/Variables: 'Text' -> t('key')
    # This is risky, but we limit it to common keys in objects or arrays
    for text in sorted_texts:
        key = mapping[text]
        # Only replace if it's likely a UI string, e.g. in a list of categories or options
        # We look for things like: name: 'Text', or [ 'Text', ... ]
        # Regex: (key: |\[|,)\s*['"]Text['"]
        pattern = re.compile(rf'([:\[,]\s*)([\'"]){re.escape(text)}\2')
        if pattern.search(new_content):
            new_content = pattern.sub(rf'\1t("{key}")', new_content)
            needs_use_t = True

    if needs_use_t and not has_use_t:
        # Add import
        if 'import { useTranslation } from "react-i18next";' not in new_content:
            new_content = 'import { useTranslation } from "react-i18next";\n' + new_content
        
        # Add hook initialization
        # Find the line like: export default function ... {
        # and add const { t } = useTranslation();
        func_pattern = re.compile(r'(export\s+default\s+function\s+\w+\s*\([^)]*\)\s*\{)')
        if func_pattern.search(new_content):
            new_content = func_pattern.sub(r'\1\n  const { t } = useTranslation();', new_content)

    return new_content

def main():
    if not os.path.exists('string_mapping.json'):
        print("Run batch_translate.py first")
        return

    with open('string_mapping.json', 'r', encoding='utf-8') as f:
        mapping = json.load(f)

    root_dir = 'src'
    for root, dirs, files in os.walk(root_dir):
        if 'node_modules' in root or 'locales' in root or 'lib' in root:
            continue
        for file in files:
            if file.endswith('.tsx'):
                path = os.path.join(root, file)
                print(f"Refactoring {path}...")
                new_code = refactor_file(path, mapping)
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_code)

if __name__ == "__main__":
    main()
