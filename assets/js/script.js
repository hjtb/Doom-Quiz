//when the dom has loaded add event listeners to the buttons
let globalQuestions;
let difficultyLevel;
let levelQuestions;
let questionIndex = 0;
let lives = 3;
let streak = 0;
let doomGuy = document.getElementById("doom-guy");
let gameArea = document.getElementById("game-area");
let scoreCard = document.getElementsByClassName("slide-up");
let openMenu = document.getElementById("open-menu"); 
let livesLeft = document.getElementById("lives");
let scoreUpdate = document.getElementById("score-update");
let youSurvived = document.getElementById("you-survived");
let doomTheme = document.getElementById("doom-theme");

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
    // console.log(globalQuestions);
}

//use our difficulty level to retrieve correct questions
function getQuestions(difficultyLevel) {
    // fetch will get the data with a promise 
    fetch("./json/questions.json")
    // then we pass the response from the fetch into an anonymous function that parses the data
    .then(response => response.json())
    // we then pass the result from that function into another anonymous function
    .then(questions => {
        // this will set our globalQuestions as the result
        globalQuestions = questions;
        // we then use our difficultyLevel to get the correct question set from our globalQuestions which we named levelQuestions
        let levelQuestions = questions[`${difficultyLevel}Questions`];
        //finally we pass levelQuestions into updateQuestion and then displayQuestion
        //updateQuestion(levelQuestions);
        shuffle(levelQuestions);
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
    shuffle(levelQuestions);
}

function displayQuestion() {
    levelQuestions = globalQuestions[`${difficultyLevel}Questions`];
    let currentQuestion = levelQuestions[questionIndex];
    console.log(currentQuestion);
    let questionText = currentQuestion["questionText"];
    let displayQuestion = document.getElementById("question");
    let answerA = document.getElementById("answer-a");
    let answerB = document.getElementById("answer-b");
    let answerC = document.getElementById("answer-c");
    let answerD = document.getElementById("answer-d");
    let correctAnswerDiv = document.getElementById("correct-answer");
    correctAnswerDiv.setAttribute("correct-answer-text", currentQuestion.correctAnswer);
    shuffle(currentQuestion.answers);
    answerA.innerHTML = currentQuestion.answers[0];
    answerB.innerHTML = currentQuestion.answers[1];
    answerC.innerHTML = currentQuestion.answers[2];
    answerD.innerHTML = currentQuestion.answers[3];
    livesLeft.innerHTML = lives;
    displayQuestion.innerHTML = questionText;
}

function checkAnswer(answerText) {
    let correctAnswerDiv = document.getElementById("correct-answer");
    correctAnswerText = correctAnswerDiv.getAttribute("correct-answer-text");
    if (answerText === correctAnswerText) {
        correctAnswer(answerText);
    }else if (answerText !== correctAnswerText) {
        wrongAnswer(answerText)
    }else {
        alert("Please choose a valid answer!")
    }
    // console.log(globalQuestions);
}

function correctAnswer(answer) {
    streak = streak + 1;
    if (questionIndex === levelQuestions.length) {
        $(gameArea).slideUp('fast');
        youSurvived.innerHTML = "YOU LIVE TO FIGHT ANOTHER DAY!!";
        $(youSurvived).slideDown('slow');
    }
    else {
        scoreUpdate.innerHTML = `${answer} is correct, you are on a streak of ${streak} right answers. You have ${lives} lives left.`;
        $(scoreCard).slideUp('slow').delay(3000);
        $(scoreUpdate).slideDown('slow').delay(3000).slideUp('slow');
        $(scoreCard).slideDown('slow');
        getNextQuestion();
    }
    if (streak > 2) {
        doomGuy.src = "assets/images/doom-guy/god.png";
    }
}

function wrongAnswer(answer) {
    lives = lives - 1;
    streak = 0;
    scoreUpdate.innerHTML = `${answer} is wrong, you lose a life you have ${lives} lives left.`;
    $(scoreCard).slideUp('slow').delay(3000);
    $(scoreUpdate).slideDown('slow').delay(3000).slideUp('slow');
    $(scoreCard).slideDown('slow');
    let youDie = document.getElementById("you-die");
    if (lives === 2) {
        doomGuy.src = "assets/images/doom-guy/guy-2.png";
        getNextQuestion();
    }
    else if (lives === 1) {
        doomGuy.src = "assets/images/doom-guy/guy-1.png";
        getNextQuestion();
    }
    else if (lives === 0) {
        youDie.innerHTML = "YOU DIE!!";
        $(gameArea).slideUp('fast');
        $(youDie).slideDown('slow');
    }
}

function getNextQuestion() {
    questionIndex = questionIndex + 1;
    // remove focus from clicked answer
    document.activeElement.blur();
    displayQuestion();
}

// to-do
// you-survived and you-die
// what to do at end of questions/game?
// more consistent comments
// music that can be toggled on or off
// left and right face animation