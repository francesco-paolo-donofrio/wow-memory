document.addEventListener('DOMContentLoaded', () => {
    console.log("Script is loaded successfully.");

    resetGameState();

    document.getElementById('startGame').addEventListener('click', () => {
        if (difficultySelected) {
            document.querySelector('.f-d-container-main').classList.remove('d-none');
            startGame();
        }
    });

    document.getElementById('statsButton').addEventListener('click', showStats);

});

// Array di carte in modalità easy
const easyCards = [
    { name: 'axe', img: './img/axe.webp' },
    { name: 'axe', img: './img/axe.webp' },
    { name: 'water', img: './img/water.webp' },
    { name: 'water', img: './img/water.webp' },
    { name: 'wand', img: './img/wand.webp' },
    { name: 'wand', img: './img/wand.webp' },
    { name: 'ring', img: './img/ring.webp' },
    { name: 'ring', img: './img/ring.webp' },
    { name: 'potion', img: './img/potion.webp' },
    { name: 'potion', img: './img/potion.webp' }
];

// Array di carte in modalità medium
const mediumCards = [
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
    { name: 'gold', img: './img/gold.webp' }
];

// Array di carte in modalità hard
const hardCards = [
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
    { name: 'bandage', img: './img/bandage.webp' },
    { name: 'bandage', img: './img/bandage.webp' },
    { name: 'coin', img: './img/coin.webp' },
    { name: 'coin', img: './img/coin.webp' },
    { name: 'deadHead', img: './img/deadHead.webp' },
    { name: 'deadHead', img: './img/deadHead.webp' },
    { name: 'dwarf', img: './img/dwarf.webp' },
    { name: 'dwarf', img: './img/dwarf.webp' },
    { name: 'elf', img: './img/elf.webp' },
    { name: 'elf', img: './img/elf.webp' },
    { name: 'fear', img: './img/fear.webp' },
    { name: 'fear', img: './img/fear.webp' },
    { name: 'head', img: './img/head.webp' },
    { name: 'head', img: './img/head.webp' },
    { name: 'human', img: './img/human.webp' },
    { name: 'human', img: './img/human.webp' },
    { name: 'lingot', img: './img/lingot.webp' },
    { name: 'lingot', img: './img/lingot.webp' },
    { name: 'lion', img: './img/lion.webp' },
    { name: 'lion', img: './img/lion.webp' },
    { name: 'mace', img: './img/mace.webp' },
    { name: 'mace', img: './img/mace.webp' },
    { name: 'orc', img: './img/orc.webp' },
    { name: 'orc', img: './img/orc.webp' },
    { name: 'post', img: './img/post.webp' },
    { name: 'post', img: './img/post.webp' },
    { name: 'shield', img: './img/shield.webp' },
    { name: 'shield', img: './img/shield.webp' },
    { name: 'shirt', img: './img/shirt.webp' },
    { name: 'shirt', img: './img/shirt.webp' },
    { name: 'staff', img: './img/staff.webp' },
    { name: 'staff', img: './img/staff.webp' },
    { name: 'sword', img: './img/sword.webp' },
    { name: 'sword', img: './img/sword.webp' },
    { name: 'troll', img: './img/troll.webp' },
    { name: 'troll', img: './img/troll.webp' },
    { name: 'undead', img: './img/undead.webp' },
    { name: 'undead', img: './img/undead.webp' },
    { name: 'wood', img: './img/wood.webp' },
    { name: 'wood', img: './img/wood.webp' },
];

// Variabili di stato del gioco
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let timer;
let seconds = 0;
let moves = -1;
let errors = -1;
let currentDifficulty = 'medium';
let difficultySelected = false;

