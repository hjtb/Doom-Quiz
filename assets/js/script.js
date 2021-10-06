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

let gameArea = document.getElementById("game-area");
let openMenu = document.getElementById("open-menu"); 

// set the difficulty and bring our game area in to replace the initial menu after difficulty has been selected
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

//use our difficulty level to retrieve correct questions
function getQuestions(difficultyLevel) {
    fetch("./questions.json")
    .then(response => {
        console.log(response);
        let questions = response.json();
        return questions;
    })
    .then(questions => {
        console.log(questions);
        let levelQuestions = questions[`${difficultyLevel}Questions`];
        console.log(levelQuestions);
        updateQuestion(levelQuestions);
    })
}

//
function updateQuestion(levelQuestions) {
    console.log(levelQuestions);
    let shuffledQuestions = levelQuestions.sort(() => Math.random() - .5);
    let question = shuffledQuestions[0];
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
        correctAnswer(answerText);
    }else if (answerText !== correctAnswerText) {
        wrongAnswer(answerText)
    }else {
        alert("Please choose a valid answer!")
    }
    console.log(answerText)
}

function correctAnswer(answer) {
    alert(`${answer} is Correct!! You got it right!`);
}

function wrongAnswer(answer) {
    alert(`${answer} is Wrong!! You die a little!`);
}

function getNextQuestion() {

}
// to-do
// get next question