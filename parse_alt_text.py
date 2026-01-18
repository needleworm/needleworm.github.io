import re

# HTML 파일 읽기
file_path = 'index.html'
with open(file_path, 'r', encoding='utf-8') as f:
    html_content = f.read()

# 변경 사항 추적
changes_made = []
total_count = 0

def process_cards(content):
    # global 변수 사용을 위해 이곳에서는 별도 선언 불필요 (읽기만 함)
    pass
    
    # 패턴 1: Standard Card
    pattern_standard = r'(<img [^>]*alt=["\']projectimage["\'][^>]*>)(.*?)(<h5 class="lecture_title">)(.*?)(</h5>)'
    
    def repl_standard(match):
        global total_count, changes_made
        img_tag = match.group(1)
        middle = match.group(2)
        h5_open = match.group(3)
        title = match.group(4)
        h5_close = match.group(5)
        
        # 제목 정제
        clean_title = re.sub(r'<[^>]+>', '', title).strip()
        clean_title_attr = clean_title.replace('"', '&quot;')
        
        # 교체
        new_img_tag = re.sub(r'alt=["\']projectimage["\']', f'alt="{clean_title_attr}"', img_tag)
        
        total_count += 1
        changes_made.append(f"Standard: {clean_title}")
        
        return f"{new_img_tag}{middle}{h5_open}{title}{h5_close}"

    content = re.sub(pattern_standard, repl_standard, content, flags=re.DOTALL)
    
    # 패턴 2: News Card
    pattern_news = r'(<div class="singleNewsCard">.*?<img [^>]*alt=["\']projectimage["\'][^>]*>.*?<div class="projectText">.*?<h5>)(.*?)(</h5>)'
    
    def repl_news(match):
        global total_count, changes_made
        full_block = match.group(0)
        title = match.group(2)
        
        clean_title = re.sub(r'<[^>]+>', '', title).strip()
        clean_title_attr = clean_title.replace('"', '&quot;')
        
        if 'alt="projectimage"' in full_block:
             new_block = full_block.replace('alt="projectimage"', f'alt="{clean_title_attr}"')
             
             total_count += 1
             changes_made.append(f"News: {clean_title}")
             return new_block
        
        return full_block

    content = re.sub(pattern_news, repl_news, content, flags=re.DOTALL)
    
    return content

new_html_content = process_cards(html_content)

# 결과 저장
output_file = 'index_alt_updated.html'
with open(output_file, 'w', encoding='utf-8') as f:
    f.write(new_html_content)

# 로그 저장
log_file = 'alt_text_changes.txt'
with open(log_file, 'w', encoding='utf-8') as f:
    f.write(f"Total {total_count} images updated.\n\n")
    for item in changes_made:
        f.write(f"- {item}\n")

print(f"Update Complete. {total_count} images processed.")
print(f"Output: {output_file}")
