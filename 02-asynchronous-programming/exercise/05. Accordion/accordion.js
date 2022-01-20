async function solution() {
    console.log("It works");
    const main = document.getElementById('main');
    const articles = await getArticles();
    articles.forEach(a => {
        const divEl = createEl('div', {className: "accordion"},
        createEl("div", {className: "head"},
            createEl("span", {}, `${a.title}`),
            createEl("button", {className: "button", id: `${a._id}`}, "More")
        ),
        createEl("div", {className: "extra"})
        );
        main.appendChild(divEl);
    });

    main.addEventListener('click', toggleArticle)
}

async function toggleArticle(event) {
    const currentArticleData = await getCurrentAricle(event.target.id);
    const currentExtraDiv = event.target.parentNode.nextSibling;
    
    if (event.target.textContent == 'More') {
        event.target.textContent = 'Less';
        currentExtraDiv.appendChild(createEl("p", {}, `${currentArticleData.content}`));
        currentExtraDiv.style.display = 'block';
    } else if (event.target.textContent == 'Less') {
        event.target.textContent = 'More';
        currentExtraDiv.replaceChildren();
        currentExtraDiv.style.display = 'none';
    }
}

solution();

async function getArticles() {
    const url = 'http://localhost:3030/jsonstore/advanced/articles/list';

    const res = await fetch(url);
    const articles = await res.json();

    return articles;
}

async function getCurrentAricle(id) {
    const url = 'http://localhost:3030/jsonstore/advanced/articles/details/' + id;

    const res = await fetch(url);
    const article = await res.json();

    return article;
}

function createEl(type, attr, ...content) {
    const element = document.createElement(type);

    for (let prop in attr) {
        element[prop] = attr[prop];
    }

    for (let item of content) {
        if (typeof item == 'string' || typeof item == 'number') {
            item = document.createTextNode(item);
        }
        element.appendChild(item);
    }

    return element;
}