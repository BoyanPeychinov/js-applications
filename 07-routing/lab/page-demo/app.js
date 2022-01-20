import page from '//unpkg.com/page/page.mjs';

function homePage () {
    main.innerHTML = '<h2>Home Page</h2><p>Welcome to out site</p>';
}

function catalogPage() {
    main.innerHTML = '<h2>Catalog</h2><p>List of items</p><a href="/catalog/1234">Product</a>';
}

function detailsPage(ctx) {
    main.innerHTML = '<h2>Product</h2><p>Product details</p><button>Buy now</button>';
    document.querySelector('button').addEventListener('click', () => {
        page.redirect('/');
    })
}

function checkoutPage() {
    main.innerHTML = '<h2>Product</h2><p>Cart details</p><button>Products in cart</button>';
}

function aboutPage () {
    main.innerHTML = '<h2>About</h2><p>Contact: +1-555-7915</p>';
}
const views = {
    '/catalog/kitchens': () => '<h2>Kitchen Equipment</h2><p>List of items</p>',
};

const main = document.querySelector('main');

page('/home', homePage);
page('/catalog', catalogPage);
page('/catalog/:id', detailsPage);
page('/about', aboutPage);
page('/checkout', checkoutPage);

page.redirect('/', '/home');

page.start();

showContent();

function showContent(name) {

    const view = views[name];

    if (typeof view == 'function') {
        main.innerHTML = view();
    } else {
        main.innerHTML = '<h2>404</h2><p>Page Not Found</p>';
    }
}