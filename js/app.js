// console.log('yo');

// vado a prendere l'elemento nel dom dove dovrò mettere le mie celle
const container = document.querySelector('.container');

// vado a prendere il bottone dove si genererà la griglia
const playButton = document.querySelector('.play');

// mi stabilisco il mio array vuoto per le bombe
// let bombPosition = []

// a questo punto mi creo una funzione che mi crea un div di classe celle
function createGrid(celle) {
    resetGame()
    numeroCelle = celle ** 2
    // Qui cambierò la classe in base alla mia griglia
    if (numeroCelle === 100) {
        container.classList.add('grid_template_hard')

    } else if (numeroCelle === 81) {
        container.classList.add('grid_template_medium')
    } else {
        container.classList.add('grid_template_easy')
    }
    // vado a stabilire in che posizione sono le bombe invocando la mia funzione
    bombPosition = bombGenerator(celle);
    console.log(bombPosition);

    for (let i = 0; i < numeroCelle; i++) {
        // Evoco la mia funzione per creare le celle
        const cella = createCell();
        // metto il numero corrispondente alla casella nel mio div creato
        cella.innerHTML = i + 1

        // a questo punto appendo ogni cella sul mio container
        container.append(cella);
    }
}

// La mia funzione crea Griglia

// creo la mia funzione che va a prelevare il div cella
function createCell() {
    const divElement = document.createElement('div');
    divElement.classList.add('celle');
    // aggiongo l'event listener
    divElement.addEventListener('click', clickCheck);

    return divElement;
}
// creo la mia funziona che va a evidenziare le caselle e stampare nella console il numero relativo alla casella
function clickCheck(event) {
    cell = this;
    // metto un colore alla mia cella se viene cliccata
    cell.classList.toggle('clicked');
    // metto un messaggio in console della cella clickata
    console.log(this.innerHTML);
}

// voglio che la mia griglia appaia solo quando l'utente clicca il tasto gioca
playButton.addEventListener('click', function () {
    createGrid(chooseDifficulty());
});

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
    container.innerHTML = ''
    // resettto eventuali classi aggiunte
    container.classList.remove('grid_template_hard', 'grid_template_medium', 'grid_template_easy')
}


// funzione che genera sempre 16 bombe in posizioni random in base alla difficoltà
function bombGenerator (cells) {
    const bombs = []
    while (bombs.length < 16) {
        //generare un numero randomico tra 1 e numerodicelle
        const n = getRandomIntInclusive(1,(cells**2))
        //se non è uguale a un numero già presente nell'array
        if (!bombs.includes(n)) {
            // lo pusho nell'array bombs
            bombs.push(n)
        }
    }
    return bombs
}
    
    
    

// funzione per generare un numero casuale da un min a un max
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
}
  










