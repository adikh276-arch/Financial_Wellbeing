import os

replacements = {
    "GÃ‡Ã¶": "'",
    "GÃ‡Â¥": "'",
    "GÃ‡Âª": "-",
    "Ã¢â‚¬â„¢": "'",
    "Ã¢â‚¬â€œ": "-",
    "Ã¢â‚¬â€": "-",
    "Ã†â€™Ã‚Â¢": "", # common artifact
}

def fix_file(path):
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        orig = content
        for k, v in replacements.items():
            content = content.replace(k, v)
        
        if content != orig:
            with open(path, 'w', encoding='utf-8', newline='') as f:
                f.write(content)
            print(f"Fixed: {path}")
    except Exception as e:
        print(f"Error {path}: {e}")

for root, dirs, files in os.walk('src/app'):
    for file in files:
        if file.endswith(('.tsx', '.ts')):
            fix_file(os.path.join(root, file))
