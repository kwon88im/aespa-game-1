// Extended card data with more variety
const allCardData = [
    // Members
    { id: 1, name: 'Karina Whiplash1', image: 'images/karina-whip1.jpg', pair: 'karina' },
    { id: 2, name: 'Karina Whiplash2', image: 'images/karina-whip2.jpg', pair: 'karina' },
    { id: 3, name: 'Winter Whiplash1', image: 'images/winter-whip1.jpg', pair: 'winter' },
    { id: 4, name: 'Winter Whiplash2', image: 'images/winter-whip2.jpg', pair: 'winter' },
    { id: 5, name: 'Giselle Whiplash1', image: 'images/giselle-whip1.jpg', pair: 'giselle' },
    { id: 6, name: 'Giselle Whiplash2', image: 'images/giselle-whip2.jpg', pair: 'giselle' },
    { id: 7, name: 'Ningning Whiplash1', image: 'images/ning-whip1.jpg', pair: 'ningning' },
    { id: 8, name: 'Ningning Whiplash2', image: 'images/ning-whip2.jpg', pair: 'ningning' },
    { id: 9, name: 'Karina Drama1', image: 'images/karina-drama1.jpg', pair: 'karina2' },
    { id: 10, name: 'Karina Drama2', image: 'images/karina-drama2.jpg', pair: 'karina2' },
    { id: 11, name: 'Winter Drama1', image: 'images/winter-drama1.jpg', pair: 'winter2' },
    { id: 12, name: 'Winter Drama2', image: 'images/winter-drama2.jpg', pair: 'winter2' },
    { id: 13, name: 'Giselle Drama1', image: 'images/giselle-drama1.jpg', pair: 'giselle2' },
    { id: 14, name: 'Giselle Drama2', image: 'images/giselle-drama2.jpg', pair: 'giselle2' },
    { id: 15, name: 'Ning Drama1', image: 'images/ning-drama1.jpg', pair: 'ningning2' },
    { id: 16, name: 'Ning Drama2', image: 'images/ning-drama2.jpg', pair: 'ningning2' },
    { id: 17, name: 'Karina DirtyWork1', image: 'images/karina-dw1.jpg', pair: 'karina3' },
    { id: 18, name: 'Karina DirtyWork2', image: 'images/karina-dw2.jpg', pair: 'karina3' },
    { id: 19, name: 'Winter DirtyWork1', image: 'images/winter-dw1.jpg', pair: 'winter3' },
    { id: 20, name: 'Winter DirtyWork2', image: 'images/winter-dw2.jpg', pair: 'winter3' },
    { id: 21, name: 'Giselle DirtyWork1', image: 'images/giselle-dw1.jpg', pair: 'giselle3' },
    { id: 22, name: 'Giselle DirtyWork2', image: 'images/giselle-dw2.jpg', pair: 'giselle3' },
    { id: 23, name: 'Ningning DirtyWork1', image: 'images/ning-dw1.jpg', pair: 'ningning3' },
    { id: 24, name: 'Ningning DirtyWork2', image: 'images/ning-dw2.jpg', pair: 'ningning3' },
    { id: 25, name: 'Karina RichMan1', image: 'images/karina-rm1.jpg', pair: 'karina4' },
    { id: 26, name: 'Karina RichMan2', image: 'images/karina-rm2.jpg', pair: 'karina4' },
    { id: 27, name: 'Winter RichMan1', image: 'images/winter-rm1.jpg', pair: 'winter4' },
    { id: 28, name: 'Winter RichMan2', image: 'images/winter-rm2.jpg', pair: 'winter4' },
    { id: 29, name: 'Giselle RichMan1', image: 'images/giselle-rm1.jpg', pair: 'giselle4' },
    { id: 30, name: 'Giselle RichMan2', image: 'images/giselle-rm2.jpg', pair: 'giselle4' },
    { id: 31, name: 'Ningning RichMan1', image: 'images/ning-rm1.jpg', pair: 'ningning4' },
    { id: 32, name: 'Ningning RichMan2', image: 'images/ning-rm2.jpg', pair: 'ningning4' },
    { id: 33, name: 'Karina Yellow1', image: 'images/karina-yellow1.jpg', pair: 'karina5' },
    { id: 34, name: 'Karina Yellow2', image: 'images/karina-yellow2.jpg', pair: 'karina5' },
    { id: 35, name: 'Winter Yellow1', image: 'images/winter-yellow1.jpg', pair: 'winter5' },
    { id: 36, name: 'Winter Yellow2', image: 'images/winter-yellow2.jpg', pair: 'winter5' },
    { id: 37, name: 'Giselle Yellow1', image: 'images/giselle-yellow1.jpg', pair: 'giselle5' },
    { id: 38, name: 'Giselle Yellow2', image: 'images/giselle-yellow2.jpg', pair: 'giselle5' },
    { id: 39, name: 'Ningning Yellow1', image: 'images/ning-yellow1.jpg', pair: 'ningning5' },
    { id: 40, name: 'Ningning Yellow2', image: 'images/ning-yellow2.jpg', pair: 'ningning5' },
];

