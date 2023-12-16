const questions = [
    {
        question: 'JavaScript is an _______ language',
        answers: ['Object-Oriented', 'Object-Based', 'Procedural', 'None of the above'],
        correctAnswer: 'Object-Oriented'
    },
    {
        question: 'Which of the following keywords is used to define a variable in JavaScript?',
        answers: ['var', 'let', 'const', 'All of the above'],
        correctAnswer: 'All of the above'
    },
    {
        question: 'Which of the following methods is used to access HTML elements using Javascript?',
        answers: ['getElementById()', 'getElementByClassName()', 'Both A and B', 'None of the above'],
        correctAnswer: 'Both A and B'
    },
    {
        question: 'How can a datatype be declared to be a constant type?',
        answers: ['const', 'var', 'let', 'constant'],
        correctAnswer: 'const'
    },
    {
        question: 'Using a(n) _______ statement is how you test for a specific condition.',
        answers: ['Select', 'If', 'Switch', 'For'],
        correctAnswer: 'If'
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        answers: ['alertBox("Hello World");', 'msgBox("Hello World");', 'msg("Hello World");', 'alert("Hello World");'],
        correctAnswer: 'alert("Hello World");'
    },
    {
        question: 'How do you create a function in JavaScript?',
        answers: ['const myFunction = function()', 'function myFunction()', 'const myFunction = () =>', 'All of the above'],
        correctAnswer: 'All of the above'
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
    let remainingTime = 60;
    timerElement.innerText = remainingTime;
    timerInterval = setInterval(() => {
        remainingTime -= 1;
        timerElement.innerText = remainingTime;
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