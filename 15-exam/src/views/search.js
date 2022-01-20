import { html } from '../lib.js';
import { searchAlbums } from '../api/data.js';
import { getUserData } from '../util.js';
import { albumCard } from './common.js';

const searchTemplate = (albums, onSearch, isGuest) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>

    <div class="search-result">
        ${albums.length > 0
        ? html`${albums.map(a => albumCard(a, isGuest))}`
        : html`<p class="no-result">No result.</p>`}

    </div>
</section>`;




export async function searchPage(ctx) {
    const target = ctx.querystring.split('=')[1];
    const userData = getUserData();
    const isGuest = userData == null;
    let albums = [];

    if (target) {
        albums = await searchAlbums(decodeURIComponent(target));
    }

    ctx.render(searchTemplate(albums, onSearch, isGuest));

    async function onSearch(event) {
        const search = event.target.previousElementSibling.value;

        if (search) {
            ctx.page.redirect('/search?query=' + encodeURIComponent(search));
        }
    }

}