// Sound effects
const sounds = {
    flip: new Audio('sounds/flip.mp3'),
    match: new Audio('sounds/match.mp3'),
    win: new Audio('sounds/win.mp3')
};

// Set volume for all sounds
Object.values(sounds).forEach(sound => {
    sound.volume = 0.5;
});

// Sound enabled state
let soundEnabled = true;

// Function to play sound
function playSound(soundName) {
    if (!soundEnabled) return; // Exit immediately if muted
    
    const sound = sounds[soundName];
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log('Sound play failed:', e));
    }
}

// Function to toggle sound
function toggleSound() {
    soundEnabled = !soundEnabled;
    const soundToggle = document.getElementById('sound-toggle');
    if (soundToggle) {
        soundToggle.textContent = soundEnabled ? '🔊' : '🔇';
    }
}

let currentLevel = 'easy';
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer = 0;
let timerInterval = null;
let gameStarted = false;

// Level configurations
const levelConfig = {
    easy: { pairs: 4, gridClass: 'easy' },
    medium: { pairs: 8, gridClass: 'medium' },
    hard: { pairs: 12, gridClass: 'hard' },
    expert: { pairs: 20, gridClass: 'expert' }
};

// High Score Functions
function getHighScore(level) {
    const scores = JSON.parse(localStorage.getItem('aespaMemoryScores')) || {};
    return scores[level] || null;
}

function saveHighScore(level, moves, time) {
    const scores = JSON.parse(localStorage.getItem('aespaMemoryScores')) || {};
    const currentBest = scores[level];
    
    // Check if this is a new best score (fewer moves or same moves but faster time)
    let isNewBest = false;
    if (!currentBest) {
        isNewBest = true;
    } else if (moves < currentBest.moves) {
        isNewBest = true;
    } else if (moves === currentBest.moves && time < currentBest.time) {
        isNewBest = true;
    }
    
    if (isNewBest) {
        scores[level] = { moves, time };
        localStorage.setItem('aespaMemoryScores', JSON.stringify(scores));
        return true;
    }
    return false;
}

function clearHighScores() {
    if (confirm('Are you sure you want to clear all high scores?')) {
        localStorage.removeItem('aespaMemoryScores');
        updateHighScoreDisplay();
        alert('All high scores cleared!');
    }
}

function updateHighScoreDisplay() {
    document.querySelectorAll('.level-btn').forEach(btn => {
        const level = btn.dataset.level;
        const highScore = getHighScore(level);
        
        let scoreDisplay = btn.querySelector('.high-score');
        if (!scoreDisplay) {
            scoreDisplay = document.createElement('span');
            scoreDisplay.className = 'high-score';
            btn.appendChild(scoreDisplay);
        }
        
        if (highScore) {
            scoreDisplay.textContent = `🏆 Best: ${highScore.moves} moves • ${formatTime(highScore.time)}`;
        } else {
            scoreDisplay.textContent = 'No record yet';
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Welcome Modal
    const modal = document.getElementById('welcome-modal');
    const startBtn = document.getElementById('start-btn');
    
    // Close modal when button clicked
    startBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Sound toggle button
    const soundToggle = document.getElementById('sound-toggle');
    if (soundToggle) {
        soundToggle.addEventListener('click', toggleSound);
    }
    
    // Show level selection
    showLevelSelection();
    
    // Level selection buttons
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const level = e.currentTarget.dataset.level;
            startGame(level);
        });
    });
    
    // Game buttons
    document.getElementById('restart').addEventListener('click', () => startGame(currentLevel));
    document.getElementById('back-to-menu').addEventListener('click', showLevelSelection);
    
    // Clear scores button
    const clearBtn = document.getElementById('clear-scores');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearHighScores);
    }
});

