
const cardDeck = [
    'hearts-r02.svg', 'hearts-r03.svg', 'hearts-r04.svg', 'hearts-r05.svg', 'hearts-r06.svg',
    'hearts-r07.svg', 'hearts-r08.svg', 'hearts-r09.svg', 'hearts-r10.svg', 'hearts-J.svg',
    'hearts-Q.svg', 'hearts-K.svg', 'hearts-A.svg',
    'diamonds-r02.svg', 'diamonds-r03.svg', 'diamonds-r04.svg', 'diamonds-r05.svg', 'diamonds-r06.svg',
    'diamonds-r07.svg', 'diamonds-r08.svg', 'diamonds-r09.svg', 'diamonds-r10.svg', 'diamonds-J.svg',
    'diamonds-Q.svg', 'diamonds-K.svg', 'diamonds-A.svg',
    'clubs-r02.svg', 'clubs-r03.svg', 'clubs-r04.svg', 'clubs-r05.svg', 'clubs-r06.svg',
    'clubs-r07.svg', 'clubs-r08.svg', 'clubs-r09.svg', 'clubs-r10.svg', 'clubs-J.svg',
    'clubs-Q.svg', 'clubs-K.svg', 'clubs-A.svg',
    'spades-r02.svg', 'spades-r03.svg', 'spades-r04.svg', 'spades-r05.svg', 'spades-r06.svg',
    'spades-r07.svg', 'spades-r08.svg', 'spades-r09.svg', 'spades-r10.svg', 'spades-J.svg',
    'spades-Q.svg', 'spades-K.svg', 'spades-A.svg'
]

let playerHand = [];
let playerScore = calculateHandTotal(playerHand);
let baseCard = "css/card-library/images/backs/blue.svg"


function getRandomCard() {
    const randomIndex = Math.floor(Math.random() * cardDeck.length);
    return cardDeck[randomIndex];
}

function calculateHandTotal(hand) {
    let total = 0;
    let hasAce = false;

    for (const card of hand) {
        const cardValue = card.substring(card.lastIndexOf('-') + 1, card.lastIndexOf('.')).replace("r", "");
        console.log('Card:', card, 'Value:', cardValue); // Debugging log
        
        if (cardValue === 'A') {
            hasAce = true;
            total += 11;
        } else if (cardValue === 'K' || cardValue === 'Q' || cardValue === 'J') {
            total += 10;
        } else {
            total += parseInt(cardValue);
        }
    }
    console.log('Total before adjustments:', total); // Debugging log

    if (hasAce && total > 21) {
        total -= 10;
    }
    console.log('Total after adjustments:', total); // Debugging log
    return total;
}

function checkBust(handTotal, playerType) {
    if (handTotal > 21) {
        document.getElementById("message-area").textContent = `${playerType} Bust!`;
        return true;
    }
    return false;
}

function dealPlayer() {
    const randomCard = `images/${getRandomCard()}`;
    playerHand.push(randomCard);
    document.getElementById("playerCard").innerHTML += `<img src="${randomCard}" />`;

    playerScore = calculateHandTotal(playerHand);
    document.getElementById("player-score").textContent = `Score: ${playerScore}`;


    if (checkBust(playerScore, "Player")) {
        document.getElementById("hit-button").disabled = true;
        document.getElementById("stand-button").disabled = true;
        document.getElementById("message-area").textContent = "Player Bust! You lose your bet.";
        modifyPlayerBank(-betAmount); // Subtract the bet amount from the bank
    } else {
        // Compare player's hand with dealer's hand
        // Determine the winner and handle money accordingly
        if (playerScore > dealerScore) {
            document.getElementById("message-area").textContent = "Player wins!";
            modifyPlayerBank(betAmount); // Add the bet amount to the bank
        } else if (playerScore < dealerScore) {
            document.getElementById("message-area").textContent = "Dealer wins! You lose your bet.";
            modifyPlayerBank(-betAmount); // Subtract the bet amount from the bank
        } else {
            document.getElementById("message-area").textContent = "It's a tie! Bet returned.";
            // No change in the bank for a tie
        }
    }
}


// Initialize player's bank
let playerBank = 1000; // You can set an initial amount
document.getElementById("bank").textContent = `Bank: $${playerBank}`;

