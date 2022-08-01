// console.log('yo');

// vado a prendere l'elemento nel dom dove dovrò mettere le mie celle
const container = document.querySelector('.container');

// vado a prendere il bottone dove si genererà la griglia
const playButton = document.querySelector('.play');
// Inizializzo il mio punteggio
let punteggio = 0
// Quando premo il tasto Gioca!
// voglio che la mia griglia appaia solo quando l'utente clicca il tasto gioca
playButton.addEventListener('click', function () {
    startGame(chooseDifficulty());
});

// a questo punto mi creo una funzione che mi crea un div di classe celle
function startGame(celle) {
    resetGame();
    numeroCelle = celle ** 2;
    // Qui cambierò la classe in base alla mia griglia
    if (numeroCelle === 100) {
        container.classList.add('grid_template_hard');

    } else if (numeroCelle === 81) {
        container.classList.add('grid_template_medium');
    } else {
        container.classList.add('grid_template_easy')
    }
    // vado a stabilire in che posizione sono le bombe invocando la mia funzione
    bombPosition = bombGenerator(celle);
    console.log(bombPosition);

    //invoco la mi funzione per la creazione della griglia in base alle celle
    createGrid(numeroCelle)
}

// La mia funzione crea Griglia
function createGrid(celle) {
    for (let i = 0; i < celle; i++) {
        // Evoco la mia funzione per creare le celle
        const cella = createCell();
        // metto il numero corrispondente alla casella nel mio div creato
        cella.innerHTML = i + 1;

        // a questo punto appendo ogni cella sul mio container
        container.append(cella);
    }
}

// creo la mia funzione che va a prelevare il div cella
function createCell() {
    const divElement = document.createElement('div');
    divElement.classList.add('celle');
    // aggiungo l'event listener
    divElement.addEventListener('click', clickCheck);
    return divElement;
}

// creo la mia funziona che va a evidenziare le caselle e stampare nella console il numero relativo alla casella
function clickCheck(event) {
    cell = this;
    // mi prendo il numero della cella dell'innerHtml
    const numeroCella = parseInt(cell.innerHTML);
    console.log(bombPosition.includes(numeroCella));
    
    // cambio la classe da aggiungere alla cella in base a Se è una bomba o meno
    let classToAdd = 'clicked_safe';
    if (bombPosition.includes(numeroCella)) {
        classToAdd = 'clicked_bomb';
    }
    // aggiungo la classe alla cella
    cell.classList.add(classToAdd);    
    // aggiungo il punto
    if (classToAdd !== 'clicked_bomb') {
        punteggio = punteggio + 1
    } else {
        alert ('GAME OVER...Hai totalizzato un punteggio pari a:\n' + punteggio)
        const cellElement = document.querySelectorAll('.celle');
        console.log(cellElement);
        // tolgo tutti gli event listener
        cellElement.removeEventListener();
    } 
    // metto un messaggio in console della cella clickata
    console.log(numeroCella);
}

function endGame () {
    
}
    

function chooseDifficulty() {
    // prendo l'elemento nel dom della selection
    const difficulty = document.getElementById('difficulty');
    // trasformo il dato della value trovata in Intero
    difficultyInt = parseInt(difficulty.value);
    // In base alla difficoltà scelta cambio il numero di caselle
    if (difficultyInt === 1) {
        console.log('difficoltà 1');
        num = 7;
    } else if (difficultyInt === 2) {
        console.log('difficoltà 2');
        num = 9;
    } else {
        console.log('difficoltà 3');
        num = 10;
    }
    return num
}

// mi creo una funzione per resettare il gioco
function resetGame () {
    // cancello tutto all'interno dell'html del container
    container.innerHTML = '';
    // resettto eventuali classi aggiunte
    container.classList.remove('grid_template_hard', 'grid_template_medium', 'grid_template_easy');
    // resetto il punteggio
    punteggio = 0;
}


// funzione che genera sempre 16 bombe in posizioni random in base alla difficoltà
function bombGenerator (cells) {
    const bombs = [];
    while (bombs.length < 16) {
        //generare un numero randomico tra 1 e numerodicelle
        const n = getRandomIntInclusive(1,(cells**2));
        //se non è uguale a un numero già presente nell'array
        if (!bombs.includes(n)) {
            // lo pusho nell'array bombs
            bombs.push(n);
        }
    }
    return bombs;
}
    
    
    

// funzione per generare un numero casuale da un min a un max
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
}
  










