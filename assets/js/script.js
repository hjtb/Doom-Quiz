//when the dom has loaded add event listeners to the buttons
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "answer") {
                let answer = this.innerHTML;
                checkAnswer(answer);
            } else {
                let difficultyLevel = this.getAttribute("data-type");
                start(difficultyLevel);
            }
        })
    }
})

//const questions;
let gameArea = document.getElementById("game-area");
let openMenu = document.getElementById("open-menu"); 

function start(difficultyLevel) {
    $(gameArea).slideDown('slow').prepend($('.title'));
    $(".title").css({'width':'40vw', 'max-width':'20rem', 'margin':'10px auto'});
    $(openMenu).slideUp('fast');
    if (difficultyLevel === "easy") {
        console.log(difficultyLevel);
    }else if (difficultyLevel === "hard") {
        console.log(`should be hard - ${difficultyLevel}`);
    }else {
        throw `Unknown difficulty: ${difficultyLevel}. Aborting!`;
    }
    getQuestions(difficultyLevel);
}

function getQuestions(difficultyLevel) {
    fetch("./questions.json")
    .then(response => {
       return response.json();
    })
    .then(questions => updateQuestion(questions[`${difficultyLevel}Questions`]));
}

function updateQuestion(questions) {
    console.log(questions);
    let question = questions[0];
    console.log(question);
    let questionText = question["questionText"];
    let displayQuestion = document.getElementById("question");
    let answerA = document.getElementById("answer-a");
    let answerB = document.getElementById("answer-b");
    let answerC = document.getElementById("answer-c");
    let answerD = document.getElementById("answer-d");
    let answer = document.getElementById("answer");
    answer.setAttribute("answer", question.correctAnswer);
    answerA.innerHTML = question.answers[0];
    answerB.innerHTML = question.answers[1];
    answerC.innerHTML = question.answers[2];
    answerD.innerHTML = question.answers[3];
    displayQuestion.innerHTML = questionText;

}

function checkAnswer(answerText) {
    let answer = document.getElementById("answer");
    correctAnswerText = answer.getAttribute("answer");
    if (answerText === correctAnswerText) {
        correctAnswer();
    }else {
        wrongAnswer()
    }
    console.log(answerText)
}

function correctAnswer() {
    alert("You got it right");
}

function wrongAnswer() {
    alert("Wrong answer");
}

