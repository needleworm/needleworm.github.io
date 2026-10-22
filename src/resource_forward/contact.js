(function () {
    'use strict';
    if (window.AuthorContact) {
        window.AuthorContact.init(document);
        return;
    }
    let sdkPromise;
    function loadSdk() {
        if (window.emailjs) return Promise.resolve(window.emailjs);
        if (!sdkPromise) {
            sdkPromise = new Promise((resolve, reject) => {
                const script = document.createElement('script');
                const timer = setTimeout(() => {
                    script.remove();
                    reject(new Error('Email service timeout'));
                }, 15000);
                script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
                script.onload = () => {
                    clearTimeout(timer);
                    window.emailjs ? resolve(window.emailjs) : reject(new Error('Email service unavailable'));
                };
                script.onerror = () => {
                    clearTimeout(timer);
                    script.remove();
                    reject(new Error('Email service unavailable'));
                };
                document.head.append(script);
            }).catch(error => { sdkPromise = undefined; throw error; });
        }
        return sdkPromise;
    }
    function init(root = document) {
        const sections = root.matches?.('[data-contact-form]') ? [root] : root.querySelectorAll('[data-contact-form]');
        for (const section of sections) {
            const form = section.querySelector('form');
            if (!form || form.dataset.contactReady) continue;
            const status = section.querySelector('#my-form-status');
            const button = form.querySelector('[type="submit"]');
            const config = section.dataset;
            if (!status || !button || !config.emailjsPublicKey || !config.emailjsService || !config.emailjsTemplate) continue;
            form.dataset.contactReady = 'true';
            const setStatus = (message, failed = false) => {
                status.textContent = message;
                status.dataset.state = failed ? 'error' : 'info';
                status.style.color = failed ? '#bd2340' : '';
            };
            form.addEventListener('submit', async event => {
                event.preventDefault();
                if (button.disabled || !form.reportValidity()) return;
                const fields = [...form.querySelectorAll('input[required], textarea[required]')];
                const empty = fields.find(field => !field.value.trim());
                if (empty) {
                    setStatus('필수 항목을 입력해주세요.', true);
                    empty.focus();
                    return;
                }
                button.disabled = true;
                form.setAttribute('aria-busy', 'true');
                setStatus('문의를 보내고 있습니다.');
                try {
                    const sdk = await loadSdk();
                    await sdk.send(config.emailjsService, config.emailjsTemplate, {
                        mail_title: form.elements.mail_title.value.trim(),
                        mail_name: form.elements.mail_name.value.trim(),
                        mail_institution: form.elements.mail_institution?.value.trim() || '미기재',
                        country_code: '',
                        mail_email: form.elements.mail_email.value.trim(),
                        mail_phone: form.elements.mail_phone.value.trim(),
                        mail_message: form.elements.mail_message.value.trim()
                    }, { publicKey: config.emailjsPublicKey });
                    form.reset();
                    setStatus('문의가 전달되었습니다. 감사합니다.');
                } catch (error) {
                    setStatus('전송하지 못했습니다. 입력 내용은 보관되어 있으니 잠시 후 다시 시도해주세요.', true);
                } finally {
                    button.disabled = false;
                    form.removeAttribute('aria-busy');
                }
            });
        }
    }
    window.AuthorContact = { init };
    init(document);
})();
