// Generare una griglia di gioco quadrata in cui ogni cella contiene un numero compreso tra 1 e 100.
// Il computer deve generare 16 numeri casuali (bombe) nello stesso range della difficoltà prescelta.
// I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

// **BONUS:**
// 1 - L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata,
// in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49

// **2- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
// ****3- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
// **Consigli del giorno:**
// ****Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi.
// Ad esempio:
// Di cosa ho bisogno per generare i numeri?
// Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo i dati giusti.
// Le validazioni e i controlli possiamo farli anche in un secondo momento.


// [] Al click del bottone
//     []Genero bombe
//     []calcolare numero massimo di click "non bombe" effettuabili
//     []generare array di "non bombe" cliccate dall utente

// [] Al click di cella
//     []prelevare il numero all interno della cella
//     []SE il numero è nell array di bombe
//         []coloro la cella di rosso
//         []FINE GIOCO UTENTE PERDE

//     []ALTRIMENTI
//         []SE il numero non è nell array di numeri cliccati
//             []La cella diventa blu
//             []Incremento il punteggio  
//             []pusho il numero nell array di numeri gia cliccati  
//             []SE il punteggio è === al numero di click massimo  
//                 []  FINE GIOCO


// DICHIARAZIONI
//  definisco in primis alcune variabili che mi serviranno con scope globale 
const btn = document.querySelector(".btn"); // questo è il buttone che mi indicherà poi la difficoltà
const grid = document.querySelector(".grid") // griglia le cui caselle dipenderanno dalal difficoltà selezionata 
let gridGenerated = false; // mi dice se la grid è stata generata gia o meno
let choise = document.getElementById("select"); // variabile legata al menu a tendina della difficolta
const numberBombs = 16;
let bombs = []; // array vuoto che conterra i famosi 16 numeri randomici di bombe
let gameOver = false; //la uso come flag per vedere se c'è il gameover o meno 




// CLICK EVENTO BOTTONE PLAY

btn.addEventListener('click', function () {
    const mode = choise.value; // modalita scelta dal menu a tendina
    const numberOfSquare = regulationGrid(mode); //richiamo funzione per dare il numero di elementi della grid
    const lastNumberGrid = generateGrid(numberOfSquare);
    bombs = generateBomb(16, regulationGrid(mode)); // genero array di bombe
    console.log(bombs);
});


// **#############################################################################
// ! FUNZIONI


/**
 * Description Funzione che genera array di numberQuantity numeri random nel range da 1 a maxNumber(difficola gioco), i numeri sono unici
 * @param {number} numbersQuantity
 * @param {number} maxNumber (puo essere o 100 o 81 o 49)
 * @returns {array} di 16 numeri casuali
 */
function generateBomb(numbersQuantity, maxNumber) {
    // creare array vuoto
    const numbers = [];
    // Finche la lunghezza array è < di numbersQuantity (16)
    while (numbers.length < numbersQuantity) {
        //     genero un numero random nel Range (100-81-49), creando all interno di questa funzione , un ulteriore funzione, dando gli estremi del range
        const rndNumber = getRndNumber(1, maxNumber);
        //     se il numero non è gia presente nell array lo Push , altrimenti continuo a generare
        if (!numbers.includes(rndNumber)) {
            numbers.push(rndNumber);
        }
    }
    return numbers;
}


/**
 * Description creo una funzione tale per cui dato un preciso range(dipendente dalla modalita easy normal hard) mi genera un numero intero randomico per far inserire casualmente le 16 bombe all interno della griglia
 * @param {number} min
 * @param {number} max
 * @returns {number} il numero randomico mi ritorna
 */
function getRndNumber(min = 1, max = 100) {
    return Math.floor(Math.random() * (max - min)) + min;
}
// console.log(getRndNumber(1, 49));


/**
 * Description mi genera la griglia con gli elementi, dipendentemente dal numero di elementi in argomento scelti dall utente col menu a tendina
 * @param {numberSquare} numberOfSquares che sarebbe numberSquare
 * @void
 */

function generateGrid(numberOfSquares) {
    let currentElem = ""; //elemento che comparira in griglia per ora inizializzato a 0
    let lastClass = choise.value; //mi serve per aggiungere poi la classe con colore di sfondo blu alla cella cliccata
    grid.innerHTML = "";  // mi serve per resettare la griglia ad ogni click play
    for (let k = 1; k <= numberOfSquares; k++) {
        currentElem = document.createElement("div"); //creo un elemento nel dom
        currentElem.classList.add("grid-elem", lastClass); //aggiungo la classe stilizzata in css all'elemento appena creato
        currentElem.innerText = k; // imposto il test (o numero) che dovrà poi comparire nella casella nel DOM
        currentElem.addEventListener("click", itemClick);// dopo la creazione griglia posso aggiungere la chiamata alla funzione tale per cui si colora lo sfondo di blu
        grid.appendChild(currentElem); //aggiungo l'elemento alla griglia       
    }

}


// CREO funzione che in base alla scelta dell'utente mi cambia anche il numero degli elementi della grid
function regulationGrid(modeUser) {
    let numberSquare = 0;
    if (modeUser === "easy") {
        numberSquare = 100;
    } else if (modeUser === "medium") {
        numberSquare = 81;
    } else if (modeUser === "hard") {
        numberSquare = 49;
    }

    return numberSquare;
}

function gameOverAlert() { //funzione che allerta che hai perso
    return alert("Hai perso!");
}


function revealBombs (){ //funzione per far rivelare tutte le bombe al momento della sconfitta
    const allBombs = document.querySelectorAll(".grid-elem");
    for (let i = 0; i < allBombs.length; i++) {
        if (bombs.includes(parseInt(allBombs[i].innerText))) { //controllo se il valore della cella corrente è presente nell'array bombs
            allBombs[i].classList.add("bomb");
        }
    }
}

// Modifico la funzione in modo da tener conto della cella cliccata
function itemClick() {
    this.classList.add("click"); //aggiungo la classe click ovvvero sfondo blu
    clickedNumber = parseInt(this.innerText); //mostro l'intero equivalente a cio che è scritto in cella
    console.log(clickedNumber, typeof clickedNumber);
    console.log("HAI CLICCATO", this.innerText);

    if (bombs.includes(clickedNumber)) {
        console.log("HAI PERSO", clickedNumber);
        this.classList.add("bomb");
        gameOverAlert(); //richiamo funzione che allerta che hai perso
        revealBombs(); //richiamo funzione che mostra tutte le bombe di rosso
        disableCells(); // richiamo funzione che disabilita la griglia per non farti proseguire
        this.innerHTML = "";
        for (let = k ; k < bombs.length ; k++){
            const bombReveal = bombs[k];  
        }
        bombReveal.classList.add("bomb");
        
    } else {
        console.log("puoi continuare");
        return clickedNumber;
    }

}

// QUESTA FUNZIONE SERVE PER FAR SI CHE TUTTE LE CELLE VENGANO DISABILITATE DOPO AVER TROVATO UNA BOMBA
function disableCells() {
    const cells = document.querySelectorAll(".grid-elem"); //ARRAY CONTENENTE TUTTI I DIV CON CLASSE GRID-ELEM OVVERO 100/81/49
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener("click", itemClick); // rimuovo l'evento del click a tutte le celle
    }
}







