import {page, render} from '../lib.js';
import { logout } from '../api/data.js';
import { getUserData } from '../util.js';


const root = document.getElementById('site-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);



export function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;
    
    next();
}

export function updateUserNav() {
    const userData = getUserData();

    if (userData) {
        document.getElementById('profile').style.display = 'block';
        document.getElementById('guest').style.display = 'none';
        document.querySelector('#profile a').textContent = `Welcome ${userData.username}`;
    } else {
        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}


function onLogout() {
    logout();
    updateUserNav();
    page.redirect('/');
}