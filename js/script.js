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
    { name: 'deathcoil', img: './img/deathcoil.webp' },
    { name: 'deathcoil', img: './img/deathcoil.webp' },
];

// Variabili di stato del gioco
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// Mescola l'array di carte
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Crea dinamicamente la griglia di carte
function createBoard() {
    const gameBoard = document.querySelector('.f-d-container-main');
    gameBoard.innerHTML = ''; // Pulisci il contenuto esistente

    const shuffledCards = shuffle(cards);

    shuffledCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add(); // Usa le classi Bootstrap per la griglia
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

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // Primo clic
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Secondo clic
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

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

// Resetta le variabili di stato del gioco
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Inizializza il gioco
function initGame() {
    createBoard();
}

document.addEventListener('DOMContentLoaded', initGame);


