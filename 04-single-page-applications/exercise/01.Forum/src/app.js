import { createEl } from "./dom.js";

const form = document.querySelector('form');
form.addEventListener('submit', onClick);

const displaySection = document.querySelector('.topic-container');
showPosts();

async function showPosts() {
    const posts = await getPosts();
    
    displaySection.replaceChildren([...posts].map(k => createPostElement(k)))
    for (let [post, data] of Object.entries(posts)) {
        console.log(post, data)

        // postEl.dataset.id = post._id;
        // displaySection.appendChild(postEl);
    }
}

function createPostElement(post) {
    const postEl = createEl('div', { className: "topic-container" },
            createEl('div', { className: "topic-name-wrapper" },
                createEl("div", { className: "topic-name" },
                    createEl("a", { href: "#", className: "normal" },
                        createEl("h2", {}, post.title)
                    ),
                    createEl("div", { className: "columns" },
                        createEl("div", {},
                            createEl("p", {}, createEl("time", {}, 'Date: ', new Date(post.created).toISOString())),
                            createEl("div", { className: "nick-name" },
                                createEl("p", {}, 'Username: ', createEl("span", {}, post.username)),
        ))))));

    return postEl;
}
async function onClick(event) {
    event.preventDefault();

    if (event.target.className == 'cancel') {
        form.reset();
        return;
    }
    const post = await createPost();

    const postEl = createEl('div', { className: "topic-container" },
        createEl('div', { className: "topic-name-wrapper" },
            createEl("div", { className: "topic-name" },
                createEl("a", { href: "#", className: "normal" },
                    createEl("h2", {}, post.title)
                ),
                createEl("div", { className: "columns" },
                    createEl("div", {},
                        createEl("p", {}, createEl("time", {}, 'Date: ', new Date(post.created).toISOString())),
                        createEl("div", { className: "nick-name" },
                            createEl("p", {}, 'Username: ', createEl("span", {}, post.username)),
                        ))))));

    postEl.dataset.id = post._id;

}

async function createPost() {
    const formData = new FormData(form);
    const url = 'http://localhost:3030/jsonstore/collections/myboard/posts';

    const post = {
        title: formData.get('topicName'),
        username: formData.get('username'),
        text: formData.get("postText"),
        created: Date.now()
    }

    const res = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    });

    const data = await res.json();


    return data;
}

async function getPosts() {
    const url = 'http://localhost:3030/jsonstore/collections/myboard/posts';

    const res = await fetch(url);
    const posts = await res.json();

    return Object.values(posts);
}