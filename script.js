// VERSION 0.35

const cardDeck = [
    // ... cardDeck values ...
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

// Initialize stuff
let playerHand = []
let dealerHand = []
let playerScore = calculateHandTotal(playerHand)
let dealerScore = calculateHandTotal(dealerHand)
let baseCard = "images/blue.svg"
let betAmount = 0
let playerStand = false
let dealerStand = false

// Initialize player's bank
let playerBank = 1000;
document.getElementById("bank").textContent = `Bank: $${playerBank}`

// Function to get a random card from the deck
function getRandomCard() {
    const randomIndex = Math.floor(Math.random() * cardDeck.length)
    return cardDeck[randomIndex]
}

// Function to calculate the total value of a hand
function calculateHandTotal(hand) {
    // ... calculateHandTotal logic ...
    let total = 0;
    let hasAce = false;

    for (const card of hand) {
        const cardValue = card.substring(card.lastIndexOf('-') + 1, card.lastIndexOf('.')).replace("r", "");
        
        if (cardValue === 'A') {
            hasAce = true;
            total += 11;
        } else if (cardValue === 'K' || cardValue === 'Q' || cardValue === 'J') {
            total += 10;
        } else {
            total += parseInt(cardValue);
        }
    }

    if (hasAce && total > 21) {
        total -= 10;
    }
    return total;
}

// Function to check if a hand has busted
function checkBust(handTotal, playerType) {
    // ... checkBust logic ...
    if (handTotal > 21) {
        document.getElementById("message-area").textContent = `${playerType} Bust!`;
        return true;
    }
    return false;
}

// Function to deal a card to the player
function dealPlayer() {
    // ... dealPlayer logic ...
    const randomCard = `images/${getRandomCard()}`;
    playerHand.push(randomCard);
    console.log("this is what player drew" + randomCard)
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
        dealerTurn()
    }
}



