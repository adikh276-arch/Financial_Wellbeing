import os

def fix_content(content):
    # Safely replace the most common broken separator
    content = content.replace(" ' ", " - ")
    # Also handle corrupted characters that might be left
    content = content.replace("GÃ‡Ã´", "-")
    content = content.replace("GÃ«Ã±", " ")
    content = content.replace("=Æ’Ã¶Ã‘", " ")
    content = content.replace("GÃœÃ­", " ")
    content = content.replace("=Æ’Ã´Ã¨", " ")
    return content

# Special fix for Goal Planner (manually detected stray tag)
def fix_goal_planner(content):
    if "          </button>" in content:
        content = content.replace("          </button>\n        </div>\n\n        {/* Analytics bar */}", "</div>\n\n        {/* Analytics bar */}")
    return content

for root, dirs, files in os.walk('src/app'):
    for file in files:
        if file.endswith(('.tsx', '.ts')):
            path = os.path.join(root, file).replace('\\', '/')
            
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            orig = content
            content = fix_content(content)
            
            if "goal-planner" in path:
                content = fix_goal_planner(content)
            
            if content != orig:
                with open(path, 'w', encoding='utf-8', newline='') as f:
                    f.write(content)
                print(f"Safe fix: {path}")

