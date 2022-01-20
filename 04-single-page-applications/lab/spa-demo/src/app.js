import { showAboutPage, showHomePage } from "./views/home.js";
import { showCatalogPage } from "./views/catalog.js"
import { showLoginPage } from "./views/login.js";
import { showRegisterPage } from "./views/register.js";
import { logout } from "./api/data.js";
import { showSection } from './dom.js';


document.getElementById('logoutBtn').addEventListener('click', onLogout);
document.querySelector('nav').addEventListener('click', onNavigate);

const views = {
    'home': showHomePage,
    'about': showAboutPage,
    'catalog': showCatalogPage,
    'login': showLoginPage,
    'register': showRegisterPage
}

const links = {
    'homeBtn': 'home',
    'aboutBtn': 'about',
    'catalogBtn': 'catalog',
    'loginBtn': 'login',
    'registerBtn': 'register'
}

updateUserNav();

const ctx = {
    updateUserNav,
    goTo,
    showSection
};

goTo('home');

function onNavigate(event) {
    if (event.target.tagName == "A") {
        const name = links[event.target.id];
        if (name) {
            event.preventDefault();
            goTo(name);
        }
    }
}

function goTo(name, ...params) {
    const view = views[name];
    if (typeof view == 'function') {
        view(ctx, ...params);
    }
}

export function updateUserNav() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData != null) {
        document.getElementById('userNav').style.display = 'inline-block';
        document.getElementById('guestNav').style.display = 'none';
    } else {
        document.getElementById('userNav').style.display = 'none';
        document.getElementById('guestNav').style.display = 'inline-block';

    }
}

async function onLogout(event) {
    event.stopImmediatePropagation();

    await logout();

    updateUserNav();
    goTo('home');
}