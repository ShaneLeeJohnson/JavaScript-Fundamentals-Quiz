const questions = [
    {
        question: 'JavaScript is an _______ language',
        answers: ['A. Object-Oriented', 'B. Object-Based', 'C. Procedural', 'D. None of the above'],
        correctAnswer: 'A. Object-Oriented'
    },
    {
        question: 'Which of the following keywords is used to define a variable in JavaScript?',
        answers: ['A. var', 'B. let', 'C. const', 'D. All of the above'],
        correctAnswer: 'D. All of the above'
    },
    {
        question: 'Which of the following methods is used to access HTML elements using Javascript?',
        answers: ['A. getElementById()', 'B. getElementByClassName()', 'C. Both A and B', 'D. None of the above'],
        correctAnswer: 'C. Both A and B'
    },
    {
        question: 'How can a datatype be declared to be a constant type?',
        answers: ['A. const', 'B. var', 'C. let', 'D. constant'],
        correctAnswer: 'A. const'
    },
    {
        question: 'Using a(n) _______ statement is how you test for a specific condition.',
        answers: ['A. Select', 'B. If', 'C. Switch', 'D. For'],
        correctAnswer: 'B. If'
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        answers: ['A. alertBox("Hello World");', 'B. msgBox("Hello World");', 'C. msg("Hello World");', 'D. alert("Hello World");'],
        correctAnswer: 'D. alert("Hello World");'
    },
    {
        question: 'How do you create a function in JavaScript?',
        answers: ['A. const myFunction = function()', 'B. function myFunction()', 'C. const myFunction = () =>', 'D. All of the above'],
        correctAnswer: 'D. All of the above'
    },
    {
        question: 'Which of the following is NOT a primitive data type in JavaScript?',
        answers: ['A. Number', 'B. String', 'C. Boolean', 'D. Object'],
        correctAnswer: 'D. Object'
    },
    {
        question: 'What is the output of the following code: console.log(2 + "2");',
        answers: ['A. "4"', 'B. "22"', 'C. 4', 'D. 22'],
        correctAnswer: 'B. "22"'
    },
    {
        question: 'Which of the following is NOT a comparison operator in JavaScript?',
        answers: ['A. ==', 'B. ===', 'C. !=', 'D. =<'],
        correctAnswer: 'D. =<'
    },
    {
        question: 'What does the "NaN" value represent in JavaScript?',
        answers: ['A. Not a number', 'B. Null value', 'C. Undefined value', 'D. Boolean value'],
        correctAnswer: 'A. Not a number'
    },
    {
        question: 'What is the output of the following code: console.log(2 ** 3);',
        answers: ['A. 5', 'B. 6', 'C. 8', 'D. 9'],
        correctAnswer: 'C. 8'
    },
    {
        question: 'What is the correct syntax for a "for" loop in JavaScript?',
        answers: ['A. for (var i = 0; i < 5; i++)', 'B. for(i = 0; i < 5; i++)', 'C. for (var i = 5; i > 0; i-)', 'D. for (i = 5; i > 0; i-)'],
        correctAnswer: 'A. for (var i = 0; i < 5; i++)'
    },
    {
        question: 'Which of the following is not a data type in JavaScript?',
        answers: ['A. Boolean', 'B. String', 'C. Number', 'D. Character'],
        correctAnswer: 'D. Character'
    },
    {
        question: 'What is the output of the following code: console.log("5" == 5);',
        answers: ['A. true', 'B. false', 'C. Error', 'D. Nan'],
        correctAnswer: 'A. true'
    },
    {
        question: 'What is the output of the following code: console.log(2 + 3 + "4");',
        answers: ['A. "54"', 'B. "9"', 'C. "234"', 'D. Error'],
        correctAnswer: 'A. "54"'
    },
    {
        question: 'What is the output of the following code: console.log(type of NaN);',
        answers: ['A. "number"', 'B. "string"', 'C. "undefined"', 'D. "NaN"'],
        correctAnswer: 'A. "number"'
    },
    {
        question: 'What is the output of the following code: console.log(typeof []);',
        answers: ['A. "array"', 'B. "object"', 'C. "array[]"', 'D. "undefined"'],
        correctAnswer: 'B. "object"'
    },
    {
        question: 'Which of the following is not a valid way to declare a function in JavaScript?',
        answers: ['A. function myFunction() {}', 'B. var myFunction = function() {}', 'C. () => {}', 'D. function = {}'],
        correctAnswer: 'D. function = {}'
    },
    {
        question: 'Which of the following is not a loop in JavaScript?',
        answers: ['A. for', 'B. while', 'C. do...while', 'D. next'],
        correctAnswer: 'D. next'
    }
]

