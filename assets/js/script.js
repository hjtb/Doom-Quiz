document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener("click", function() {
            button.addEventListener("click", function() {
                if (this.getAttribute("data-type") === "answer") {
                    let answer = this.getAttribute("id");
                    alert(`You selected ${answer}!`);
                }else {
                    let difficultyLevel = this.getAttribute("data-type");
                    alert(`You clicked ${difficultyLevel}`);
                }
            })
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

