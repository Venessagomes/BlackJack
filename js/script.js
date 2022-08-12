
/*----- constants -----*/


/*----- app's state (variables) -----*/
let deck = ['d02', 'd03', 'd04', 'd05', 'd06', 'd07', 'd08', 'd09', 'd10', 'dJ', 'dQ', 'dK', 'dA', 'c02', 'c03', 'c04', 'c05', 'c06', 'c07', 'c08', 'c09', 'c10', 'cJ', 'cQ', 'cK', 'cA', 's02', 's03', 's04', 's05', 's06', 's07', 's08', 's09', 's10', 'sJ', 'sQ', 'sK', 'sA', 'h02', 'h03', 'h04', 'h05', 'h06', 'h07', 'h08', 'h09', 'h10', 'hJ', 'hQ', 'hK', 'hA']
let playerSum;
let dealerSum;
let playerHand = []
let dealerHand = []
let message = ""
let playerScore;
let dealerScore;
let gamesStarted = false;



/*----- cached element references -----*/
const dealBtn = document.getElementById('deal')
const hitBtn = document.getElementById('hit')
const standBtn = document.getElementById('stand')
const displayMes = document.getElementById('message')
const newGameButton = document.getElementById("newgame")
const dealerTotalEl = document.querySelector('#dealer > h3')
const playerTotalEl = document.querySelector('#player > h3')


/*----- event listeners -----*/
newGameButton.addEventListener('click', showStatus)
dealBtn.addEventListener('click', shuffle)
hitBtn.addEventListener('click', hit)
standBtn.addEventListener('click', compareChoices)


/*----- functions -----*/
init()
function init() {
    playerSum = 0
    dealerSum = 0
    playerHand = 0
    dealerHand = 0
    playerTotal = 0
    dealerTotal = 0
    message = "Welcome to BlackJack"
    render()
}


for (let i = 0; i < playerHand.length; i++) {
    if (playerHand.length) {
        let cardDiv = document.getElementById(`${i}`)
        cardDiv.classList.add(`card`)
        cardDiv.classList.add(playerHand[i])
        console.log(cardDiv)
    }
}


function render() {
    displayMes.textContent = message
    playerTotalEl.textContent = playerSum
    dealerTotalEl.textContent = dealerSum
}


function showStatus() {
    if (!gamesStarted) {
        displayMes.innerText = "Welcome to BlackJack"
        init()
    }
    render()
}


function shuffle() {
    playerHand = []
    dealerHand = []
    for (let i = 0; i < 2; i++) {
        let randNum = Math.floor(Math.random() * deck.length)
        let card = deck.splice(randNum, 1)
        console.log(card, "--------------------")
        playerHand.push(card[0]) //
        console.log("this is the player hand", playerHand[0])
        document.getElementById('pcard1').classList.add("card", "xlarge", `${playerHand[0]}`)
        document.getElementById('pcard2').classList.add("card", "xlarge", `${playerHand[1]}`)


    }
    for (let i = 0; i < 2; i++) {
        let randNum = Math.floor(Math.random() * deck.length)
        const card = deck.splice(randNum, 1)
        dealerHand.push(card[0])
        console.log("this is the dealer hand", dealerHand)
        document.getElementById('dcard0').classList.add("card", "xlarge", `${dealerHand[0]}`)
    } sumCards()
    render()
}


function hit() {
    let randNum = Math.floor(Math.random() * deck.length)
    let card = deck.splice(randNum, 1)
    if (playerSum < 21 && playerSum === 16) {
        playerHand.push(card[0])
        console.log(playerHand)
    } else {
        console.log("you bust")
    } sumCards()
    render()
    document.getElementById('pcard3').classList.add("card", "xlarge", `${playerHand[2]}`)
}


