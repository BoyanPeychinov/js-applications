import { html } from "../lib.js";
import { addComment, deleteGame, gameDetails, getCommentsByGameId } from "../api/data.js";
import { getUserData } from "../util.js";


const detailsTemplate = (game, comments, hasPerm, canComment, onDelete, onComment) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src=${game.imageUrl} />
            <h1>${game.title}</h1>
            <span class="levels">MaxLevel: ${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>

        <p class="text">${game.summary}</p>

        ${hasPerm
        ? html`<div class="buttons">
            <a href="/edit/${game._id}" class="button">Edit</a>
            <a @click=${onDelete} href=javascript:void(0) id="deleteBtn" class="button">Delete</a>
        </div>`
        : null}

        ${commentsPreview(comments)}

    </div>
    
    ${canComment
        ? addCommentView(onComment)
        : null}

</section>`;

const commentsPreview = (comments) => html`
<div class="details-comments">
    <h2>Comments:</h2>
    <ul>
        ${comments.length == 0
        ? html`<p class="no-comment">No comments.</p>` 
        : html`${comments.map(c => html`<li class="comment"><p>${c.comment}</p></li>`)}`}
</div>`;


const addCommentView = (onComment) => html`
<article class="create-comment">
    <label>Add new comment:</label>
    <form @submit=${onComment} class="form">
        <textarea name="comment" placeholder="Comment......"></textarea>
        <input class="btn submit" type="submit" value="Add Comment">
    </form>
</article>`;


export async function detailsPage(ctx) {
    const [game, comments] = await Promise.all([
        gameDetails(ctx.params.id),
        getCommentsByGameId(ctx.params.id)
    ]);
    
    const userData = getUserData();
    const hasPerm = userData && userData.id == game._ownerId;
    const canComment = userData != null && userData.id != game._ownerId;

    ctx.render(detailsTemplate(game, comments, hasPerm, canComment, onDelete, onComment));

    function onDelete() {
        const result = confirm(`Are you sure you want to delete ${game.title}`);

        if (result && hasPerm) {
            deleteGame(game._id);
            ctx.page.redirect('/');
        }
    }

    function onComment(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const comment = formData.get('comment');

        if (comment == '') {
            return alert('Leave a comment!');
        }

        addComment({
            gameId: game._id,
            comment
        });

        event.target.reset();
        ctx.page.redirect('/details/' + game._id)
    } 
}