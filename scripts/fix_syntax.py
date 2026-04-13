import os
import re

# This script attempts to fix syntax errors introduced by a previous character replacement.
# It looks for unescaped single quotes inside single-quoted JS strings.

def fix_content(content):
    # Fix ' something ' something ' pattern where the middle ' was likely a dash/separator
    # Regex: find strings between ' and ' that have a ' followed by space or letter
    # This is tricky without a full parser, but we can target common patterns.
    
    # Pattern: 'Text ' Text' where middle ' has spaces
    # We replace ' ' with ' - ' if it's trapped between other quotes or in certain contexts.
    
    # Actually, a safer way for this specific app:
    # Most of these ' replacements were from GÃ‡Ã´, GÃ«Ã±, etc.
    # Patterns found in grep:
    # 'Review last 3 months ... ' categorize ...'
    # 'Yes ' 6+ months covered'
    
    # Fix specifically: ' ' -> ' - '
    content = content.replace("' '", "' - '") # This might catch some, but most have spaces around
    
    # Use regex to find single quotes that have spaces around them or are between words
    # but are definitely inside a larger string.
    
    # Let's fix the specific files reported in the build first as they have the clearest issues.
    return content

def fix_goal_planner(content):
    # Fix the stray </button> on line 106
    # Line 106:           </button>
    content = content.replace("          </button>\n        </div>\n\n        {/* Analytics bar */}", "</div>\n\n        {/* Analytics bar */}")
    return content

def fix_savings_checkup(content):
    # Fix: {v:'yes-6',l:'Yes ' 6+ months covered'}
    content = content.replace("'Yes ' 6+ months covered'", "'Yes - 6+ months covered'")
    content = content.replace("'Yes ' 3-6 months covered'", "'Yes - 3-6 months covered'")
    return content

def fix_investing_basics(content):
    # Fix: ... fewer when high ' this automatically ...
    content = content.replace("fewer when high ' this automatically", "fewer when high - this automatically")
    return content

def fix_financial_tips(content):
    # Fix: ... "money date" ' 15 minutes ...
    content = content.replace('"money date" \' 15 minutes', '"money date" - 15 minutes')
    content = content.replace("timing the market ' always", "timing the market - always")
    return content

# General cleanup for the ' separator in content strings
def general_fix(content):
    # Look for patterns in text content like:
    # 'Word ' Word'
    # 'Word ' 123'
    # This regex is heuristic but targets the typical error pattern found in the grep.
    # It looks for a sequence: ' [space] ' [space]
    # No, wait. ' categorize ...
    
    # If a line has exactly three single quotes, the middle one is usually the culprit.
    lines = content.split('\n')
    new_lines = []
    for line in lines:
        if line.count("'") == 3:
            # Dangerous to auto-fix all, but let's try a safer regex for the middle one
            match = re.search(r"('[^']*)'([^']*')", line)
            if match:
                # Replace the middle quote with a dash if it has a space before it
                line = line[:match.start(0) + len(match.group(1))] + " - " + line[match.start(0) + len(match.group(1)) + 1:]
        new_lines.append(line)
    return '\n'.join(new_lines)

# Registry of fixes
fixes = {
    'src/app/goal-planner/page.tsx': fix_goal_planner,
    'src/app/check-ins/savings-check-up/page.tsx': fix_savings_checkup,
    'src/app/learn/investing-basics/page.tsx': fix_investing_basics,
    'src/app/explore/financial-tips/page.tsx': fix_financial_tips,
}

# Apply fixes
for root, dirs, files in os.walk('src/app'):
    for file in files:
        if file.endswith(('.tsx', '.ts')):
            path = os.path.join(root, file).replace('\\', '/')
            
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            orig = content
            
            # Apply file-specific fixes
            for target_path, fix_fn in fixes.items():
                if path.endswith(target_path):
                    content = fix_fn(content)
            
            # Apply general heuristic fix for strings with 3 quotes (likely broken mid-string)
            content = general_fix(content)
            
            # Additional cleanup for known corrupted patterns
            content = content.replace(" ' categorized ", " - categorized ")
            content = content.replace(" ' categorize ", " - categorize ")
            content = content.replace(" ' often forgotten ", " - often forgotten ")
            content = content.replace(" ' these are your baseline ", " - these are your baseline ")
            content = content.replace(" ' time is your superpower ", " - time is your superpower ")
            content = content.replace(" ' building ", " - building ")
            content = content.replace(" ' peak ", " - peak ")
            content = content.replace(" ' foundation ", " - foundation ")
            
            if content != orig:
                with open(path, 'w', encoding='utf-8', newline='') as f:
                    f.write(content)
                print(f"Fixed syntax: {path}")

