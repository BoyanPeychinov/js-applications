const element = document.getElementById('errorBox');
const notification = element.querySelector('span');

export function notify(msg) {
    notification.textContent = msg;
    element.style.display = 'block';

    setTimeout(() => element.style.display = 'none', 3000);
}