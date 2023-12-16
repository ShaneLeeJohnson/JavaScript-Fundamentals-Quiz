// retreives the initials and scores from local storage
const storedScores = JSON.parse(localStorage.getItem('quizScores'));
const storedInitials = JSON.parse(localStorage.getItem('quizInitials'));
// targets the clear button from highScores.html
const clearBtn = document.querySelector('#clear');
// targets the back button from highScores.html
const backBtn = document.querySelector('#go-back');
// targets the high-scores-list from highScores.html
const highScores = document.querySelector('#high-scores-list');

// if storedScores and storedInitials aren't empty, adds each pair of initials and score to the highScores list
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

// when clicked clears the local storage and the highScores list
clearBtn.addEventListener('click', () => {
    localStorage.clear();
    highScores.innerText = '';
})

// navigates back to the index.html page
backBtn.addEventListener('click', () => {
    window.location.href = './index.html';
})