import { deleteById, getById } from "../api/data.js";
import { createEl } from "../dom.js";

const section = document.getElementById('detailsPage');
section.remove();
let ctx = null

export async function showDetailsPage(ctxTarget, id) {
    ctx = ctxTarget;
    ctx.showSection(section);
    loadIdea(id)
}

async function loadIdea(id) {
    section.replaceChildren();

    const idea = await getById(id);

    section.replaceChildren(createIdeaDiv(idea));
}

function createIdeaDiv(idea) {
    const fragment = document.createDocumentFragment();

    fragment.appendChild(createEl('img', { className: 'det-img', src: idea.img }));
    fragment.appendChild(createEl('div', { className: 'desc' },
        createEl('h2', { className: 'display-5' }, idea.title),
        createEl('p', { className: 'infoType' }, 'Description'),
        createEl('p', { className: 'idea-description' }, idea.description))
    );

    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData && userData.id == idea._ownerId) {
        fragment.appendChild(createEl('div', { className: 'text-center' },
            createEl('a', { className: 'btn detb', href: '', onClick: onDelete }, 'Delete')
        ));
    }

    return fragment;

    function onDelete(event) {
        event.preventDefault();
        const confirmed = confirm('Are you sure you want to delete this idea?');
        if (confirmed) {
            await deleteById(idea._id);
            ctx.goTo('catalog');
        }
    }
}
