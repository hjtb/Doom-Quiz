//when the dom has loaded add event listeners to the buttons
let globalQuestions;
let difficultyLevel;
let levelQuestions;
let questionIndex = 0;
let lives = 0;
let streak = 0;
const doomGuyRef = document.querySelector("#doom-guy");
const titleImageRef = document.querySelector("#title");
const gameAreaRef = document.querySelector("#game-area");
const scoreCardRef = document.querySelectorAll(".slide-up");
const openMenuRef = document.querySelector("#open-menu"); 
const livesLeftRef = document.querySelector("#lives");
const currentStreakRef = document.querySelector("#streak");
const scoreUpdateRef = document.querySelector("#score-update");
const doomThemeMusicRef = document.querySelector("#doom-theme-music");
const muteButtonRef = document.querySelector("#mute");
const playAgainButtonRef = document.querySelectorAll(".playAgain");
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
            } else if (this.getAttribute("data-type") === "play-again"){
                playAgain();
            } else {
                difficultyLevel = this.getAttribute("data-type");
                start(difficultyLevel);
                doomThemeMusicRef.play();
            }
        });
    }
});

/**
 * Accepts difficult level as a parameter
 * Then slides the open menu out of the way to make way for the game area 
 * Then pass difficulty level to getQuestions
 * @param {string} difficultyLevel 
 */
function start(difficultyLevel) {
    $(gameAreaRef).slideDown('slow').prepend($('.title'));
    $(".title").css({'width':'40vw', 'max-width':'20rem', 'margin':'10px auto'});
    $(openMenuRef).slideUp('fast');
    $(titleImageRef).slideUp('fast');
    getQuestions(difficultyLevel);
}

/**
 * Accepts difficult level as a parameter
 * Uses our difficulty Level to get the correct question set from our questions.json using a fetch request
 * The question set is then passed into shuffle
 * @param {string} difficultyLevel 
 */
//use our difficulty level to retrieve correct questions
function getQuestions(difficultyLevel) {
    fetch("./assets/data/questions.json")
    .then(response => response.json())
    .then(questions => {
        globalQuestions = questions;
        let levelQuestions = questions[`${difficultyLevel}Questions`];
        shuffle(levelQuestions);
        displayQuestion();
    });
}

/**
 * Accepts levelQuestions array as a parameter
 * Uses Fisher-Yates algorithm to shuffle the array 
 * @param {array} levelQuestions 
 */
// Crediting this function - https://javascript.info/task/shuffle
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

  /**
 * Displays the correct question and answer by using the levelQuestions and the difficulty level
 * to retrieve them from the questions.json file and then sets the correct answer to the correct answer div
 * uses shuffle to shuffle the answers of the questions and sets html for lives and streak
 * @param {*}
 */
function displayQuestion() {
    document.activeElement.blur();
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
    displayQuestion.innerHTML = `${questionIndex + 1}. ${questionText}`;
}

/**
 * Accepts answerText string and checks it against the correct answer
 * then calls wrongAnswer/correctAnswer depending on outcome and passes answerText 
 * @param {string} answerText 
 */
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

/**
 * Accepts answer as a parameter
 * Increments streak and also lives if streak is multiple of 3
 * Ends the game if question index has reached the end of the questions
 * Updates characters face on streak
 * Displays the correct message for correct answers and if a life has been gained
 * Calls nextQuestion function if questions are left
 * @param {string} answer 
 */
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

/**
 * Accepts answer as a parameter
 * Reduces lives by 1 and resets streak to 0
 * Ends the game if lives has reached 0
 * Updates characters face
 * Displays the correct message for incorrect answers
 * Calls nextQuestion function if lives not = 0
 * @param {string} answer 
 */
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
    else if (lives <= 0) {
        $(gameAreaRef).slideUp('fast');
        $(youDieRef).slideDown('slow');
    }
}

/**
 * Increments the question index
 * Calls displayQuestion function
 * @param {*} 
 */
function getNextQuestion() {
    questionIndex = questionIndex + 1;
    // remove focus from clicked answer
    document.activeElement.blur();
    displayQuestion();
}

/**
 * Resets the game
 * @param {*} 
 */
function playAgain() {
    $(youDieRef).slideUp('fast');
    $(youSurvivedRef).slideUp('fast');
    questionIndex = 0;
    lives = 3;
    streak = 0;
    $(titleImageRef).slideDown('slow');
    $(openMenuRef).slideDown('slow');
}

/**
 * Accepts onOff as a parameter
 * Pauses/Plays the music and resets the innerHTML of the mute button
 * @param {string} onOff 
 */
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
