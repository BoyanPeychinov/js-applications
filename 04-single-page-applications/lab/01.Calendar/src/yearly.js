import { hideSection, showSection } from "./dom.js";
import { showCurrentMonth } from "./monthly.js";
import { showYearsSection } from "./selection.js";

let currentYear = null;
let yearInfo = null

export function showCurrentYear(year) {
    yearInfo = year;
    const yearId = `year-${year}`
    currentYear = document.getElementById(yearId);
    showSection(currentYear);
    currentYear.addEventListener('click', onClick);
}

function onClick(event) {
    console.log(currentYear, event);
    const months = currentYear.querySelectorAll('td');
    if (event.target.tagName == "CAPTION") {
        hideSection(currentYear);
        showYearsSection();
    } else if (event.target.className == 'date') {
        const index = [...months].findIndex(m => m == event.target.parentElement);
        const monthId = `month-${yearInfo}-${index+1}`
        hideSection(currentYear);
        showCurrentMonth(monthId);
    } else if (event.target.className == 'day') { 
        const index = [...months].findIndex(m => m == event.target);
        const monthId = `month-${yearInfo}-${index+1}`
        hideSection(currentYear);
        showCurrentMonth(monthId);
    } else {
        return;
    }
}

