import { searchCars } from '../api/data.js';
import { html } from '../lib.js';


const searchCarTemplate = (cars, onSearch) => html`
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">

        ${cars.length == 0
            ? html`<p class="no-cars"> No results.</p>`
            : html`${cars.map(carPreview)}`}

    </div>
</section>`;

const carPreview = (car) => html`
<div class="listing">
    <div class="preview">
        <img src=${car.imageUrl}>
    </div>
    <h2>${car.brand} ${car.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${car.year}</h3>
            <h3>Price: ${car.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${car._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`;


export async function searchCarPage(ctx) {
    const query = ctx.querystring.split('=')[1];
    let cars = [];

    if (query) {
        cars = await searchCars(decodeURIComponent(query));
    }
    
    ctx.render(searchCarTemplate(cars, onSearch));

    async function onSearch(event) {
        const search = event.target.previousElementSibling.value;

        if (search) {
            ctx.page.redirect('/search?query=' + encodeURIComponent(search));
        }
    }
}