import re

with open('/Users/ijaegwang/wordncode/Work/ㅎ/한국건강가정진흥원/fces/sub/FE_SE_0019.html', 'r', encoding='utf-8') as f:
    content19 = f.read()

with open('/Users/ijaegwang/wordncode/Work/ㅎ/한국건강가정진흥원/fces/sub/FE_SE_0001.html', 'r', encoding='utf-8') as f:
    content01 = f.read()

# Extract from FE_SE_0019.html
match19 = re.search(r'(\s*<div class="eval-result-search">.*?)\s*<div class="eval-result-table-wrap">', content19, re.DOTALL)
if match19:
    search_block = match19.group(1)
else:
    print("Could not find block in FE_SE_0019.html")
    exit(1)

# Replace in FE_SE_0001.html
# We want to replace <div class="search-filter-wrap"> ... </div> right before <div class="default-table-wrap">
pattern01 = r'\s*<div class="search-filter-wrap">.*?(?=\s*<div class="default-table-wrap">)'
new_content01, num_subs = re.subn(pattern01, search_block, content01, flags=re.DOTALL)

if num_subs > 0:
    with open('/Users/ijaegwang/wordncode/Work/ㅎ/한국건강가정진흥원/fces/sub/FE_SE_0001.html', 'w', encoding='utf-8') as f:
        f.write(new_content01)
    print("Successfully replaced.")
else:
    print("Could not find block in FE_SE_0001.html")
