
import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all template IDs
ids = re.findall(r'<template id="([^"]+)"', content)
print("Found templates:", ids)

# Check against App.tsx list
app_components = [
    "books", "websites", "codes", "papers", "patents", "lectures", 
    "news", "media", "producing", "contact", "membership", 
    "socialContribution", "collections", "courses"
]

missing_in_nav = []
# Find nav items
nav_items = re.findall(r'<a href="#([^"]+)"', content)

print("Found nav items:", nav_items)

for comp in app_components:
    # Convert component name to match template id conventions (usually lowercase + -template)
    # But wait, app components are CamelCase or lowercase.
    # In App.tsx: Books -> books, SocialContribution -> socialContribution.
    # Template IDs: books-template. SocialContribution -> social-contribution-template?
    
    # Let's normalize
    pass
