(() => {
    'use strict';

    const THEMES = [
        ['airblue',      'Air blue',     'rgb(32 100 135)'],
        ['barnred',      'Barn red',     'rgb(144 75 64)'],
        ['citrine',      'Citrine',      'rgb(104 95 18)'],
        ['gray',         'Gray',         'rgb(0 104 116)'],
        ['greenery',     'Greenery',     'rgb(78 102 41)'],
        ['hermana',      'Hermana',      'rgb(52 105 63)'],
        ['illuminating', 'Illuminating', 'rgb(106 95 17)'],
        ['magenta',      'Magenta',      'rgb(143 73 82)'],
        ['mocha',        'Mocha',        'rgb(141 77 45)'],
        ['olivegreen',   'Olive green',  'rgb(90 99 30)'],
        ['peri',         'Peri',         'rgb(88 89 146)'],
    ];

    const state = {
        theme: 'airblue',
        scheme: 'light',
        contrast: '',
        rtl: false,
    };

    try {
        state.theme = localStorage.getItem('theme') || state.theme;
        const mode = localStorage.getItem('mode');
        if (mode) {
            state.scheme = mode.startsWith('dark') ? 'dark' : 'light';
            state.contrast = mode.includes('medium') ? 'medium' : mode.includes('high') ? 'high' : '';
        }
        state.rtl = localStorage.getItem('dir') === 'rtl';
    }
    catch (e) {}

    const modeString = () =>
        state.scheme + (state.contrast ? `-${state.contrast}-contrast` : '');

    const sync = () => {
        document.querySelectorAll('[data-theme]').forEach(el =>
            el.setAttribute('aria-current', String(el.dataset.theme === state.theme)));
        document.querySelectorAll('[data-scheme]').forEach(el =>
            el.setAttribute('aria-pressed', String(el.dataset.scheme === state.scheme)));
        document.querySelectorAll('[data-contrast]').forEach(el =>
            el.setAttribute('aria-pressed', String(el.dataset.contrast === state.contrast)));
        document.querySelectorAll('[data-quick-dark]').forEach(el =>
            el.setAttribute('aria-pressed', String(state.scheme === 'dark')));
        const dir = document.getElementById('directionality');
        if (dir) {
            dir.checked = state.rtl;
        }
    };

    const apply = () => {
        const themelink = document.getElementById('theme-link');
        if (themelink) {
            themelink.href = `themes/${state.theme}/theme.css`;
        }
        document.body.setAttribute('class',
            document.body.classList.toString().split(' ').filter(c => c.startsWith('micl')).join(' ')
            + ' ' + modeString());
        document.documentElement.setAttribute('dir', state.rtl ? 'rtl' : 'ltr');
        try {
            localStorage.setItem('theme', state.theme);
            localStorage.setItem('mode', modeString());
            localStorage.setItem('dir', state.rtl ? 'rtl' : 'ltr');
        }
        catch (e) {}
        sync();
    };

    const placeholder = document.getElementById('settings-placeholder');
    if (placeholder) {
        placeholder.innerHTML =
`<button type="button" class="micl-iconbutton-standard-s material-symbols-outlined" data-quick-dark aria-pressed="false" aria-label="Toggle dark mode">dark_mode</button>
<button type="button" class="micl-iconbutton-standard-s material-symbols-outlined" popovertarget="settings" aria-label="Appearance settings">palette</button>
<dialog id="settings" class="micl-sidesheet" popover aria-labelledby="settings-title">
    <div class="micl-sidesheet__headline">
        <h2 id="settings-title">Appearance</h2>
        <button type="button" class="micl-iconbutton-standard-s material-symbols-outlined" popovertarget="settings" aria-label="Close appearance settings">close</button>
    </div>
    <div class="micl-sidesheet__content">
        <h3 class="docs-sheet-group">Example themes</h3>
        <div class="docs-swatches">` +
            THEMES.map(([value, label, color]) =>
                `<button type="button" class="docs-swatch" data-theme="${value}" style="--docs-swatch:${color}">${label}</button>`
            ).join('') + `
        </div>
        <h3 class="docs-sheet-group">Scheme</h3>
        <div class="docs-seg" role="group" aria-label="Color scheme">
            <button type="button" data-scheme="light" aria-pressed="true">Light</button>
            <button type="button" data-scheme="dark" aria-pressed="false">Dark</button>
        </div>
        <h3 class="docs-sheet-group">Contrast</h3>
        <div class="docs-seg" role="group" aria-label="Contrast level">
            <button type="button" data-contrast="" aria-pressed="true">Standard</button>
            <button type="button" data-contrast="medium" aria-pressed="false">Medium</button>
            <button type="button" data-contrast="high" aria-pressed="false">High</button>
        </div>
        <div class="docs-dir-row">
            <label for="directionality">Right to left</label>
            <input type="checkbox" class="micl-switch" id="directionality" role="switch">
        </div>
    </div>
</dialog>`;

        document.addEventListener('click', event => {
            const swatch = event.target.closest('[data-theme]');
            if (swatch) { state.theme = swatch.dataset.theme; apply(); return; }
            const scheme = event.target.closest('[data-scheme]');
            if (scheme) { state.scheme = scheme.dataset.scheme; apply(); return; }
            const contrast = event.target.closest('[data-contrast]');
            if (contrast) { state.contrast = contrast.dataset.contrast; apply(); return; }
            if (event.target.closest('[data-quick-dark]')) {
                state.scheme = state.scheme === 'dark' ? 'light' : 'dark';
                apply();
            }
        });
        document.addEventListener('change', event => {
            if (event.target.id === 'directionality') {
                state.rtl = event.target.checked;
                apply();
            }
        });
    }

    apply();
    if (location.hash === '#settings') {
        const settings = document.getElementById('settings');
        if (settings) {
            try { settings.showPopover(); } catch (e) {}
        }
    }

    const examples = document.querySelectorAll('.docs-example');
    if (!examples.length) {
        return;
    }

    const dedent = text => {
        const lines = text.replace(/\t/g, '    ').split('\n');
        while (lines.length && lines[0].trim() === '') {
            lines.shift();
        }
        while (lines.length && lines[lines.length - 1].trim() === '') {
            lines.pop();
        }
        const indent = lines.reduce((min, line) =>
            line.trim() === '' ? min : Math.min(min, line.match(/^ */)[0].length), Infinity);
        return lines.map(line => line.slice(indent === Infinity ? 0 : indent)).join('\n');
    };

    const booleans = /\s(disabled|checked|selected|readonly|required|hidden|open|multiple|autofocus|inert|popover)=""/g;
    const emptyAttributes = /\s(?:style|class)=""/g;

    const tidy = html => dedent(html)
        .replace(booleans, ' $1')
        .replace(emptyAttributes, '')
        .replace(/[ \t]+$/gm, '')
        .replace(/\n{3,}/g, '\n\n');

    const status = document.createElement('div');
    status.className = 'docs-visually-hidden';
    status.setAttribute('aria-live', 'polite');
    document.body.appendChild(status);

    examples.forEach(example => {
        const template = example.querySelector(':scope > template');
        if (!template) {
            return;
        }
        const markup = tidy(template.innerHTML);

        // Render the live demo from the single source of truth.
        example.appendChild(template.content.cloneNode(true));

        const copy = document.createElement('button');
        copy.type = 'button';
        copy.className = 'docs-example__copy micl-iconbutton-standard-xs material-symbols-outlined';
        copy.setAttribute('aria-label', 'Copy markup');
        copy.textContent = 'content_copy';
        copy.addEventListener('click', () => {
            navigator.clipboard.writeText(markup).then(() => {
                copy.textContent = 'check';
                copy.classList.add('docs-example__copy--done');
                status.textContent = 'Markup copied to clipboard';
                setTimeout(() => {
                    copy.textContent = 'content_copy';
                    copy.classList.remove('docs-example__copy--done');
                    status.textContent = '';
                }, 1500);
            }).catch(() => {});
        });
        example.appendChild(copy);
    });
})();