// Function to modify player's bank
function modifyPlayerBank(amount) {
    // ... modifyPlayerBank logic ...
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

// Function to play again
function playAgain() {
    playerHand = [];
    dealerHand = [];
    playerScore = 0;
    dealerScore = 0;
    playerStand = false;
    dealerStand = false;
    
    document.getElementById("playerCard").innerHTML = `<img id="img2" src="${baseCard}" />`;
    document.getElementById("dealerCard").innerHTML = `<img id="img1" src="${baseCard}" />`;
    document.getElementById("player-score").textContent = "Score: 0";
    document.getElementById("dealer-score").textContent = "Score: 0";
    document.getElementById("bet-display").textContent = "Bet: $0";
    betAmount = 0;

    // Enable the hit and stand buttons
    document.getElementById("hit-button").disabled = false;
    document.getElementById("stand-button").disabled = false;

    // Reset message area
    document.getElementById("message-area").textContent = "";

    // Start the game loop from the beginning
    startGame();
}

// Function to handle the dealer's turn
function dealerTurn() {
    console.log("dealer turn")
    document.getElementById("message-area").textContent = "Dealer's turn"
    // ... dealerTurn logic ...
    // Dealer's logic to hit until reaching 17 or higher
    if (dealerScore < 17) {
        const randomCard = `images/${getRandomCard()}`;
        dealerHand.push(randomCard);
        console.log(randomCard + "this is what the dealer got")
        document.getElementById("dealerCard").innerHTML += `<img id="img1" src="${randomCard}"/>`;
        dealerScore = calculateHandTotal(dealerHand);
        document.getElementById("dealer-score").textContent = `Score: ${dealerScore}`;
        document.getElementById("message-area").textContent = "Player's turn. Hit or Stand"
        
    }else {
        if (checkBust(dealerScore, "Dealer")) {
            document.getElementById("hit-button").disabled = true;
            document.getElementById("stand-button").disabled = true;
            document.getElementById("message-area").textContent = "Dealer Bust! You win.";
            modifyPlayerBank(betAmount); // player wins bet
        } else {
            // Compare player's hand with dealer's hand
            determineWinner()
        }
    }
    
}

    



// Function to start the game with a given bet amount
function startGame(betAmount) {

    // Validate the bet amount (ensure it's a number)
    if (!isNaN(betAmount)) {
        document.getElementsByClassName("bet-buttons").disabled = true
        // Update player's bank and bet display
        document.getElementById("bet-display").textContent = `Bet: $${betAmount}`;

        // Deal initial cards to player and dealer
        playerHand.push(`images/${getRandomCard()}`);
        dealerHand.push(`images/${getRandomCard()}`);
        document.getElementById("dealerCard").innerHTML = `<img id="img1" src="${dealerHand[0]}"/>`;
        document.getElementById("playerCard").innerHTML = `<img id="img2" src="${playerHand[0]}"/>`;

        playerScore = calculateHandTotal(playerHand);
        dealerScore = calculateHandTotal(dealerHand);

        document.getElementById("player-score").textContent = `Score: ${playerScore}`;
        document.getElementById("dealer-score").textContent = `Score: ${dealerScore}`;
        document.getElementById("message-area").textContent = "Player's turn. Hit or stand"

        
    } else {
        document.getElementById("message-area").textContent = "Enter a bet, then click start.";
    }
}


// Function to handle the player's turn
function playerTurn() {
    document.getElementById("hit-button").disabled = false;
    document.getElementById("stand-button").disabled = false;
    document.getElementById("message-area").textContent = "Player's turn. Hit or stand.";
}


// Function to handle the player's choice to stand
function playerStandButton() {
    // Trigger the dealer's turn
    dealerTurn()
}




function determineWinner() {
    console.log("picking winner")
    // ... Determine winner logic ...
    // Check if player has Blackjack
    if (playerScore === 21) {
        document.getElementById("message-area").textContent = "Blackjack! Wins!";
        modifyPlayerBank(betAmount * 1.5); // Add winnings to the bank
        document.getElementById("hit-button").disabled = true;
        document.getElementById("stand-button").disabled = true;
    } else if (dealerScore === 21) {
        document.getElementById("message-area").textContent = "Blackjack! Wins!";
        modifyPlayerBank(-betAmount * 1.5); // take from player
        document.getElementById("hit-button").disabled = true;
        document.getElementById("stand-button").disabled = true;

    } else {
        if (dealerScore > 21 || dealerScore < playerScore && playerScore < 21) {
            document.getElementById("message-area").textContent = "Player wins!";
            modifyPlayerBank(betAmount); // Add the bet amount to the bank
        } else if (dealerScore > playerScore && dealerScore < 21) {
            document.getElementById("message-area").textContent = "Dealer wins! You lose your bet.";
            modifyPlayerBank(-betAmount); // Subtract the bet amount from the bank
        } else if (playerScore > dealerScore && playerScore < 21) {
            document.getElementById("message-area").textContent = "Player wins! You win your bet.";
            modifyPlayerBank(betAmount); // Subtract the bet amount from the bank
        } else {
            document.getElementById("message-area").textContent = "It's a tie! Bet null.";
            // No change in the bank for a tie
        }
    }
    // Offer the player to play another round or cash out
    document.getElementById("play-again").style.display = "block";
    document.getElementById("cash-out").style.display = "block";
}

// Function to set the bet amount and update display
function setBetAmount(amount) {
    betAmount = amount;
    document.getElementById("bet-display").textContent = `Bet: $${betAmount}`;
}

document.getElementById("stand-button").addEventListener("click", playerStandButton);

function playerStandButton() {
    dealerTurn(); // Trigger the dealer's turn
}

// Event listeners for bet buttons
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


// Event listener for the "Start Game" button
document.getElementById('start-button').addEventListener('click', function() {
    startGame(betAmount);
});

// Event listener for the "Hit" button
document.getElementById('hit-button').addEventListener('click', function() {
    dealPlayer();
});

document.getElementById("stand-button").addEventListener("click", playerStandButton)


document.getElementById("play-again").addEventListener("click", playAgain);

document.getElementById("stand-button").addEventListener("click", playerStandButton);

document.getElementById("cash-out").addEventListener("click", function() {
    // Display the player's total money and the amount they won/lost
    document.getElementById("message-area").textContent = `Game Over! Total Money: $${playerBank}`;
    document.getElementById("bank").textContent = `Bank: $${playerBank}`;

    // Hide unnecessary buttons
    document.getElementById("play-again").style.display = "none";
    document.getElementById("cash-out").style.display = "none";
});


startGame()