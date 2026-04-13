import os
import re
import json

# List of files already handled or to skip
SKIP_FILES = ['LearnModule.tsx', 'Sidebar.tsx', 'BottomNav.tsx', 'I18nProvider.tsx']

def smart_refactor(file_path, found_strings):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip if already using t() extensively or if in SKIP list
    if os.path.basename(file_path) in SKIP_FILES:
        return content

    new_content = content
    modified = False

    # 1. Wrap JSX Text: >Text< -> >{t('Text')}<
    sorted_strings = sorted(list(found_strings), key=len, reverse=True)
    
    for s in sorted_strings:
        if not s.strip() or len(s) < 2: continue
        escaped = re.escape(s)
        
        # JSX text
        jsx_pattern = re.compile(rf'>\s*{escaped}\s*<')
        if jsx_pattern.search(new_content):
            new_content = jsx_pattern.sub(rf'>{{t("{s}")}}<', new_content)
            modified = True
            
        # Props
        for prop in ['label', 'placeholder', 'title', 'description', 'desc', 'text']:
            # Double quotes
            prop_pattern = re.compile(rf'{prop}="{escaped}"')
            if prop_pattern.search(new_content):
                new_content = prop_pattern.sub(rf'{prop}={{t("{s}")}}', new_content)
                modified = True
            # Single quotes
            prop_pattern_s = re.compile(rf"{prop}='{escaped}'")
            if prop_pattern_s.search(new_content):
                new_content = prop_pattern_s.sub(rf'{prop}={{t("{s}")}}', new_content)
                modified = True

    if modified:
        if 'useTranslation' not in new_content:
            if 'from "react-i18next"' in new_content or "from 'react-i18next'" in new_content:
                new_content = re.sub(r'import\s+\{(.*?)\}\s+from\s+[\'"]react-i18next[\'"]', 
                                    r'import {\1, useTranslation} from "react-i18next"', new_content)
            else:
                import_stmt = "\nimport { useTranslation } from 'react-i18next';"
                if "'use client'" in new_content:
                    new_content = new_content.replace("'use client';", "'use client';" + import_stmt)
                elif '"use client"' in new_content:
                    new_content = new_content.replace('"use client";', '"use client";' + import_stmt)
                else:
                    new_content = import_stmt.strip() + "\n" + new_content

        if 'const { t } = useTranslation()' not in new_content:
            hook_init = "\n  const { t } = useTranslation();"
            new_content = re.sub(r'(export\s+(default\s+)?function\s+\w+\s*\([^)]*\)\s*\{)', 
                                 rf'\1{hook_init}', new_content)

    return new_content

def main():
    if not os.path.exists('found_strings.json'):
        return

    with open('found_strings.json', 'r', encoding='utf-8') as f:
        found_strings = set(json.load(f))

    root_dir = 'src'
    for root, dirs, files in os.walk(root_dir):
        if 'node_modules' in root or 'locales' in root or 'lib' in root:
            continue
        for file in files:
            if file.endswith('.tsx'):
                path = os.path.join(root, file)
                print(f"Smart Refactoring {path}...")
                new_code = smart_refactor(path, found_strings)
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_code)

if __name__ == "__main__":
    main()
