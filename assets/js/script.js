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
                    start(difficultyLevel);
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

function start(difficultyLevel) {
    $("gameArea").show('slow');
    openMenu.classList.add('hide');
    if (difficultyLevel === easy) {

    }else if (difficultyLevel === hard) {

    }else {
        alert(`Unknown difficulty: ${difficultyLevel}, try again kiddo`);
        throw `Unknown difficulty: ${difficultyLevel}. Aborting!`;
    }
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

