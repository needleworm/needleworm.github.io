import re

file_path = 'index.html'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

changes_count = 0
errors = []

# 정규식 패턴 설명:
# 1. <div class="projectIcons"> 와 <div class="gitIcons"> 가 붙어있는 경우 (공백 허용)
# 2. 그 사이의 내용 (Non-greedy) -> gitIcons 내부
# 3. </div> 가 두 번 연속 나오는 경우 (공백 허용)
# 주의: gitIcons 내부에 div가 또 있으면 이 정규식은 오작동할 수 있음 (마지막 div를 잡을 수 있으므로).
# 따라서 내용(group 2)에 '<div'가 없는지 검사가 필수.

pattern = r'(<div class="projectIcons">\s*<div class="gitIcons">)(.*?)(</div>\s*</div>)'

def repl_func(match):
    global changes_count, errors
    
    opening = match.group(1)
    inner_content = match.group(2)
    closing = match.group(3)
    
    # 안전 장치: inner_content 안에 'div' 태그가 있으면 중첩 구조이므로 건너뜀
    if '<div' in inner_content:
        errors.append(f"Skipped nested structure at index {match.start()} due to inner 'div' tag.")
        return match.group(0) # 변경 없음
    
    changes_count += 1
    # 새로운 구조: <div class="gitIcons">... content ...</div>
    # indentation 유지?
    # opening에서 indentation을 추출하고 싶지만 복잡함.
    # 단순하게 <div class="gitIcons">로 대체하고, closing은 </div> 하나만 남김.
    
    # 원래 opening과 indentation이 포함되어 있을 수 있음.
    # 하지만 결과값 포맷팅을 위해 단순화:
    # <div class="gitIcons"> content </div> 로 변환.
    
    return f'<div class="gitIcons">{inner_content}</div>'

new_content = re.sub(pattern, repl_func, content, flags=re.DOTALL)

if changes_count > 0:
    with open('index_dom_optimized.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Successfully unwrapped {changes_count} 'projectIcons' containers.")
    print("Output: index_dom_optimized.html")
else:
    print("No matching structures found to optimize.")

if errors:
    print("\nWarning: Some blocks were skipped due to safety checks:")
    for e in errors:
        print(e)
