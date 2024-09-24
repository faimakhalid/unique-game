let sequence = [];
let playerSequence = [];
let colors = ['red', 'blue', 'green', 'yellow'];
let level = 0;

function flashColor(color) {
    const box = document.getElementById(color);
    box.style.opacity = '0.5';
    setTimeout(() => {
        box.style.opacity = '1';
    }, 300);
}

function playSequence() {
    playerSequence = [];
    let i = 0;
    const interval = setInterval(() => {
        flashColor(sequence[i]);
        i++;
        if (i >= sequence.length) clearInterval(interval);
    }, 600);
}

function startGame() {
    level = 0;
    sequence = [];
    nextLevel();
}

function nextLevel() {
    level++;
    document.getElementById('message').textContent = `Level ${level}`;
    const randomColor = colors[Math.floor(Math.random() * 4)];
    sequence.push(randomColor);
    setTimeout(() => {
        playSequence();
    }, 500);
}

function playerChoice(color) {
    playerSequence.push(color);
    flashColor(color);
    if (!checkSequence()) {
        document.getElementById('message').textContent = "Wrong! Game Over!";
        resetGame();
        return;
    }

    if (playerSequence.length === sequence.length) {
        document.getElementById('message').textContent = "Good Job! Next Level...";
        setTimeout(() => {
            nextLevel();
        }, 1000);
    }
}

function checkSequence() {
    for (let i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== sequence[i]) {
            return false;
        }
    }
    return true;
}

function resetGame() {
    sequence = [];
    playerSequence = [];
    setTimeout(() => {
        startGame();
    }, 2000);
}