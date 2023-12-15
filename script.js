// Define the sound effects and background music
const clickSound = new Audio('cardFlip.wav');
const errorSound = new Audio('errorSound.wav');
const startSound = new Audio('startSound.wav');
const backgroundMusic = new Audio('backgroundLoop.wav');
backgroundMusic.loop = true; // Enable looping for the background music

// Initialize game variables
let errors = 0;
const cardList = ["pink", "brown", "green", "blue", "yellow", "purple", "orange", "red", "cyan", "magenta"];
let cardSet;
let board = [];
const rows = 4;
const columns = 5;
let card1Selected;
let card2Selected;

// Array of colors representing a rainbow.
let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

// Variable to keep track of the current color's index in the colors array.
let currentColorIndex = 0;

// Function to change the background color of the webpage.
function changeBackgroundColor() {

    // Update the background color of the body using the current color index.
    document.body.style.backgroundColor = colors[currentColorIndex];

    // Increment the color index, and reset to 0 if it reaches the end of the array.
    // This creates a looping effect through the colors.
    currentColorIndex = (currentColorIndex + 1) % colors.length;
}

//function to have cool strobe effect on "Wrong Guess" number
function changeNumbColor() {
    
    //Using a querySelector to assign color index to score number
    document.querySelector(".errorNum").style.color = colors[currentColorIndex];

    // Increment the color index, and reset to 0 if it reaches the end of the array.
    // This creates a looping effect through the colors.
    currentColorIndex = (currentColorIndex + 1) % colors.length;

}

// Set an interval to call the changeBackgroundColor function every 2000 milliseconds (2 seconds).
// This means the background color will change every 2 seconds.
setInterval(changeBackgroundColor, 4000); // Change color every 2 seconds

setInterval(changeNumbColor, 80);


// Function to shuffle the cards in the card set
function shuffleCards() {
    cardSet = cardList.concat(cardList); // Duplicate each card type for pairing
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length);
        // Swap the current card with a randomly selected card
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
}

// Function to prepare the board without revealing the cards
function prepareBoard() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop();
            row.push(cardImg);

            // Create card elements and add them to the board
            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();
            card.src = "back.jpg"; // Start with the back of the card showing
            card.classList.add("card");
            card.addEventListener("click", selectCard);
            window.document.getElementById("board").append(card);
        }
        board.push(row);
    }
}

// Function to start the game
function startGame() {
    backgroundMusic.play(); // Start the background music
    startSound.play();// Play the starting sound effect when game is reset
    // Briefly show all cards before starting the game
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = window.document.getElementById(r.toString() + "-" + c.toString());
            card.src = board[r][c] + ".jpg";
        }
    }
    // Hide the cards after a brief period
    setTimeout(hideCards, 1000);
}

// Function to hide all cards
function hideCards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "back.jpg";
        }
    }
}

// Function to handle card selection
function selectCard() {
    if (this.src.includes("back")) {
        clickSound.play(); // Play the click sound effect
        if (!card1Selected) {
            card1Selected = this;
            let coords = card1Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);
            card1Selected.src = board[r][c] + ".jpg";
        } else if (!card2Selected && this !== card1Selected) {
            card2Selected = this;
            let coords = card2Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);
            card2Selected.src = board[r][c] + ".jpg";
            setTimeout(update, 1000);
        }
    }
}

// Function to update the game state after two cards are selected
function update() {
    if (card1Selected.src !== card2Selected.src) {
        errorSound.play(); // Play the error sound effect
        card1Selected.src = "back.jpg";
        card2Selected.src = "back.jpg";
        errors += 1;
        document.getElementById("errors").innerText = errors;
    }
    card1Selected = null;
    card2Selected = null;
}

// Set up the game on window load
window.onload = function() {
    shuffleCards();
    prepareBoard();
    // Attach event listener to the start button
    document.getElementById('startButton').addEventListener('click', startGame); 
};
