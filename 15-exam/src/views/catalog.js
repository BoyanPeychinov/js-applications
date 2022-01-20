import { getAllAlbums } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';
import { albumCard } from './common.js';


const catalogTemplate = (albums, isGuest) => html`
<section id="catalogPage">
    <h1>All Albums</h1>

    ${albums.length > 0
    ? html`${albums.map(a => albumCard(a, isGuest))}`
    : html`<p>No Albums in Catalog!</p>`}    

</section>`;


export async function catalogPage(ctx) {
    const albums = await getAllAlbums();
    const userData = getUserData();
    const isGuest = userData == null;

    ctx.render(catalogTemplate(albums, isGuest));
}