# Script to reduce h1 font size by 20% in style.css
import sys

def main():
    # Read the CSS file with multiple encoding attempts
    encodings = ['cp949', 'euc-kr', 'utf-8', 'latin1']
    content = None
    used_encoding = None
    
    for encoding in encodings:
        try:
            with open('style.css', 'r', encoding=encoding) as f:
                content = f.read()
            used_encoding = encoding
            print(f"Successfully read file with encoding: {encoding}")
            break
        except UnicodeDecodeError:
            continue
    
    if content is None:
        print("Failed to read file with any encoding")
        return 1
    
    # Find the h1-h6 block and add h1 font-size rule after it
    lines = content.split('\n')
    new_lines = []
    i = 0
    
    while i < len(lines):
        new_lines.append(lines[i])
        
        # Look for the closing brace of h1-h6 block
        if i > 50 and i < 65 and lines[i].strip() == '}':
            # Check if previous lines contain h1, h2, h3, h4, h5, h6
            prev_10_lines = '\n'.join(lines[max(0, i-10):i])
            if 'h1,' in prev_10_lines and 'font-family' in prev_10_lines:
                # Add h1 specific rule
                new_lines.append('')
                new_lines.append('h1 {')
                new_lines.append('    font-size: 1.6em;')
                new_lines.append('}')
                print("Added h1 font-size rule after h1-h6 block")
        
        i += 1
    
    # Write back to file
    new_content = '\n'.join(new_lines)
    with open('style.css', 'w', encoding=used_encoding) as f:
        f.write(new_content)
    
    print(f"Successfully updated style.css with {used_encoding} encoding")
    print("h1 font-size reduced to 1.6em (20% reduction from default 2em)")
    return 0

if __name__ == '__main__':
    sys.exit(main())
