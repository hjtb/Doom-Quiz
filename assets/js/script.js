//when the dom has loaded add event listeners to the buttons
let globalQuestions = 1;
let difficultyLevel;
let questionIndex = 0;
let lives = 3;
let streak = 0;

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "answer") {
                let answer = this.innerHTML;
                checkAnswer(answer);
            } else {
                difficultyLevel = this.getAttribute("data-type");
                start(difficultyLevel);
            }
        })
    }
})

let gameArea = document.getElementById("game-area");
let openMenu = document.getElementById("open-menu"); 
let livesLeft = document.getElementById("lives");

// set the difficulty and bring our game area in to replace the initial menu after difficulty has been selected
function start(difficultyLevel) {
    $(gameArea).slideDown('slow').prepend($('.title'));
    $(".title").css({'width':'40vw', 'max-width':'20rem', 'margin':'10px auto'});
    $(openMenu).slideUp('fast');
    if (difficultyLevel === "easy") {
        //console.log(difficultyLevel);
    }else if (difficultyLevel === "hard") {
        //console.log(`should be hard - ${difficultyLevel}`);
    }else {
        throw `Unknown difficulty: ${difficultyLevel}. Aborting!`;
    }
    getQuestions(difficultyLevel);
    console.log(globalQuestions);
}

//use our difficulty level to retrieve correct questions
function getQuestions(difficultyLevel) {
    // fetch will get the data with a promise 
    fetch("./questions.json")
    // then we pass the response from the fetch into an anonymous function that parses the data
    .then(response => response.json())
    // we then pass the result from that function into another anonymous function
    .then(questions => {
        // this will set our globalQuestions as the result
        globalQuestions = questions;
        // we then use our difficultyLevel to get the correct question set from our globalQuestions which we named levelQuestions
        let levelQuestions = questions[`${difficultyLevel}Questions`];
        //finally we pass levelQuestions into updateQuestion and then displayQuestion
        updateQuestion(levelQuestions);
        displayQuestion();
    })
}

//credit this function - https://javascript.info/task/shuffle
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
//i've a feeling I dont need this function now but, I'm hesitant to delete until all functionality has been written
function updateQuestion(levelQuestions) {
    shuffle(levelQuestions)
}

function displayQuestion() {
    let levelQuestions = globalQuestions[`${difficultyLevel}Questions`];
    let currentQuestion = levelQuestions[questionIndex];
    console.log(currentQuestion);
    let questionText = currentQuestion["questionText"];
    let displayQuestion = document.getElementById("question");
    let answerA = document.getElementById("answer-a");
    let answerB = document.getElementById("answer-b");
    let answerC = document.getElementById("answer-c");
    let answerD = document.getElementById("answer-d");
    let answer = document.getElementById("answer");
    answer.setAttribute("answer", currentQuestion.correctAnswer);
    shuffle(currentQuestion.answers);
    answerA.innerHTML = currentQuestion.answers[0];
    answerB.innerHTML = currentQuestion.answers[1];
    answerC.innerHTML = currentQuestion.answers[2];
    answerD.innerHTML = currentQuestion.answers[3];
    livesLeft.innerHTML = lives;
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
    getNextQuestion();
    //console.log(answerText)
    console.log(globalQuestions);
}

function correctAnswer(answer) {
    streak = streak + 1;
    alert(`${answer} is Correct!! You got it right!`);
}

function wrongAnswer(answer) {
    lives = lives - 1;
    streak = 0;
    alert(`${answer} is Wrong!! You die a little!`);
}

function getNextQuestion() {
    questionIndex = questionIndex + 1;
    displayQuestion();
}
// to-do
// add scores/lives functionality
// what to do at end of questions/game?
// fix answer buttons to lose the weird outline after selection
// create a card to hold the face similar to the image used now