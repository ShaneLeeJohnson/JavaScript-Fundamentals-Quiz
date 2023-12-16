const storedScores = JSON.parse(localStorage.getItem('quizScores'));
const storedInitials = JSON.parse(localStorage.getItem('quizInitials'));
const clearBtn = document.querySelector('#clear');
const backBtn = document.querySelector('#go-back');
const highScores = document.querySelector('#high-scores-list');

if (storedScores && storedInitials) {
    for (let i = 0; i < storedScores.length; i++) {
        const highScore = document.createElement('li');
        const score = storedScores[i];
        const initials = storedInitials[i];
        highScore.innerText = `${initials} - ${score}`;
        highScores.appendChild(highScore);
    }
    highScores.hidden = false;
}


clearBtn.addEventListener('click', () => {
    localStorage.clear();
    highScores.innerText = '';
})

backBtn.addEventListener('click', () => {
    window.location.href = './index.html';
})