// Funzione che fa partire il timer di gioco
function startTimer() {
    timer = setInterval(function () {
        seconds++;
        updateTimer();
    }, 1000);
}
// Funzione che sblocca il bottone start quando il gioco è iniziato
function enableStartButton() {
    document.getElementById('startGame').removeAttribute('disabled');
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

function resetGameState() {
    difficultySelected = false;
    document.getElementById('startGame').setAttribute('disabled', 'disabled');
    // ... (altri reset necessari)
}


// Mescola l'array di carte
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function updateStats() {
    document.getElementById('statMoves').textContent = `Moves: ${moves}`;
    document.getElementById('statErrors').textContent = `Errors: ${errors}`;

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    document.getElementById('statTime').textContent = `Time: ${timeString}`;
}

function showStats() {
    updateStats();
    const statsModal = new bootstrap.Modal(document.getElementById('modalStats'));
    statsModal.show();
}


// Creo dinamicamente la griglia di carte
function createBoard() {
    const gameBoard = document.querySelector('.f-d-container-main .row');
    gameBoard.innerHTML = '';

    let cardsToUse;
    if (currentDifficulty === 'hard') {
        cardsToUse = hardCards;
    } else if (currentDifficulty === 'easy') {
        cardsToUse = easyCards;
    } else { // medium
        cardsToUse = mediumCards;
    }

    const shuffledCards = shuffle([...cardsToUse]); // Creiamo una copia dell'array prima di mescolarlo

    shuffledCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('col', 'mb-2', 'd-flex', 'justify-content-center', 'align-items-center');
        const isSmall = currentDifficulty === 'hard' ? 'small' : '';
        cardElement.innerHTML = `
            <div class="flip-card ${isSmall}">
                <div class="flip-card-inner" data-name="${card.name}">
                    <div class="flip-card-front">
                        <img class="card ${isSmall}" src="./img/trading-card.png" alt="front-card">
                    </div>
                    <div class="flip-card-back">
                        <img class="item-card ${isSmall}" src="${card.img}" alt="${card.name}">
                    </div>
                </div>
            </div>
        `;
        gameBoard.appendChild(cardElement);
    });
}

document.querySelector('.dropdown-menu').addEventListener('click', (e) => {
    if (e.target.classList.contains('dropdown-item')) {
        currentDifficulty = e.target.textContent.toLowerCase();
        difficultySelected = true;
        enableStartButton();
        prepareGame();
    }
});

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
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

// Controlla se le carte selezionate sono una coppia
function checkForMatch() {
    updateMoves();
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();

    if (document.querySelectorAll('.flip-card-inner.flip').length === document.querySelectorAll('.flip-card-inner').length) {
        stopTimer();
        setTimeout(() => {
            celebrateCompletion(); 
            saveGameResult();
            showStats();
        }, 500);
    }
}

function saveGameResult() {
    const result = {
        date: new Date().toLocaleString(),
        moves: moves,
        errors: errors,
        time: formatTime(seconds),
        difficulty: currentDifficulty
    };

    let history = JSON.parse(localStorage.getItem('gameHistory')) || [];
    history.push(result);
    localStorage.setItem('gameHistory', JSON.stringify(history));
}

function updateStatsHistory() {
    const history = JSON.parse(localStorage.getItem('gameHistory')) || [];
    const historyTable = document.getElementById('statsHistory');
    historyTable.innerHTML = '';

    history.slice(-5).reverse().forEach(result => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${result.date}</td>
            <td>${result.moves}</td>
            <td>${result.errors}</td>
            <td>${result.time}</td>
            <td>${result.difficulty}</td>
        `;
        historyTable.appendChild(row);
    });
}

function showStats() {
    updateStats();
    updateStatsHistory();
    const statsModal = new bootstrap.Modal(document.getElementById('modalStats'));
    statsModal.show();
}

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Disabilita le carte corrispondenti
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    firstCard.classList.add('match-animation');
    secondCard.classList.add('match-animation');

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

const restartButton = document.getElementById('restartGame');
restartButton.addEventListener('click', () => {
    const closeModalBtn = document.getElementById('closeModal');
    closeModalBtn.click();
    document.querySelector('.f-d-container-main').classList.remove('d-none');
    initGame();
})

// Funzione per l'animazione dei coriandoli alla fine del gioco
function celebrateCompletion() {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        }));
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        }));
    }, 250);
}

// Prepara il gioco prima di essere inizializzato con startGame
function prepareGame() {
    resetGame();
    createBoard();
    const mainContainer = document.querySelector('.f-d-container-main');
    mainContainer.classList.remove('d-none', 'hard');
    if (currentDifficulty === 'hard') {
        mainContainer.classList.add('hard');
    }
    updateStats();
}

// Inizializza il gioco
function initGame() {
    resetGameState();
    prepareGame();
    startGame();
}

function startGame() {
    startTimer();
    addCardEventListeners();
}