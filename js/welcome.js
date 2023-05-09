let welcome = document.querySelector('.welcome');
let play = document.querySelector('.video-play-button');
let audio = document.createElement('audio');
audio.src = "../audio/click-button-140881.mp3";
document.body.appendChild(audio);


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
    audio.currentTime = 0;
    audio.play();
    window.location.href = 'index.html';
});