// Show level selection screen
function showLevelSelection() {
    document.getElementById('level-selection').style.display = 'block';
    document.getElementById('game-screen').style.display = 'none';
    updateHighScoreDisplay();
    
    if (timerInterval) {
        clearInterval(timerInterval);
    }
}

// Start game with selected level
function startGame(level) {
    currentLevel = level;
    document.getElementById('level-selection').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    
    const levelName = level.charAt(0).toUpperCase() + level.slice(1);
    document.getElementById('current-level').textContent = levelName;
    
    // Display current high score for this level
    const highScore = getHighScore(level);
    let bestScoreText = 'No record';
    if (highScore) {
        bestScoreText = `🏆 ${highScore.moves} moves • ${formatTime(highScore.time)}`;
    }
    document.getElementById('best-score').textContent = bestScoreText;
    
    initGame();
}

// Initialize game
function initGame() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    
    // Get number of pairs for current level
    const pairsNeeded = levelConfig[currentLevel].pairs;
    
    // Select cards for this level
    cards = allCardData.slice(0, pairsNeeded * 2);
    shuffleCards();
    
    // Reset variables
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    timer = 0;
    gameStarted = false;
    
    document.getElementById('moves').textContent = '0';
    document.getElementById('timer').textContent = '0:00';
    
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    // Set grid class
    gameBoard.className = 'game-board ' + levelConfig[currentLevel].gridClass;
    
    // Create card elements
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = index;
        cardElement.dataset.pair = card.pair;
        
        cardElement.innerHTML = `
            <div class="card-front">æ</div>
            <div class="card-back">
                <img src="${card.image}" alt="${card.name}">
            </div>
        `;
        
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

// Shuffle cards
function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

// Start timer
function startTimer() {
    if (!gameStarted) {
        gameStarted = true;
        timerInterval = setInterval(() => {
            timer++;
            const minutes = Math.floor(timer / 60);
            const seconds = timer % 60;
            document.getElementById('timer').textContent = 
                `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }
}

// Flip card
function flipCard() {
    if (flippedCards.length >= 2) return;
    if (this.classList.contains('flipped') || this.classList.contains('matched')) return;
    
    startTimer();
    
    this.classList.add('flipped');
    flippedCards.push(this);

    // Play flip sound
    playSound('flip');
    
    if (flippedCards.length === 2) {
        moves++;
        document.getElementById('moves').textContent = moves;
        checkMatch();
    }
}

// Check for match
function checkMatch() {
    const [card1, card2] = flippedCards;
    const pair1 = card1.dataset.pair;
    const pair2 = card2.dataset.pair;
    
    if (pair1 === pair2) {
        // Match found! Play match sound
        playSound('match');
        
        // Wait a moment before marking as matched
        setTimeout(() => {
            card1.classList.add('matched');
            card2.classList.add('matched');
            flippedCards = [];
            matchedPairs++;
            
            if (matchedPairs === levelConfig[currentLevel].pairs) {
                setTimeout(() => {
                    clearInterval(timerInterval);
                    gameComplete();
                }, 500);
            }
        }, 600);
    } else {
        // No match
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// Game complete
function gameComplete() {
    const levelName = currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1);
    const isNewBest = saveHighScore(currentLevel, moves, timer);

    // Play win sound
    playSound('win');
    
    let message = `🎉 Congratulations!\n\n`;
    message += `Level: ${levelName}\n`;
    message += `Moves: ${moves}\n`;
    message += `Time: ${formatTime(timer)}\n\n`;
    
    if (isNewBest) {
        message += `🏆 NEW PERSONAL BEST! 🏆`;
    } else {
        const highScore = getHighScore(currentLevel);
        message += `Your best: ${highScore.moves} moves • ${formatTime(highScore.time)}`;
    }
    
    alert(message);
}

// Format time
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}
