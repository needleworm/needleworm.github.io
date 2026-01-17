import os
import re

file_path = r"c:\Users\needl\Desktop\needleworm.github.io - 복사본 (2)\index.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Find first <template
match = re.search(r"<template", content)
if not match:
    print("No template found")
    exit(1)

start_index = match.start()
templates_part = content[start_index:]

new_top = """<!DOCTYPE html>
<html lang="ko-kr">
<head>
    <!-- AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9767176956440077" crossorigin="anonymous"></script>

    <!-- Naver Search Console -->
    <meta name="naver-site-verification" content="0159ed33b1faaa2234f04e02a584f51839076f3b" />
    
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-N1GJ70ELXP"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-N1GJ70ELXP');
    </script>
    
    <meta charset="utf-8">
    <meta name="theme-color" content="#2c3e50" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>반병현 (Byunghyun Ban)</title>
    <meta name="description" content="반병현의 포트폴리오 - 저서, 논문, 특허 등" />
    <meta name="author" content="반병현(Byunghyun Ban)">
    
    <!-- Social Meta -->
    <meta property="og:type" content="blog">
    <meta property="og:title" content="반병현(Byunghyun Ban)">
    <meta property="og:description" content="반병현의 포트폴리오 - 저서, 논문, 특허 등">
    <meta property="og:image" content="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io@main/images/bookcovers.jpg" />
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;700&family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet">
    
    <!-- Icons -->
    <script src="https://kit.fontawesome.com/44e1e0b11c.js" crossorigin="anonymous"></script>
    
    <!-- Libraries -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

    <!-- Styles -->
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar">
        <div class="navbar-brand">Needleworm</div>
        <div class="menu-toggle" id="mobile-menu-btn">
            <i class="fas fa-bars"></i>
        </div>
        <ul class="nav-links" id="nav-links">
            <li><a href="#books" class="nav-link">Books</a></li>
            <li><a href="#media-section" class="nav-link">Media</a></li>
            <li><a href="#education-section" class="nav-link">Education</a></li>
            <li><a href="#rnd-section" class="nav-link">R&D</a></li>
            <li><a href="#dev-section" class="nav-link">Dev</a></li>
            <li><a href="#etc-section" class="nav-link">ETC</a></li>
            <li><a href="#contact" class="btn-contact">Contact</a></li>
        </ul>
    </nav>

    <!-- Hero Section -->
    <header class="hero">
        <div class="hero-content">
            <img src="https://cdn.jsdelivr.net/gh/needleworm/needleworm.github.io@main/src/images/profile.png" alt="Profile" class="profile-img">
            <h1 class="hero-title">Byunghyun Ban</h1>
            <p class="hero-subtitle">Researcher · Developer · Writer</p>
            <div class="hero-socials">
                <a href="https://github.com/needleworm" target="_blank" class="social-icon" title="GitHub"><i class="fab fa-github"></i></a>
                <a href="https://www.youtube.com/channel/UCpV0ZdloVwvSjxHfnYYQPQg?sub_confirmation=1" target="_blank" class="social-icon" title="YouTube"><i class="fab fa-youtube"></i></a>
                <a href="https://brunch.co.kr/@needleworm" target="_blank" class="social-icon" title="Brunch"><i class="fas fa-pen-nib"></i></a>
                <a href="https://www.linkedin.com/in/bhban" target="_blank" class="social-icon" title="LinkedIn"><i class="fab fa-linkedin"></i></a>
            </div>
            <a href="#books" class="btn-contact" style="background: white; color: var(--text-color);">View My Work</a>
        </div>
    </header>

    <!-- Main Content -->
    <main id="main-content" class="container">
        <!-- Content injected by script.js -->
    </main>
    
    <!-- Footer -->
    <footer>
        <div class="container">
            <p>&copy; 2026 Byunghyun Ban. All rights reserved.</p>
        </div>
    </footer>
    
    <!-- Scroll to Top -->
    <div class="btn-to-top" id="btn-to-top" onclick="window.scrollTo({top: 0, behavior: 'smooth'});">
        <i class="fas fa-arrow-up"></i>
    </div>
"""

new_content = new_top + templates_part

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Refactor complete.")
