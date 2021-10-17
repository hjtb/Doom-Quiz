//when the dom has loaded add event listeners to the buttons
let globalQuestions;
let difficultyLevel;
let levelQuestions;
let questionIndex = 0;
let lives = 3;
let streak = 0;
const doomGuyRef = document.querySelector("#doom-guy");
const gameAreaRef = document.querySelector("#game-area");
const scoreCardRef = document.querySelectorAll(".slide-up");
const openMenuRef = document.querySelector("#open-menu"); 
const livesLeftRef = document.querySelector("#lives");
const currentStreakRef = document.querySelector("#streak");
const scoreUpdateRef = document.querySelector("#score-update");
const doomThemeMusicRef = document.querySelector("#doom-theme-music");
const muteButtonRef = document.querySelector("#mute");
const youSurvivedRef = document.querySelector("#you-survived");
const youDieRef = document.querySelector("#you-die");
const answerARef = document.querySelector("#answer-a");
const answerBRef = document.querySelector("#answer-b");
const answerCRef = document.querySelector("#answer-c");
const answerDRef = document.querySelector("#answer-d");

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
                doomThemeMusicRef.play();
            }
        });
    }
});

// set the difficulty and bring our game area in to replace the initial menu after difficulty has been selected
function start(difficultyLevel) {
    $(gameAreaRef).slideDown('slow').prepend($('.title'));
    $(".title").css({'width':'40vw', 'max-width':'20rem', 'margin':'10px auto'});
    $(openMenuRef).slideUp('fast');
    getQuestions(difficultyLevel);
}

//use our difficulty level to retrieve correct questions
function getQuestions(difficultyLevel) {
    // fetch will get the data with a promise 
    fetch("./assets/data/questions.json")
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
    });
}

//credit this function - https://javascript.info/task/shuffle
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

function displayQuestion() {
    levelQuestions = globalQuestions[`${difficultyLevel}Questions`];
    let currentQuestion = levelQuestions[questionIndex];
    let questionText = currentQuestion["questionText"];
    let displayQuestion = document.querySelector("#question");
    let correctAnswerDiv = document.querySelector("#correct-answer");
    correctAnswerDiv.setAttribute("correct-answer-text", currentQuestion.correctAnswer);
    shuffle(currentQuestion.answers);
    answerARef.innerHTML = currentQuestion.answers[0];
    answerBRef.innerHTML = currentQuestion.answers[1];
    answerCRef.innerHTML = currentQuestion.answers[2];
    answerDRef.innerHTML = currentQuestion.answers[3];
    livesLeftRef.innerHTML = lives;
    currentStreakRef.innerHTML = streak;
    displayQuestion.innerHTML = `${questionIndex + 1}. ${questionText}` ;
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
        doomGuyRef.src = "assets/images/doom-guy/god.png";
        lives ++;
    }
    if (questionIndex === levelQuestions.length - 1) {
        $(gameAreaRef).slideUp('fast');
        $(youSurvivedRef).slideDown('slow');
    }
    else {
        if (streak === 3) {
            scoreUpdateRef.innerHTML = `${answer} IS CORRECT!!  
            You've answered ${streak} right answers in a row.  
            You gain a life!!  
            You have ${lives} lives left.`;
        }else {
            scoreUpdateRef.innerHTML = `${answer} IS CORRECT!!  
            You're on a streak of ${streak} right answers!   
            You have ${lives} lives left.`;
        }
        $(scoreCardRef).slideUp('fast').delay(4000);
        $(scoreUpdateRef).slideDown('slow').delay(4000).slideUp('fast');
        $(scoreCardRef).slideDown('slow');
        getNextQuestion();
    }
}

function wrongAnswer(answer) {
    lives = lives - 1;
    streak = 0;
    scoreUpdateRef.innerHTML = `${answer} IS WRONG!!  
    You lose a life!  
    You have ${lives} lives left.`;
    $(scoreCardRef).slideUp('fast').delay(4000).slideDown('slow');
    $(scoreUpdateRef).slideDown('slow').delay(4000).slideUp('fast');
    if (lives === 2) {
        doomGuyRef.src = "assets/images/doom-guy/guy-2.png";
        getNextQuestion();
    }
    else if (lives === 1) {
        doomGuyRef.src = "assets/images/doom-guy/guy-1.png";
        getNextQuestion();
    }
    else if (lives === 0) {
        $(gameAreaRef).slideUp('fast');
        $(youDieRef).slideDown('slow');
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
        doomThemeMusicRef.pause();
        muteButtonRef.innerHTML = 'Off <i class="fas fa-volume-mute"></i>';
    }else {
        doomThemeMusicRef.play();
        muteButtonRef.innerHTML = 'On <i class="fas fa-volume-up"></i>';
    }
    document.activeElement.blur();
}

function displayRules() {
    
    document.activeElement.blur();
}


// to-do
// more consistent comments