# Check if index.html contains properly encoded Korean text
import sys
import io

# Fix Windows console encoding
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def main():
    # Read the file
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Test for known Korean strings that should exist
    test_strings = [
        '챗GPT',
        '생능북스',
        '코파일럿',
        'AI 이후의 인간',
        '소프트웨어 리터러시'
    ]
    
    print("Checking for Korean text in index.html...")
    print("=" * 60)
    
    found_count = 0
    for test_str in test_strings:
        if test_str in content:
            found_count += 1
            print(f"[OK] Found: {test_str}")
        else:
            print(f"[FAIL] NOT FOUND: {test_str}")
    
    print("=" * 60)
    print(f"\nResult: {found_count}/{len(test_strings)} test strings found")
    
    if found_count == len(test_strings):
        print("\n[SUCCESS] File contains correct Korean text!")
        print("The file IS properly UTF-8 encoded.")
        return 0
    else:
        print("\n[FAIL] Some Korean text is missing or corrupted")
        return 1

if __name__ == '__main__':
    sys.exit(main())
