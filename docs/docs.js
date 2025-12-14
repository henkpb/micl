document.getElementById('settings-placeholder').innerHTML =
`<button class="micl-iconbutton-tonal-s micl-iconbutton--wide material-symbols-outlined" popovertarget="settings" popovertargetaction="toggle">dark_mode</button>
<dialog id="settings" class="micl-dialog" closedby="any" popover>
    <div class="micl-dialog__headline">
        <h2>Settings</h2>
    </div>
    <div class="micl-dialog__content">
        <div class="micl-textfield-outlined">
            <label for="theme">Theme</label>
            <select id="theme">
                <option class="micl-list-item-one" selected value="airblue">
                    <span class="micl-list-item__text">Air blue</span>
                </option>
                <option class="micl-list-item-one" value="barnred">
                    <span class="micl-list-item__text">Barn red</span>
                </option>
                <option class="micl-list-item-one" value="citrine">
                    <span class="micl-list-item__text">Citrine</span>
                </option>
                <option class="micl-list-item-one" value="olivegreen">
                    <span class="micl-list-item__text">Olive green</span>
                </option>
            </select>
        </div>
        <div class="micl-textfield-outlined" style="margin-block-start:24px">
            <label for="mode">Mode</label>
            <select id="mode">
                <option class="micl-list-item-one" selected value="light">
                    <span class="micl-list-item__text">Light</span>
                </option>
                <option class="micl-list-item-one" value="light-medium-contrast">
                    <span class="micl-list-item__text">Light Medium Contrast</span>
                </option>
                <option class="micl-list-item-one" value="light-high-contrast">
                    <span class="micl-list-item__text">Light High Contrast</span>
                </option>
                <option class="micl-list-item-one" value="dark">
                    <span class="micl-list-item__text">Dark</span>
                </option>
                <option class="micl-list-item-one" value="dark-medium-contrast">
                    <span class="micl-list-item__text">Dark Medium Contrast</span>
                </option>
                <option class="micl-list-item-one" value="dark-high-contrast">
                    <span class="micl-list-item__text">Dark High Contrast</span>
                </option>
            </select>
        </div>
        <div id="settings-directionality">
            <label for="directionality" class="md-sys-typescale-body-medium">Right to left:</label>
            <input type="checkbox" class="micl-switch" id="directionality" role="switch">
        </div>
    </div>
    <div class="micl-dialog__actions">
        <button type="button" class="micl-button-text-s" popovertarget="settings">Close</button>
    </div>
</dialog>`;

try {
    const savedTheme = localStorage.getItem('theme');
    const themelink  = document.getElementById('theme-link');
    if (savedTheme && themelink) {
        themelink.href = `themes/${savedTheme}/theme.css`
        const theme = document.getElementById('theme');
        if (theme) {
            theme.value = savedTheme;
        }
    }
    const savedMode = localStorage.getItem('mode');
    if (savedMode) {
        document.body.setAttribute('class', document.body.classList.toString().split(' ').filter(
            c => c.startsWith('micl')
        ) + ' ' + savedMode);
        const mode = document.getElementById('mode');
        if (mode) {
            mode.value = savedMode;
        }
    }
    const savedDir = localStorage.getItem('dir');
    if (savedDir) {
        document.documentElement.setAttribute('dir', savedDir);
        const directionality = document.getElementById('directionality');
        if (directionality) {
            directionality.checked = savedDir === 'rtl';
        }
    }
}
catch (e) {}

document.getElementById('theme').addEventListener('change', event => {
    const themelink = document.getElementById('theme-link');
    if (themelink) {
        themelink.href = `themes/${event.target.value}/theme.css`
        try {
            localStorage.setItem('theme', event.target.value);
        }
        catch (e) {}
    }
});
document.getElementById('mode').addEventListener('change', event => {
    document.body.setAttribute('class', document.body.classList.toString().split(' ').filter(
        c => c.startsWith('micl')
    ) + ' ' + event.target.value);
    try {
        localStorage.setItem('mode', event.target.value);
    }
    catch (e) {}
});
document.getElementById('directionality').addEventListener('change', event => {
    document.documentElement.setAttribute('dir', event.target.checked ? 'rtl' : 'ltr');
    try {
        localStorage.setItem('dir', event.target.checked ? 'rtl' : 'ltr');
    }
    catch (e) {}
});
