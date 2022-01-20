import { getAllMovies } from '../api/data.js';
import { createEl } from "../dom.js";

const catalogSection = document.getElementById('catalogSection');
const ul = catalogSection.querySelector('ul') 
catalogSection.remove();

export function showCatalogPage(ctx) {
    ctx.showSection(catalogSection);
    
    loadMovies();
}

async function loadMovies() {
    ul.replaceChildren(createEl('p', {}, 'Loading...'));
    
    const movies = await getAllMovies();

    ul.replaceChildren(...movies.map(createMovieCard));
}

function createMovieCard(movie) {
    return createEl('li', {}, movie.title);
}
