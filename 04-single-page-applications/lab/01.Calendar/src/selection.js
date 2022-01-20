import { showSection, hideSection } from "./dom.js";
import { showCurrentYear } from "./yearly.js";

const section = document.getElementById('years');
section.addEventListener('click', onClick);

export function showYearsSection() {
    showSection(section);
}


function onClick(event) {
    if (event.target.className != 'day' && event.target.className != 'date') {
        return;
    };

    let year = event.target.innerText
    
    hideSection(section);
    showCurrentYear(year);
}


