/**
 * Language Switcher Component
 * Handles language selection and switching
 */

(function() {
    'use strict';

    class LanguageSwitcher {
        constructor(options = {}) {
            this.currentLang = options.currentLang || 'nl';
            this.supportedLanguages = options.supportedLanguages || ['nl', 'zh', 'en'];
            this.languageNames = {
                'nl': 'Nederlands',
                'zh': '中文',
                'en': 'English'
            };
            this.container = null;
        }

        init() {
            this.createSwitcher();
            this.attachEventListeners();
        }

        createSwitcher() {
            // Create language switcher container
            const switcherHTML = `
                <div class="language-switcher">
                    <button class="lang-toggle" aria-label="Switch language">
                        <span class="current-lang">${this.languageNames[this.currentLang]}</span>
                        <svg class="lang-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>
                    <div class="lang-dropdown">
                        ${this.supportedLanguages
                            .filter(lang => lang !== this.currentLang)
                            .map(lang => `
                                <a href="/${lang}/" class="lang-option" data-lang="${lang}">
                                    ${this.languageNames[lang]}
                                </a>
                            `).join('')}
                    </div>
                </div>
            `;

            // Insert switcher after h1 or at the beginning of container
            const container = document.querySelector('.container');
            if (container) {
                const h1 = container.querySelector('h1');
                if (h1) {
                    h1.insertAdjacentHTML('afterend', switcherHTML);
                } else {
                    container.insertAdjacentHTML('afterbegin', switcherHTML);
                }
                this.container = container.querySelector('.language-switcher');
            }
        }

        attachEventListeners() {
            if (!this.container) return;

            const toggle = this.container.querySelector('.lang-toggle');
            const dropdown = this.container.querySelector('.lang-dropdown');

            // Toggle dropdown
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('active');
                toggle.classList.toggle('active');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.container.contains(e.target)) {
                    dropdown.classList.remove('active');
                    toggle.classList.remove('active');
                }
            });

            // Save language preference when clicking options
            const options = this.container.querySelectorAll('.lang-option');
            options.forEach(option => {
                option.addEventListener('click', () => {
                    const selectedLang = option.dataset.lang;
                    this.saveLanguagePreference(selectedLang);
                });
            });
        }

        saveLanguagePreference(lang) {
            try {
                localStorage.setItem('preferredLanguage', lang);
            } catch (e) {
                console.warn('Could not save language preference:', e);
            }
        }

        static getCurrentPath() {
            const path = window.location.pathname;
            const match = path.match(/^\/(nl|zh|en)(\/.*)?$/);
            return match ? match[2] || '/' : path;
        }
    }

    // Auto-initialize when DOM is ready
    function initLanguageSwitcher() {
        // Detect current language from path
        const path = window.location.pathname;
        const langMatch = path.match(/^\/([a-z]{2})\//);
        const currentLang = langMatch ? langMatch[1] : 'nl';

        const switcher = new LanguageSwitcher({
            currentLang: currentLang
        });
        switcher.init();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLanguageSwitcher);
    } else {
        initLanguageSwitcher();
    }

    // Export for manual initialization if needed
    window.LanguageSwitcher = LanguageSwitcher;
})();
