//when the dom has loaded add event listeners to the buttons
let globalQuestions;
let difficultyLevel;
let levelQuestions;
let questionIndex = 0;
let lives = 1;
let streak = 0;
const doomGuy = document.querySelector("#doom-guy");
const gameArea = document.querySelector("#game-area");
const scoreCard = document.querySelectorAll(".slide-up");
const openMenu = document.querySelector("#open-menu"); 
const livesLeft = document.querySelector("#lives");
const currentStreak = document.querySelector("#streak");
const scoreUpdate = document.querySelector("#score-update");
const youSurvived = document.querySelector("#you-survived");
const doomThemeMusic = document.querySelector("#doom-theme-music");
const muteButton = document.querySelector("#mute");
const youDie = document.querySelector("#you-die");

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "answer") {
                let answer = this.innerHTML;
                checkAnswer(answer);
            } else if (this.getAttribute("data-type") === "toggle-mute"){
                toggleMute(this.textContent);
            } else {
                difficultyLevel = this.getAttribute("data-type");
                start(difficultyLevel);
                doomThemeMusic.play();
            }
        })
    }
})

// set the difficulty and bring our game area in to replace the initial menu after difficulty has been selected
function start(difficultyLevel) {
    $(gameArea).slideDown('slow').prepend($('.title'));
    $(".title").css({'width':'40vw', 'max-width':'20rem', 'margin':'10px auto'});
    $(openMenu).slideUp('fast');
    getQuestions(difficultyLevel);
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
    let questionText = currentQuestion["questionText"];
    let displayQuestion = document.querySelector("#question");
    let answerA = document.querySelector("#answer-a");
    let answerB = document.querySelector("#answer-b");
    let answerC = document.querySelector("#answer-c");
    let answerD = document.querySelector("#answer-d");
    let correctAnswerDiv = document.querySelector("#correct-answer");
    correctAnswerDiv.setAttribute("correct-answer-text", currentQuestion.correctAnswer);
    shuffle(currentQuestion.answers);
    answerA.innerHTML = currentQuestion.answers[0];
    answerB.innerHTML = currentQuestion.answers[1];
    answerC.innerHTML = currentQuestion.answers[2];
    answerD.innerHTML = currentQuestion.answers[3];
    livesLeft.innerHTML = lives;
    currentStreak.innerHTML = streak;
    displayQuestion.innerHTML = questionText;
}

function checkAnswer(answerText) {
    let correctAnswerDiv = document.querySelector("#correct-answer");
    correctAnswerText = correctAnswerDiv.getAttribute("correct-answer-text");
    if (answerText === correctAnswerText) {
        correctAnswer(answerText);
    }else if (answerText !== correctAnswerText) {
        wrongAnswer(answerText)
    }else {
        alert("Please choose a valid answer!")
    }
}

function correctAnswer(answer) {
    streak = streak + 1;
    if (streak % 3 === 0) {
        doomGuy.src = "assets/images/doom-guy/god.png";
        lives ++;
    }
    if (questionIndex === levelQuestions.length) {
        $(gameArea).slideUp('fast');
        youSurvived.innerHTML = "YOU LIVE TO FIGHT ANOTHER DAY!!";
        $(youSurvived).slideDown('slow');
    }
    else {
        if (streak === 3) {
            scoreUpdate.innerHTML = `${answer} IS CORRECT!!  
            You've answered ${streak} right answers in a row.  
            You gain a life!!  
            You have ${lives} lives left.`;
        }else {
            scoreUpdate.innerHTML = `${answer} IS CORRECT!!  
            You're on a streak of ${streak} right answers!   
            You have ${lives} lives left.`;
        }
        $(scoreCard).slideUp('fast').delay(4000);
        $(scoreUpdate).slideDown('slow').delay(4000).slideUp('fast');
        $(scoreCard).slideDown('slow');
        getNextQuestion();
    }
}

function wrongAnswer(answer) {
    lives = lives - 1;
    streak = 0;
    scoreUpdate.innerHTML = `${answer} IS WRONG!!  
    You lose a life!  
    You have ${lives} lives left.`;
    $(scoreCard).slideUp('fast').delay(4000).slideDown('slow');
    $(scoreUpdate).slideDown('slow').delay(4000).slideUp('fast');
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
        $(youDie).slideDown('slow').prepend($(doomGuy)).prepend($('.title'));
    }
}

function getNextQuestion() {
    questionIndex = questionIndex + 1;
    // remove focus from clicked answer
    document.activeElement.blur();
    displayQuestion();
}

function toggleMute(onOff) {
    if (onOff === "On " ) {
        doomThemeMusic.pause();
        muteButton.innerHTML = 'Off <i class="fas fa-volume-mute"></i>';
    }else {
        doomThemeMusic.play();
        muteButton.innerHTML = 'On <i class="fas fa-volume-up"></i>';
    }
    document.activeElement.blur();
}


// to-do
// you-survived and you-die
// what to do at end of questions/game?
// more consistent comments
// music that can be toggled on or off
// left and right face animation