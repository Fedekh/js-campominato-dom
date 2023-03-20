// Generare una griglia di gioco quadrata in cui ogni cella contiene un numero compreso tra 1 e 100.
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.
// [23, 65, 1, 4,78,15,....];
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

// **BONUS:**
// 1 - L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
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



    v

// DICHIARAZIONI
//  definisco in primis alcune variabili che mi serviranno con scope globale 
const btn = document.querySelector(".btn"); // questo è il buttone che mi indicherà poi la difficoltà
const grid = document.querySelector(".grid") // griglia le cui caselle dipenderanno dalal difficoltà selezionata 
let gridGenerated = false; // mi dice se la grid è stata generata gia o meno
let choise = document.getElementById("select"); // variabile legata al menu a tendina della difficolta
console.log(choise.value);


// #################################################################################################################
// FUNZIONI


/**
 * Description Funzione che genera array di numberQuantity numeri random nel range da 1 a maxNumber(difficola gioco), i numeri sono unici
 * @param {number} numbersQuantity
 * @param {number} maxNumber (puo essere o 100 o 81 o 49)
 * @returns {array}
 */
function generateBomb (numbersQuantity, maxNumber){
    // creare array vuoto
    // Finche la lunghezza array è < di numbersQuantity
    //     genero un numero random nel Range
    //     se il numero non è gia presente nell array lo Push , altrimenti continuo a generare

}


/**
 * Description mi genera la griglia con gli elementi, dipendentemente dal numero di elementi in argomento
 * @param {numberSquare} numberOfSquares che sarebbe numberSquare
 * @void
 */
function generateGrid(numberOfSquares) {
    let currentElem ="";
    let lastClass = choise.value;
    console.log(lastClass);
    grid.innerHTML = "";
    for (let k = 1; k <= numberOfSquares; k++) {
        currentElem = document.createElement("div"); //creo un elemento nel dom
        currentElem.classList.add("grid-elem", lastClass); //aggiungo la classe stilizzata in css all'elemento appena creato
        currentElem.innerText = k; // imposto il test (o numero) che dovrà poi comparire nella casella nel DOM
        grid.appendChild(currentElem); //aggiungo l'elemento alla griglia       
    }
     return currentElem;
}


// CREO funzione che in base alla scelta dell'utente mi cambia anche il numero degli elementi della grid
function regulationGrid (modeUser) {
    let numberSquare = 0;
    if (modeUser === "easy"){
        numberOfSquare = 100 ;

    } else if (modeUser === "medium") {
        numberOfSquare = 81 ;
    }else if (modeUser === "hard"){
        numberOfSquare = 49 ;
    }

    return numberOfSquare;
}


function itemClick() {
    console.log(this.innerText);    
    this.classList.add("click");    
}

// #####################################################################################################################


// EVENTO IN CUI LA FUNZIONE SOPRA DESCRITTA generateGrid AVVENGA SOLO SE CLICCO IL BTN, inoltre
// la griglia deve essere creata una sola volta, e solo una volta creata posso aggiungere
// eventlistner sul click di ogni singolo elemento della grid


btn.addEventListener('click', function() {
    const mode = choise.value; // modalita scelta dal menu a tendina
    console.log(mode);
    const numberOfSquare = regulationGrid(mode); //richiamo funzione per dare il numero di elementi della grid
    console.log(numberOfSquare);
    const lastNumberGrid = generateGrid(numberOfSquare); 
    grid.append(lastNumberGrid);  
    console.log(lastNumberGrid);     
});






