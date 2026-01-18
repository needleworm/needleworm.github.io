import re

# HTML 파일 읽기
with open('index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# courses 섹션 찾기
print("Searching for 'courses' section...")
section_match = re.search(r'(<section[^>]*id=["\']courses["\'][^>]*>)(.*?)(</section>)', html_content, re.DOTALL)

if not section_match:
    print("Error: 'courses' 섹션을 정규식으로 찾을 수 없습니다.")
    exit()

print("'courses' section found.")
section_start = section_match.group(1)
section_content = section_match.group(2)
section_end = section_match.group(3)

# 변경 사항 추적
changes_made = []
total_count = 0

# 정규식 패턴: lecture_title을 찾아서 날짜 추출
# <h5 class="lecture_title">제목 (날짜)</h5> 패턴
# 날짜 포맷: (2025. 2Q.), (2026.01.), (2024) 등 유연하게 대응
# 조건: 괄호 안에 연도(19xx or 20xx)로 시작하는 내용이 있어야 함
# [^)]*? : 닫는 괄호 전까지 모든 문자 (Non-greedy)
pattern = r'(<h5 class="lecture_title">)(.*?)\(\s*((?:19|20)[0-9]{2}[^)]*?)\s*\)(</h5>)'

def replace_func(match):
    global total_count, changes_made
    total_count += 1
    
    opening_tag = match.group(1)
    title = match.group(2).strip()
    date = match.group(3).strip()
    closing_tag = match.group(4)
    
    # 날짜에서 마지막 점 제거 (있다면)
    date_clean = date.rstrip('.')
    
    # 새로운 HTML 구조
    new_html = f'{opening_tag}{title}{closing_tag}\n                                <div class="firstCommitDate">{date_clean}</div>'
    
    changes_made.append({
        'original': f'{title} ({date})',
        'new_title': title,
        'date': date_clean
    })
    
    return new_html

# 섹션 내용만 변경
new_section_content = re.sub(pattern, replace_func, section_content)

# 전체 내용 조합
new_html_content = html_content[:section_match.start(2)] + new_section_content + html_content[section_match.end(2):]

# 결과를 새 파일로 저장
with open('index_updated_courses_v2.html', 'w', encoding='utf-8') as f:
    f.write(new_html_content)

# 변경 사항 리포트
print(f"검사 완료. 총 {total_count}개의 lecture_title이 추가로 변경되었습니다.")

if total_count > 0:
    print("\n변경 사항:")
    print("=" * 80)
    for idx, change in enumerate(changes_made, 1):
        print(f"\n{idx}. 원본: {change['original']}")
        print(f"   제목: {change['new_title']}")
        print(f"   날짜: {change['date']}")

    # 변경 사항을 텍스트 파일로도 저장
    with open('courses_date_changes_v2.txt', 'w', encoding='utf-8') as f:
        f.write(f"총 {total_count}개의 lecture_title이 추가로 변경되었습니다.\n\n")
        f.write("변경 사항:\n")
        f.write("=" * 80 + "\n\n")
        
        for idx, change in enumerate(changes_made, 1):
            f.write(f"{idx}. 원본: {change['original']}\n")
            f.write(f"   제목: {change['new_title']}\n")
            f.write(f"   날짜: {change['date']}\n\n")

    print("\n처리 완료!")
    print("- index_updated_courses_v2.html : 변경된 HTML 파일")
else:
    print("\n추가로 변경할 항목이 없습니다. 모든 패턴이 이미 처리되었거나 일치하는 항목이 없습니다.")
