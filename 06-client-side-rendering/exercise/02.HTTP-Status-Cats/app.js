import { html, render } from './node_modules/lit-html/lit-html.js';
import { cats as catData } from './catSeeder.js';

// template;
// contains cat info
// has toggle button
const catCard = (cat) => html`
<li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button class="showBtn">Show status code</button>
        <div class="status" style="display: none" id="200">
            <h4 class="card-title">Status Code: 200</h4>
            <p class="card-text">Ok</p>
        </div>
    </div>
</li>`

// start:
// parse imported data
// pass to template

const root = document.getAnimations('allCats');
render(html`<ul>${catData.map(catCard)}</ul>`, root);