import { html } from "../lib.js";

export const albumCard = (album, isGuest) => html`
<div class="card-box">
    <img src=${album.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: $${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        ${isGuest
        ? null
        : html`<div class="btn-group">
            <a href="/details/${album._id}" id="details">Details</a>
        </div>`}
        
    </div>
</div>`