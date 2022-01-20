async function lockedProfile() {
    const main = document.getElementById('main');
    main.replaceChildren();
    const profiles = await getProfilesData();
    profiles.forEach((p, i) => {
        const divEl = createEl('div', {className: 'profile'},
            createEl('img', {src: "./iconProfile2.png", className: "userIcon"}),
            createEl('label', {}, 'Lock'),
            createEl('input', {type: 'radio', name: `user${i + 1}Locked`, value: 'lock', checked: true}),
            createEl('label', {}, "Unlock"),
            createEl('input', {type: "radio", name: `user${i + 1}Locked`, value: "unlock"}),
            createEl("br", {}),
            createEl("hr", {}),
            createEl("label", {}, "Username"),
            createEl("input", {type: "text", name: `user${i + 1}Username`, value: `${p.username}`, disabled: true, readonly: true}),
            createEl("div", {className: "hiddenInfo", display: 'block'},
                createEl("hr", {}),
                createEl("label", {}, "Email:"),
                createEl("input", {type: "email", name: `user${i + 1}Email`, value: `${p.email}`, disabled: true, readonly: true}),
                createEl("label", {}, "Age:"),
                createEl("input", {type: "email", name: `user${i + 1}Age`, value: `${p.age}`, disabled: true, readonly: true}),
            ),
            createEl('button', {}, "Show more")
            );

        main.appendChild(divEl);

    });

    main.addEventListener('click', toggleProfile);

}

function toggleProfile(event) {
    const currentDiv = event.target.parentNode;
    const hiddenInfo = event.target.previousElementSibling;
    const lockSelect = currentDiv.querySelector('input[type="radio"]')
    const hiddenFields = [...hiddenInfo.children];

    if (lockSelect.checked == false && event.target.textContent == 'Show more') {
        hiddenFields.forEach(el => el.style.display = 'block');
        event.target.textContent = 'Hide it';
    } else if (lockSelect.checked == false && event.target.textContent == 'Hide it') {
        hiddenFields.forEach(el => el.style.display = 'none');
        event.target.textContent = 'Show more';
    }
    
}

async function getProfilesData() {
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';

    const res = await fetch(url);
    const profiles = await res.json();

    const profilesData = Object.values(profiles);

    return profilesData;
}

function createEl(type, attr, ...content) {
    const element = document.createElement(type);

    for (let prop in attr) {
        element[prop] = attr[prop];
    }

    for (let item of content) {
        if (typeof item == 'string' || typeof item == 'number') {
            item = document.createTextNode(item);
        }
        element.appendChild(item);
    }
    return element;
}