// Function to modify player's bank (add or subtract)
function modifyPlayerBank(amount) {
    if (amount > 0) {
        playerBank += amount;
        document.getElementById("bank").textContent = `Bank: $${playerBank}`;
    } else if (amount < 0 && playerBank >= -amount) {
        playerBank += amount;
        document.getElementById("bank").innerHTML = `Bank: $${playerBank}`;
    } else {
        // Handle cases when trying to subtract more than available in the bank
        document.getElementById("message-area").textContent = "Not enough money in the bank!";
    }
}

// Example usage when adding or subtracting from player's bank
const winAmount = 50; // Replace this with the actual win amount
modifyPlayerBank(winAmount); // Adds the win amount to the bank

const lossAmount = -30; // Replace this with the actual loss amount (negative value)
modifyPlayerBank(lossAmount); // Subtracts the loss amount from the bank

// Add an event listener to the reset button
document.getElementById('reset-button').addEventListener('click', resetGame);

// Function to reset the game
function resetGame() {
    // Reset player's hand and score
    playerHand = [];
    playerScore = 0;
    document.getElementById("playerCard").innerHTML = `<img id="img1" src="${baseCard}" />`
    document.getElementById("player-score").textContent = "Score: 0";

    // Enable the hit and stand buttons
    document.getElementById("hit-button").disabled = false;
    document.getElementById("stand-button").disabled = false;

    // Reset message area
    document.getElementById("message-area").textContent = "";

    // You might want to reset other game states here
}

// ... Previous code ...

// Function to handle the dealer's turn
function dealerTurn() {
    // Dealer's logic to hit until reaching 17 or higher
    while (dealerScore < 17) {
        const randomCard = `images/${getRandomCard()}`;
        dealerHand.push(randomCard);
        document.getElementById("dealerCard").innerHTML += `<img src="${randomCard}" />`;

        dealerScore = calculateHandTotal(dealerHand);
        document.getElementById("dealer-score").textContent = `Score: ${dealerScore}`;
    }

    // Determine the winner and handle money accordingly
    if (dealerScore > 21 || dealerScore < playerScore) {
        document.getElementById("message-area").textContent = "Player wins!";
        modifyPlayerBank(betAmount); // Add the bet amount to the bank
    } else if (dealerScore > playerScore) {
        document.getElementById("message-area").textContent = "Dealer wins! You lose your bet.";
        modifyPlayerBank(-betAmount); // Subtract the bet amount from the bank
    } else {
        document.getElementById("message-area").textContent = "It's a tie! Bet returned.";
        // No change in the bank for a tie
    }
}

// Function to handle the player's choice to stand
function playerStand() {
    // Disable the hit and stand buttons
    document.getElementById("hit-button").disabled = true;
    document.getElementById("stand-button").disabled = true;

    // Trigger the dealer's turn
    dealerTurn();
}


function startGame(betAmount) {
    console.log(betAmount)
    // Reset the game state
    playerHand = [];
    dealerHand = [];
    playerScore = 0;
    dealerScore = 0;
    
    // Enable the hit and stand buttons
    document.getElementById("hit-button").disabled = false;
    document.getElementById("stand-button").disabled = false;
    
    // Reset message area
    document.getElementById("message-area").textContent = "";

    // Validate the bet amount (ensure it's a number)
    if (!isNaN(betAmount)) {
        // Update player's bank and bet display
        modifyPlayerBank(-betAmount); // Subtract the bet amount from the bank
        document.getElementById("bet-display").textContent = `Bet: $${betAmount}`;
        
        // Deal initial cards to player and dealer
        dealInitialCards();
    } else {
        document.getElementById("message-area").textContent = "Invalid bet amount. Please enter a number.";
    }
}


document.getElementById('bet-5').addEventListener('click', function() {
    setBetAmount(5);
});

document.getElementById('bet-10').addEventListener('click', function() {
    setBetAmount(10);
});

document.getElementById('bet-25').addEventListener('click', function() {
    setBetAmount(25);
});

document.getElementById('bet-50').addEventListener('click', function() {
    setBetAmount(50);
});

document.getElementById('bet-100').addEventListener('click', function() {
    setBetAmount(100);
});

function setBetAmount(amount) {
    betAmount = amount;
    document.getElementById("bet-display").textContent = `Bet: $${betAmount}`;
}



// Add an event listener to the "Start Game" button
document.getElementById('start-button').addEventListener('click', startGame);

document.getElementById('hit-button').addEventListener('click', dealPlayer);
