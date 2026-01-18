from bs4 import BeautifulSoup
import re

# HTML 파일 읽기
with open('index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# BeautifulSoup으로 파싱
soup = BeautifulSoup(html_content, 'html.parser')

# 모든 .singleLectureContainer 찾기
lecture_containers = soup.find_all(class_='singleLectureContainer')

# lec_inst 클래스가 없는 컨테이너 찾기
missing_lec_inst = []

for idx, container in enumerate(lecture_containers, 1):
    # 컨테이너 안에 lec_inst 클래스가 있는지 확인
    has_lec_inst = container.find(class_='lec_inst') is not None
    
    if not has_lec_inst:
        # 강의 제목 찾기 (lecture_title 클래스)
        title_elem = container.find(class_='lecture_title')
        title = title_elem.get_text(strip=True) if title_elem else "제목 없음"
        
        # 원본 HTML 조각 가져오기 (디버깅용)
        html_snippet = str(container)[:500]  # 처음 500자
        
        missing_lec_inst.append({
            'index': idx,
            'title': title,
            'html_snippet': html_snippet
        })

# 결과를 txt 파일로 저장
with open('missing_lec_inst_detailed.txt', 'w', encoding='utf-8') as f:
    f.write(f"총 .singleLectureContainer 개수: {len(lecture_containers)}\n")
    f.write(f"lec_inst 클래스가 없는 항목 개수: {len(missing_lec_inst)}\n")
    f.write("=" * 80 + "\n\n")
    
    if missing_lec_inst:
        for item in missing_lec_inst:
            f.write(f"번호: {item['index']}\n")
            f.write(f"제목: {item['title']}\n")
            f.write(f"HTML 미리보기: {item['html_snippet']}\n")
            f.write("-" * 80 + "\n\n")
    else:
        f.write("모든 .singleLectureContainer에 lec_inst 클래스가 있습니다.\n")

# 인덱스를 간단히 리스트로도 저장
with open('missing_lec_inst_indexes.txt', 'w', encoding='utf-8') as f:
    f.write(f"lec_inst 클래스가 없는 .singleLectureContainer 인덱스 목록 (총 {len(missing_lec_inst)}개):\n\n")
    indexes = [str(item['index']) for item in missing_lec_inst]
    f.write(', '.join(indexes))

print(f"상세 결과가 missing_lec_inst_detailed.txt 파일에 저장되었습니다.")
print(f"인덱스 목록이 missing_lec_inst_indexes.txt 파일에 저장되었습니다.")
print(f"총 {len(lecture_containers)}개 중 {len(missing_lec_inst)}개에서 lec_inst 클래스가 누락되었습니다.")