const startButton = document.querySelector('#start-button');
const questionElement = document.querySelector('#main-title');
const startText = document.querySelector('#start-text');
const answerContainer = document.querySelector('#answer-container');
const initialsContainer = document.querySelector('#initials-container')
const timerElement = document.querySelector('#timer');
const answerButtons = document.querySelectorAll('.answer-button');
const feedback = document.querySelector('h2');
const initialsForm = document.querySelector('#enter-initials');
let timerInterval;
let remainingTime;

let score = 0;

function getRandomQuestion(questions) {
    const randIndex = Math.floor(Math.random() * questions.length);
    const selectedQuestion = questions[randIndex];
    questions.splice(randIndex, 1);
    return selectedQuestion;
}

let currentQuestion = getRandomQuestion(questions)

startButton.addEventListener('click', () => {
    gameStarted = true;
    startTimeCountdown();
    showQuestion(currentQuestion);
});

function startTimeCountdown() {
    remainingTime = 120;
    timerElement.innerText = remainingTime;
    timerInterval = setInterval(() => {
        remainingTime -= 1;
        timerElement.innerText = remainingTime;
        if (remainingTime < 60) {
            timerElement.setAttribute('style', 'color: red');
        }
        else {
            timerElement.setAttribute('style', 'color: black');
        }
        if (remainingTime === 0) {
            clearInterval(timerInterval);
            gameOver();
        }
    }, 1000);
}

function showQuestion(question) {
    if (!gameStarted) return;
    startText.style.display = 'none'
    startButton.style.display = 'none'
    answerContainer.hidden = false;
    questionElement.innerText = question.question;
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].innerText = question.answers[i];
        answerButtons[i].addEventListener('click', handleAnswerClick);
    }
}

function checkAnswer(userAnswer, correctAnswer) {
    return userAnswer === correctAnswer;
}

function handleAnswerClick(event) {
    const selectedAnswer = event.target.innerText;
    const isCorrect = checkAnswer(selectedAnswer, currentQuestion.correctAnswer);
    if (isCorrect) {
        feedback.innerText = 'Correct';
        feedback.style.color = 'green';
        score += 1;
    }
    else {
        feedback.innerText = 'Wrong';
        feedback.style.color = 'red';
        remainingTime -= 10;
        timerElement.setAttribute('style', 'color: red');
    }
    setTimeout(() => {
        if (questions.length === 0) {
            clearInterval(timerInterval);
            timerElement.innerText = 0;
            gameOver();
            return;
        }
        currentQuestion = getRandomQuestion(questions);
        showQuestion(currentQuestion);
        feedback.innerText = '';
    }, 1000);
}

function gameOver() {
    initialsContainer.hidden = false;
    questionElement.innerText = 'Game Over!';
    startText.innerText = `Your final score is ${score}.`;
    startText.style.display = 'block';
    answerContainer.hidden = true;
    feedback.innerText = '';
}

initialsForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const initials = document.querySelector('#initials').value;
    if (initials !== '') {
        let initialsArray = JSON.parse(localStorage.getItem('quizInitials'));
        let scoreArray = JSON.parse(localStorage.getItem('quizScores'));
        if (!scoreArray || !initialsArray) {
            initialsArray = [];
            scoreArray = [];
        }

        initialsArray.push(initials);
        scoreArray.push(score);
        localStorage.setItem('quizScores', JSON.stringify(scoreArray));
        localStorage.setItem('quizInitials', JSON.stringify(initialsArray));
        window.location.href = './highScores.html';
    }
    else {
        alert('Please enter your initials');
    }
})