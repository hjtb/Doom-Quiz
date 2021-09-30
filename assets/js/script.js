document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "answer") {
                let answer = this.getAttribute("id");
                alert(`You selected ${answer}!`);
            } else {
                let difficultyLevel = this.getAttribute("data-type");
                start(difficultyLevel);
            }
        })
    }
})

let gameArea = document.getElementById("game-area");
let openMenu = document.getElementById("open-menu"); 
let startButtonHard = document.getElementById("hurt-me");
let startButtonEasy = document.getElementById("too-young");
startButtonHard.addEventListener('click', start);
startButtonEasy.addEventListener('click', start);

// add a transition where the title moves into the game area

function start(difficultyLevel) {
    $(gameArea).slideDown('slow');
    $(".title").css({'width':'40vw', 'max-width':'20rem', 'margin':'30px auto'});
    $(openMenu).slideUp('fast');
    if (difficultyLevel === "easy") {
        console.log(difficultyLevel);
    }else if (difficultyLevel === "hard") {
        console.log(difficultyLevel);
    }else {
        console.log(difficultyLevel);
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

