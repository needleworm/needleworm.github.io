import os

def repair_style():
    path = 'style.css'
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        # Fallback if utf-8 fails, though it should be utf-8 usually
        with open(path, 'r', encoding='cp949') as f:
            content = f.read()

    # Find the cutoff point. 
    # We know the last valid selector is .bookDescription.description-truncated inside @media (max-width: 768px)
    # The corruption starts or the file was truncated around line 1645
    
    marker = 'margin-bottom: 1rem !important;'
    idx = content.find(marker)
    
    if idx == -1:
        print("Could not find style marker")
        return

    # Find the end of this block
    # We expect 'overflow: hidden !important;'
    marker2 = 'overflow: hidden !important;'
    idx2 = content.find(marker2, idx)
    
    if idx2 == -1:
         print("Could not find second style marker")
         return
         
    # Cut off after the closing brace of the .bookDescription rule
    # We expect it to be shortly after marker2
    # The rule is .bookDescription.description-truncated { ... }
    # So we need to find the next '}'
    
    cutoff = content.find('}', idx2) + 1
    
    # Keeping clean content
    clean_content = content[:cutoff]
    
    # Now append the missing closing braces for the @media blocks
    # We are inside @media (max-width: 768px) { ... }
    # So we need one '}' for the media query
    
    new_css = """
}

/* Submenu Styles */
.nav-item {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
}

.dropdown-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    box-shadow: var(--shadow-md);
    padding: 0.5rem 0;
    border-radius: 8px;
    z-index: 1001;
    min-width: 150px;
    list-style: none;
    flex-direction: column;
}

.dropdown-menu.show-dropdown {
    display: flex;
    animation: fadeInUp 0.3s ease-out;
}

.dropdown-menu li {
    width: 100%;
}

.dropdown-menu a {
    display: block;
    padding: 0.8rem 1.5rem;
    color: var(--text-color);
    font-weight: 500;
    font-size: 0.9rem;
    white-space: nowrap;
    transition: background 0.2s, color 0.2s;
    text-align: left;
}

/* Hover effect handled by JS, but style for items */
.dropdown-menu a:hover {
    background: #f8f9fa;
    color: var(--secondary-color);
}

/* Mobile specific overrides */
@media (max-width: 768px) {
    .nav-item {
        flex-direction: column;
        align-items: flex-start;
        height: auto;
        width: 100%;
    }

    .dropdown-menu {
        display: block !important;
        position: static;
        box-shadow: none;
        transform: none;
        padding-left: 1.5rem;
        background: transparent;
        width: 100%;
        border-radius: 0;
    }

    .dropdown-menu a {
        padding: 0.5rem 0;
        font-size: 0.85rem;
        color: var(--text-muted);
    }
}
"""
    
    final_content = clean_content + new_css
    
    with open('style.css', 'w', encoding='utf-8') as f:
        f.write(final_content)
    print("Fixed style.css")

def repair_script():
    path = 'script.js'
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
    except:
        with open(path, 'r', encoding='cp949') as f:
            content = f.read()
            
    # Find the last known good part.
    # window.addEventListener('load', () => {
    #    setTimeout(initTextTruncation, 100);
    # });
    
    marker = 'setTimeout(initTextTruncation, 100);'
    idx = content.find(marker)
    
    if idx == -1:
        print("Could not find script marker")
        return
        
    # Find the end of this block '});'
    idx2 = content.find('});', idx) + 3
    
    clean_content = content[:idx2]
    
    new_js = """

/* Submenu Navigation Handler */
function clickSubmenu(groupId, templateId) {
    // 1. Switch Tab
    switchTab(groupId, templateId);

    // 2. Scroll to Section
    const section = document.getElementById(groupId);
    if (section) {
        const yOffset = -80; // Offset for fixed navbar
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }

    // 3. Close Mobile Menu if open
    const navLinks = document.getElementById('nav-links');
    if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
}

// Submenu Hover Logic (3 seconds delay)
function setupSubmenuHover() {
    if (window.innerWidth <= 768) return; // Mobile handled by CSS default visibility

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const dropdown = item.querySelector('.dropdown-menu');
        if (!dropdown) return;

        let enterTimeout;
        let leaveTimeout;

        item.addEventListener('mouseenter', () => {
            clearTimeout(leaveTimeout); // If re-entering quickly, cancel hide
            enterTimeout = setTimeout(() => {
                dropdown.classList.add('show-dropdown');
            }, 3000); // 3 seconds delay
        });

        item.addEventListener('mouseleave', () => {
            clearTimeout(enterTimeout); // Cancel show if leaving before 3s
            leaveTimeout = setTimeout(() => {
                dropdown.classList.remove('show-dropdown');
            }, 300); // Short delay before hiding to prevent flicker
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupSubmenuHover();
    
    // Safety check for mobile menu button
    const menuBtn = document.getElementById('mobile-menu-btn');
    if(menuBtn) {
        menuBtn.style.zIndex = '1100'; // Ensure it's above everything
    }
});
"""

    final_content = clean_content + new_js
    
    with open('script.js', 'w', encoding='utf-8') as f:
        f.write(final_content)
    print("Fixed script.js")

if __name__ == '__main__':
    repair_style()
    repair_script()
