import re

# HTML 파일 읽기
with open('index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# 변경 사항 추적
changes_made = []
total_count = 0

# 정규식 패턴: lecture_title을 찾아서 날짜 추출
# <h5 class="lecture_title">제목 (날짜)</h5> 패턴
pattern = r'(<h5 class="lecture_title">)(.*?)\(([0-9]{4}(?:\.[0-9]{2}\.[0-9]{2})?\. ?)\)(</h5>)'

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
    new_html = f'{opening_tag}{title}{closing_tag}\n                            <div class="firstCommitDate">{date_clean}</div>'
    
    changes_made.append({
        'original': f'{title} ({date})',
        'new_title': title,
        'date': date_clean
    })
    
    return new_html

# HTML 내용 변경
new_html_content = re.sub(pattern, replace_func, html_content)

# 결과를 새 파일로 저장
with open('index_updated.html', 'w', encoding='utf-8') as f:
    f.write(new_html_content)

# 변경 사항 리포트
print(f"총 {total_count}개의 lecture_title이 변경되었습니다.")
print("\n변경 사항 (처음 10개):")
print("=" * 80)

for idx, change in enumerate(changes_made[:10], 1):
    print(f"\n{idx}. 원본: {change['original']}")
    print(f"   제목: {change['new_title']}")
    print(f"   날짜: {change['date']}")

if len(changes_made) > 10:
    print(f"\n... 그 외 {len(changes_made) - 10}개 항목")

# 변경 사항을 텍스트 파일로도 저장
with open('lecture_date_changes.txt', 'w', encoding='utf-8') as f:
    f.write(f"총 {total_count}개의 lecture_title이 변경되었습니다.\n\n")
    f.write("변경 사항:\n")
    f.write("=" * 80 + "\n\n")
    
    for idx, change in enumerate(changes_made, 1):
        f.write(f"{idx}. 원본: {change['original']}\n")
        f.write(f"   제목: {change['new_title']}\n")
        f.write(f"   날짜: {change['date']}\n\n")

print("\n처리 완료!")
print("- index_updated.html : 변경된 HTML 파일")
print("- lecture_date_changes.txt : 변경 사항 리포트")
