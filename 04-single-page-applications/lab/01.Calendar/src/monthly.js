import { hideSection, showSection } from "./dom.js";
import { showCurrentYear } from "./yearly.js";


export function showCurrentMonth(monthId) {    
    
    const currentMonth = document.getElementById(monthId);
    showSection(currentMonth);
    currentMonth.addEventListener('click', onClick);
}

function onClick(event) {    
    if (event.target.tagName == "CAPTION") {
        const year = event.target.innerText.split(' ')[1];

        hideSection(event.target.parentElement);
        showCurrentYear(year);
    }
}