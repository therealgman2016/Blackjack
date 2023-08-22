
document.getElementById('hit-button').addEventListener('click', dealDealer)

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

function getRandomCard() {
    const randomIndex = Math.floor(Math.random() * cardDeck.length)
    return cardDeck[randomIndex]
}

function dealDealer() {
    const randomCard = getRandomCard()
    document.getElementById("img1").src = `images/${randomCard}`
    console.log(randomCard)
}

document.getElementById('hit-button').addEventListener('click', dealDealer)