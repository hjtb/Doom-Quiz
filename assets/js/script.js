document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener("click", function() {

        })
    }
})

let startButtonHard = document.getElementById("hurt-me");
let startButtonEasy = document.getElementById("too-young");
let gameArea = document.getElementById("game-area");
let openMenu = document.getElementById("open-menu"); 
startButtonHard.addEventListener('click', start);
startButtonEasy.addEventListener('click', start);

function start() {
    console.log("DOOM");
    gameArea.classList.remove('hide');
    openMenu.classList.add('hide');
}

function getQuestion() {

}

function selectAnswer() {

}

function checkAnswer() {

}

function correctAnswer() {

}

function wrongAnswer() {

}

