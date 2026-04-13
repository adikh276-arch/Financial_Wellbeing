import os
import re

def fix_broken_quotes(content):
    # This regex matches ' word ' word ' and turns it into ' word - word '
    # It targets exactly the cases like '50% ' Needs' or 'Check ... ' that ...'
    
    # Pattern explanation:
    # '   -> literal single quote
    # ([^']+) -> one or more non-quote chars (Group 1)
    # '   -> literal single quote (this is the one that's breaking the string)
    # \s  -> optional space
    # ([\w]) -> a word character starting the next segment (Group 2)
    # ([^']*) -> optional non-quote chars (Group 3)
    # '   -> literal single quote that CLOSES the intended string
    
    # Actually, let's keep it simpler and safer.
    # Look for: ' word-ish ' word-ish '
    
    new_content = re.sub(r"'([^'\n]+)'\s*([\w]+[^'\n]*)'", r"'\1 - \2'", content)
    
    # Second pass for ' word ' word ' word ' cases
    new_content = re.sub(r"'([^'\n]+)'\s*([\w]+[^'\n]*)'", r"'\1 - \2'", new_content)
    
    return new_content

for root, dirs, files in os.walk('src/app'):
    for file in files:
        if file.endswith(('.tsx', '.ts')):
            path = os.path.join(root, file).replace('\\', '/')
            
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            orig = content
            content = fix_broken_quotes(content)
            
            if content != orig:
                with open(path, 'w', encoding='utf-8', newline='') as f:
                    f.write(content)
                print(f"Aggressive fix: {path}")

