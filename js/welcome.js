let welcome = document.querySelector('.welcome');
let play = document.querySelector('.video-play-button');

let i = 0;
let txt = 'Welcome to Board Games!';
let speed = 100;
function typeWriter() {
    if (i < txt.length) {
        welcome.innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
    play.style.display = 'block';
}

welcome.addEventListener('load',typeWriter());

play.addEventListener('click', function () {
    window.location.href = 'index.html';
});