function sumCards() {
    let playerFirstCard = playerHand[0].substr(1)
    let playerSecondCard = playerHand[1].substr(1)
    let cardOneValue = playerFirstCard
    let cardTwoValue = playerSecondCard

    if (playerHand[2]) {
        let playerThirdCard = playerHand[2].substr(1)
        let cardThreeValue = playerThirdCard[playerThirdCard.length - 1]

        if (cardThreeValue && cardThreeValue === 'J' || cardThreeValue === 'Q' || cardThreeValue === 'K') {
            playerSum += 10
        } else if (cardThreeValue === 'A') {
            if (playerSum > 20) {
                playerSum += 1
            } else { playerSum += 11 }
        } else {
            playerSum += Number(cardThreeValue)
        }
    }
    if (cardOneValue === 'J' || cardOneValue === 'Q' || cardOneValue === 'K') {
        playerSum += 10
    } else if (cardOneValue === 'A') {
        if (playerSum > 20) {
            playerSum += 1
        } else { playerSum += 11 }
    } else {
        playerSum += Number(cardOneValue)
    }
    if (cardTwoValue === 'J' || cardTwoValue === 'Q' || cardTwoValue === 'K') {
        playerSum += 10
    } else if (cardTwoValue === 'A') {
        if (playerSum > 20) {
            playerSum += 1
        } else { playerSum += 11 }
    } else { playerSum += Number(cardTwoValue) }
}



function sumCardsDealer() {
    let dealerFirstCard = dealerHand[0].substr(1)
    let dealerSecondCard = dealerHand[1].substr(1)
    let dealerOneValue = dealerFirstCard
    let dealerTwoValue = dealerSecondCard

    if (dealerHand[2]) {
        let dealerThirdCard = dealerHand[2].substr(1)
        let dealerThreeValue = dealerThirdCard[dealerThirdCard.length - 1]
        if (dealerThreeValue && dealerThreeValue === 'J' || dealerThreeValue === 'Q' || dealerThreeValue === 'K') {
            dealerSum += 10
        } else if (dealerThreeValue === 'A') {
            if (dealerSum > 21) {
                dealerSum += 1
            } else { dealerSum += 11 }
        } else { dealerSum += Number(dealerThreeValue) }
    }
    if (dealerOneValue === 'J' || dealerOneValue === 'Q' || dealerOneValue === 'K') {
        dealerSum += 10
    } else if (dealerOneValue === 'A') {
        if (dealerSum > 20) {
            dealerSum += 1
        } else { dealerSum += 11 }
    } else { dealerSum += Number(dealerOneValue) }
    if (dealerTwoValue === 'J' || dealerTwoValue === 'Q' || dealerTwoValue === 'K') {
        dealerSum += 10
    } else if (dealerTwoValue === 'A') {
        if (dealerSum > 20) {
            dealerSum += 1
        } else { dealerSum += 11 }
    } else { dealerSum += Number(dealerTwoValue) }
}


function compareChoices() {
    let randNum = Math.floor(Math.random() * deck.length)
    let card = deck.splice(randNum, 1)
    if (dealerSum < 21) {
        dealerHand.push(card[0])
        console.log("dealers sum:", dealerHand)
        console.log("players sum", playerHand)
        console.log("dealers sum:", dealerSum)
        console.log("players sum", playerSum)
    }
    document.getElementById('dcard1').classList.add("card", "xlarge", `${dealerHand[1]}`)
    document.getElementById('dcard2').classList.add("card", "xlarge", `${dealerHand[2]}`)


    sumCardsDealer()

    if (playerSum === dealerSum) {
        message = 'It is a tie'
        console.log('message:', message)
    } else if (playerSum > dealerSum && playerSum <= 21) {
        message = 'Player Wins'
        console.log('message:', message)
    } else if (dealerSum > playerSum && dealerSum > 21) {
        message = 'Player Wins'
        console.log('message:', message)
    } else if (dealerSum > playerSum && dealerSum <= 21) {
        message = 'Dealer Wins'
        console.log('message:', message)
    } else if (playerSum > dealerSum && playerSum > 21) {
        message = 'Dealer Wins'
        console.log('message:', message)
    } else if (playerSum > 21 && dealerSum < 21) {
        message = 'Dealer Wins'
        console.log('message:', message)
    } else {
        message = 'Draw another card'
        console.log('message:', message)
    }
    displayMes.textContent = message

    render()
}


