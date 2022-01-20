import { html, render } from './node_modules/lit-html/lit-html.js';
import articleTemplate from './templates/article.js';


start();

async function start() {
    const data = await (await fetch('./data.json')).json();

    const main = document.querySelector('#content');
    const renderBtn = document.getElementById('renderBtn');
    renderBtn.addEventListener('click', onRender);

    document.getElementById('changeBtn').addEventListener('click', onChange);


    
    function onRender() {

        const result = data.map(a => articleTemplate(onSubmit.bind(null, a), a));
    
        render(result, main);
    }
    
    function onSubmit(article, event){
        event.preventDefault();

        const formData = new FormData(event.target);
        const content = formData.get('comment');

        article.comments.push({content});

        onRender();
    }

    function onChange() {
        data.shift();

        data.unshift(
            {
                "title": "First Article",
                "content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum odit ex sunt obcaecati, nesciunt numquam est doloremque modi dicta commodi et minima fugit dolorum dolore harum aperiam eveniet vel impedit quibusdam veniam inventore distinctio! Illum, dolore iste blanditiis iure cupiditate voluptatum similique magnam placeat at facere laudantium veritatis vitae aspernatur dicta ad asperiores nemo ut nam, quibusdam aliquid est ducimus explicabo exercitationem adipisci. Veritatis, repellendus ut voluptatem quod quibusdam ullam, nisi, velit hic veniam adipisci assumenda. Quam dolore voluptate provident ipsam blanditiis ullam odit officiis voluptates, ducimus doloremque nisi dolor perferendis rem minus eligendi deleniti perspiciatis? Atque necessitatibus laudantium eaque.",
                "author": "John Smith",
                "comments": [],
                "isOwner": true
            }
        );

        onRender();
    }

}

