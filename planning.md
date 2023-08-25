## Features
- Player vs. Dealer gameplay
- Player can hit or stand
- Dealer follows a simple set of rules for gameplay
- Win/lose conditions
- User-friendly interface


### Card Values
- Number cards are worth their face value.
- Face cards (King, Queen, Jack) are worth 10 points each.
- Aces can be worth 1 or 11 points, depending on which value benefits the hand more.


### Gameplay Flow
1. (first, player bets desiered amount)
2. Player is dealt two cards from a standard deck.
3. Player can choose to "hit" (take another card) or "stand" (keep the current hand).
4. If the player's hand exceeds 21 points, they lose immediately.
5. If the player stands, the dealer reveals their second card.
6. The dealer must hit until their hand value is at least 17.
7. The player's and dealer's hands are compared, and the one closest to 21 without exceeding it wins.
8. If the dealer's hand exceeds 21, the player wins.
9. If the player's hand or dealer's hand is an ace and a face card, it is an imediate win, a blackjack.
10. If there is a tie, both neither win or lose, on to the next round.
11. If the player wins, they get payed out however much they bet, unless its a blackjack, then its a 3/2 rule
12. If the player loses, they lose that same amount

## Pseudocode

Initialize the deck of cards
Shuffle the deck

Initialize player's and dealer's hands as empty arrays

ask player for bet amount, store that amount

Deal two cards to the player
Deal two cards to the dealer

Display player's hand and total
Display one of the dealer's cards (other card is hidden)

Repeat until player stands or busts:
    Ask player to hit or stand

If player hits:
    Deal a card to the player
    Display updated hand and total

If player's total exceeds 21:
    Player busts, dealer wins

Reveal dealer's hidden card
Display dealer's full hand and total

Repeat until dealer's total is at least 17:
    If dealer's total is less than 17:
        Deal a card to the dealer
        Display updated hand and total

Compare player's and dealer's hands:
    If player's total is greater than 21, dealer wins
    If dealer's total is greater than 21, player wins
    If player's total is greater, player wins
    If dealer's total is greater, dealer wins
    If totals are equal, it's a push (tie)

Payout bets:
    If not Blackjack:
        If player lost, player pays that amount to dealer (loses amount from balance)
        If dealer lost, dealer pays that amount to player
    If Blackjack:
        If player lost, player pays 150% of that bet to dealer
        If dealer lost, dealer pays 150% of that bet to player
    If tie:
        No payouts, next round

Display the result of the game
