const menuButtons = document.querySelectorAll('.menu-button');
const burgerMenu = document.getElementById('burgerMenu');
const selectedNumbersInput = document.getElementById('selectedNumbers');
const confirmationPopup = document.getElementById('confirmationPopup');
const confirmationMessage = document.getElementById('confirmationMessage');
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');

const totalNumbers = 100;
const maxSelections = 4;
let selectedNumbers = [];

// Function to toggle menu visibility and randomize button positions
function toggleMenu() {
    menuButtons.forEach(button => {
        button.classList.toggle('show');
        if (button.classList.contains('show')) {
            randomizeButtonPositions(button);
        }
    });
}

// Create number cards and position them randomly
function createNumberCards() {
    for (let i = 1; i <= totalNumbers; i++) {
        const card = document.createElement('div');
        card.classList.add('number-card');
        card.textContent = i;
        positionCardRandomly(card); // Call function to position the card randomly

        // Add click event to each card
        card.addEventListener('click', () => selectNumber(i));

        document.body.appendChild(card);
    }
}

// Function to randomize button position
function randomizeButtonPositions(button) {
    button.style.left = `${Math.random() * (window.innerWidth - 150)}px`; // Account for button width
    button.style.top = `${Math.random() * (window.innerHeight - 50)}px`; // Account for button height
}

// Function to position card randomly
function positionCardRandomly(card) {
    card.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
    card.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
}

// Function to handle number selection
function selectNumber(number) {
    if (selectedNumbers.length < maxSelections) {
        if (!selectedNumbers.includes(number)) {
            selectedNumbers.push(number);
            selectedNumbersInput.value = ` ${selectedNumbers.join(' ')}`;
            // Reposition all cards (including the selected number)
            randomizeAllCards();
        }
    }

    if (selectedNumbers.length === maxSelections) {
        // Show confirmation popup
        confirmationMessage.textContent = `Is this your number: +371 ${selectedNumbers.join(' ')}`;
        confirmationPopup.style.display = 'block'; // Show the popup
    }
}

// Function to randomize positions of all cards
function randomizeAllCards() {
    const allCards = document.querySelectorAll('.number-card');
    allCards.forEach(card => {
        positionCardRandomly(card); // Reposition each card randomly
    });
}

// Event listeners for buttons in the popup
yesButton.addEventListener('click', () => {
    window.location.href = "https://youtu.be/ti9bzNWWTDY?si=PD8jzBwLk9bLUbCB"; // Redirect to YouTube link
});

noButton.addEventListener('click', () => {
    window.location.href = "index.html"; // Redirect to index.html
});

// Initial setup
createNumberCards();
burgerMenu.addEventListener('click', toggleMenu);
