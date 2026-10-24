/* Paper bodies remain readable without JavaScript; this adds reader utilities. */
document.addEventListener('DOMContentLoaded', () => {
    const toc = document.querySelector('.paper-toc');
    if (toc && window.matchMedia('(max-width: 900px)').matches) toc.open = false;

    const data = document.getElementById('citation-formats-data');
    const preview = document.getElementById('citation-text');
    const status = document.getElementById('citation-status');
    const current = document.getElementById('citation-current-format');
    if (data && preview && status && current) {
        const formats = JSON.parse(data.textContent);
        const buttons = Array.from(document.querySelectorAll('[data-citation-format]'));
        buttons.forEach(button => button.addEventListener('click', async () => {
            const key = button.dataset.citationFormat;
            const text = formats[key];
            if (typeof text !== 'string') return;
            preview.value = text;
            preview.rows = Math.min(16, Math.max(7, text.split('\n').length + 1));
            const label = button.textContent.replace(/\s*복사$/, '');
            current.textContent = label;
            buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
            status.textContent = '';
            let copied = false;
            try {
                await navigator.clipboard.writeText(text);
                copied = true;
            } catch {
                // Retain a usable manual selection when clipboard permission is denied.
                preview.focus({ preventScroll: true });
                preview.select();
                try { copied = document.execCommand('copy'); } catch { /* manual copy below */ }
                if (copied) button.focus({ preventScroll: true });
            }
            status.textContent = copied ? `${label} 인용 정보를 복사했습니다.` : '인용문을 선택했습니다. 직접 복사해 주세요.';
        }));
    }

    if (!toc) return;
    const links = Array.from(toc.querySelectorAll('a[href^="#"]'));
    const targets = links.map(link => document.getElementById(link.hash.slice(1))).filter(Boolean);
    let scheduled = false;
    function highlightSection() {
        scheduled = false;
        const line = Math.max(120, window.innerHeight * .2);
        let active = targets[0];
        for (const target of targets) if (target.getBoundingClientRect().top <= line) active = target;
        links.forEach(link => {
            if (link.hash === '#' + active?.id) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    }
    window.addEventListener('scroll', () => {
        if (!scheduled) { scheduled = true; requestAnimationFrame(highlightSection); }
    }, { passive: true });
    highlightSection();
    toc.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
        if (window.matchMedia('(max-width: 900px)').matches) toc.open = false;
    }));
});
