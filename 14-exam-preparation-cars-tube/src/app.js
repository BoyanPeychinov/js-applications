import { page } from './lib.js';
import { decorateContext, updateUserNav } from './middlewares/decorateContext.js';
import { logout } from './api/data.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { homePage } from './views/home.js';
import { catalogPage } from './views/catalog.js';
import { carsByUserIdPage } from './views/myCars.js';
import { createCarPage } from './views/create.js';
import { editCarPage } from './views/edit.js';
import { detailsPage } from './views/details.js';
import { searchCarPage } from './views/search.js';


const root = document.getElementById('site-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/catalog', catalogPage);
page('/my-cars', carsByUserIdPage);
page('/create', createCarPage);
page('/edit/:id', editCarPage);
page('/details/:id', detailsPage);
page('/search', searchCarPage); 


updateUserNav();
page.start()


function onLogout() {
    logout();
    updateUserNav();
    page.redirect('/');
}
