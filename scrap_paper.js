// Function to check if a hand has busted
function checkBust(handTotal, playerType) {
    // ... checkBust logic ...
    if (handTotal > 21) {
        document.getElementById("message-area").textContent = `${playerType} Bust!`;
        return true;
    }
    return false;
}




function determineWinner() {
    // ... Determine winner logic ...
    if (dealerScore > 21 || dealerScore < playerScore && playerScore < 21) {
        document.getElementById("message-area").textContent = "Player wins!";
        modifyPlayerBank(betAmount); // Add the bet amount to the bank
    } else if (dealerScore > playerScore && dealerScore, playerScore < 21) {
        document.getElementById("message-area").textContent = "Dealer wins! You lose your bet.";
        modifyPlayerBank(-betAmount); // Subtract the bet amount from the bank
    } else {
        document.getElementById("message-area").textContent = "It's a tie! Bet returned.";
        // No change in the bank for a tie
    }

    // Offer the player to play another round or cash out
    document.getElementById("play-again").style.display = "block";
    document.getElementById("cash-out").style.display = "block";
}




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
        determineWinner()
        dealerTurn()
    }
}


function playerTurn() {
    document.getElementById("hit-button").disabled = false;
    document.getElementById("stand-button").disabled = false;
    document.getElementById("message-area").textContent = "Player's turn. Choose hit or stand.";
}