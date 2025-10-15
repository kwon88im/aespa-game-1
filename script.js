// Card data - aespa members and their ae-avatars
const cardData = [
    { id: 1, name: 'Karina', image: 'images/karina.jpg', pair: 'karina' },
    { id: 2, name: 'ae-Karina', image: 'images/ae-karina.jpg', pair: 'karina' },
    { id: 3, name: 'Winter', image: 'images/winter.jpg', pair: 'winter' },
    { id: 4, name: 'ae-Winter', image: 'images/ae-winter.jpg', pair: 'winter' },
    { id: 5, name: 'Giselle', image: 'images/giselle.jpg', pair: 'giselle' },
    { id: 6, name: 'ae-Giselle', image: 'images/ae-giselle.jpg', pair: 'giselle' },
    { id: 7, name: 'Ningning', image: 'images/ningning.jpg', pair: 'ningning' },
    { id: 8, name: 'ae-Ningning', image: 'images/ae-ningning.jpg', pair: 'ningning' }
];

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer = 0;
let timerInterval = null;
let gameStarted = false;

// Initialize game
function initGame() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    
    // Reset variables
    cards = [...cardData];
    shuffleCards();
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
    
    // Create card elements
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = index;
        cardElement.dataset.pair = card.pair;
        
cardElement.innerHTML = `
    <div class="card-front">?</div>
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
        // Match found!
        card1.classList.add('matched');
        card2.classList.add('matched');
        flippedCards = [];
        matchedPairs++;
        
        if (matchedPairs === cardData.length / 2) {
            setTimeout(() => {
                clearInterval(timerInterval);
                alert(`🎉 Congratulations! You completed the game in ${moves} moves and ${formatTime(timer)}!`);
            }, 500);
        }
    } else {
        // No match
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// Format time
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Restart button
document.getElementById('restart').addEventListener('click', initGame);

// Start game on load
initGame();