document.addEventListener('DOMContentLoaded', () => {
    console.log("Script is loaded successfully.");

    document.getElementById('startGame').addEventListener('click', () => {
        document.querySelector('.f-d-container-main').classList.remove('d-none');
        initGame();
    });

    // ... il resto del tuo codice esistente ...

    // Aggiungi questo:
    document.getElementById('destroyGame').addEventListener('click', () => {
        stopTimer();
    });
});

// Array di carte con coppie
const cards = [
    { name: 'axe', img: './img/axe.webp' },
    { name: 'axe', img: './img/axe.webp' },
    { name: 'water', img: './img/water.webp' },
    { name: 'water', img: './img/water.webp' },
    { name: 'wand', img: './img/wand.webp' },
    { name: 'wand', img: './img/wand.webp' },
    { name: 'ring', img: './img/ring.webp' },
    { name: 'ring', img: './img/ring.webp' },
    { name: 'potion', img: './img/potion.webp' },
    { name: 'potion', img: './img/potion.webp' },
    { name: 'pants', img: './img/pants.webp' },
    { name: 'pants', img: './img/pants.webp' },
    { name: 'mining', img: './img/mining.webp' },
    { name: 'mining', img: './img/mining.webp' },
    { name: 'healtstone', img: './img/healtstone.webp' },
    { name: 'healtstone', img: './img/healtstone.webp' },
    { name: 'gun', img: './img/gun.webp' },
    { name: 'gun', img: './img/gun.webp' },
    { name: 'gold', img: './img/gold.webp' },
    { name: 'gold', img: './img/gold.webp' },
];

// Variabili di stato del gioco
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let timer;
let seconds = 0;
let moves = -1;
let errors = -1;

// Funzione che fa partire il timer di gioco
function startTimer() {
    timer = setInterval(function() {
        seconds++;
        updateTimer();
    }, 1000);
}

// Funzione che stoppa il timer di gioco
function stopTimer() {
    clearInterval(timer);
}

// Funzione che aggiorna il timer di gioco 
function updateTimer() {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    document.getElementById('timeButton').textContent = 
        `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Funzione che aggiorna il numero di mosse eseguite per il gioco
function updateMoves() {
    moves++;
    document.getElementById('moves').textContent = `Moves: ${moves}`;
}

// Funzione che aggiorna il numero di errori del giocatore
function updateErrors() {
    errors++;
    document.getElementById('errors').textContent = `Errors: ${errors}`;
}

// Funzione che resetta il gioco
function resetGame() {
    seconds = 0;
    moves = -1;
    errors = -1;
    updateTimer();
    updateMoves();
    updateErrors();
    stopTimer();
}


// Mescola l'array di carte
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


// Creo dinamicamente la griglia di carte
function createBoard() {
    const gameBoard = document.querySelector('.f-d-container-main .row');
    gameBoard.innerHTML = '';

    const shuffledCards = shuffle(cards);

    shuffledCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('col', 'mb-2');
        cardElement.innerHTML = `
            <div class="flip-card">
                <div class="flip-card-inner" data-name="${card.name}">
                    <div class="flip-card-front">
                        <img class="card" src="./img/trading-card.png" alt="front-card">
                    </div>
                    <div class="flip-card-back">
                        <img class="item-card" src="${card.img}" alt="${card.name}">
                    </div>
                </div>
            </div>
        `;
        gameBoard.appendChild(cardElement);
    });

    addCardEventListeners();
}

// Aggiungi event listener alle carte
function addCardEventListeners() {
    const cards = document.querySelectorAll('.flip-card-inner');
    cards.forEach(card => card.addEventListener('click', flipCard));
}

// Logica per girare le carte
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    // Incrementa moves solo quando effettivamente giriamo una carta
    if (!this.classList.contains('flip')) {
        updateMoves();
    }

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

// Controlla se le carte selezionate sono una coppia
function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

// Disabilita le carte corrispondenti
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

// Riporta le carte allo stato iniziale se non corrispondono
function unflipCards() {
    lockBoard = true;
    updateErrors();

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

// Resetta le variabili di stato del gioco
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Inizializza il gioco
function initGame() {
    resetGame();
    startTimer();
    createBoard();
}