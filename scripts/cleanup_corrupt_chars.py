import os

artifacts = ["GÃ¹Ã¯", "GÃ¹", "GÃ", "GÃ ", "Æ’Ã¶Ã‘", "Æ’Ã´Ã¨"]

def fix_file(path):
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    orig = content
    # Replace the SelectOption pattern specifically if it has corrupted chars
    content = content.replace("'GÃ¹Ã¯'", "''")
    content = content.replace('"GÃ¹Ã¯"', '""')
    
    # Generic replacements
    for art in artifacts:
        content = content.replace(art, "")
        
    if content != orig:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

count = 0
for root, dirs, files in os.walk(r'd:\Downloads\Financial Wellness\financial-wellness\src\app'):
    for file in files:
        if file.endswith(('.tsx', '.ts')):
            if fix_file(os.path.join(root, file)):
                count += 1

print(f"Fixed {count} files.")
