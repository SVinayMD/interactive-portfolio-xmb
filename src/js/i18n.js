document.addEventListener('DOMContentLoaded', () => {
    const langSelect = document.getElementById('lang-select');
    let currentTranslations = {};

    // Function to fetch translation file
    async function loadLanguage(lang) {
        try {
            const response = await fetch(`locales/${lang}.json`);
            if (!response.ok) {
                console.error(`Could not load ${lang}.json. Status: ${response.status}`);
                return null;
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching language file for ${lang}:`, error);
            return null;
        }
    }

    // Function to apply translations to the page
    function applyTranslations(translations) {
        if (!translations) return;
        currentTranslations = translations;
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[key]) {
                element.innerHTML = translations[key];
            }
        });
        // Special handling for data attributes like data-title and data-content
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            if (translations[key]) {
                element.dataset.title = translations[key];
            }
        });
        document.querySelectorAll('[data-i18n-content]').forEach(element => {
            const key = element.getAttribute('data-i18n-content');
            if (translations[key]) {
                element.dataset.content = translations[key];
            }
        });

        document.dispatchEvent(new CustomEvent('translationsApplied'));
        window.translationsApplied = true;
    }

    // Function to set the language
    async function setLanguage(lang) {
        const translations = await loadLanguage(lang);
        if (translations) {
            applyTranslations(translations);
            localStorage.setItem('portfolio-lang', lang);
            if (langSelect) {
                langSelect.value = lang;
            }
        } else if (lang !== 'en') {
            // If the language file fails to load (e.g., es.json doesn't exist yet),
            // try falling back to English.
            console.warn(`'${lang}.json' not found. Falling back to English.`);
            await setLanguage('en');
        }
    }

    // Add change listener to the dropdown
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            setLanguage(e.target.value);
            e.target.blur();
        });
    }

    // Initial load: check localStorage, then browser language, fallback to 'en'
    const savedLang = localStorage.getItem('portfolio-lang');
    const browserLang = navigator.language.split('-')[0];
    setLanguage(savedLang || browserLang || 'en');
});