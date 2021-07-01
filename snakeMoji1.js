// store DOM-grabs in variables
const grid = document.querySelector('.grid')
const scoreBoard = document.getElementById('scoreBoard')
const currentScore = document.getElementById('currentScore')
const startBtn = document.getElementById('startBtn')
const upBtn = document.getElementById('upBtn')
const upBtnTablet = document.getElementById('upBtnTablet')
const downBtn = document.getElementById('downBtn')
const downBtnTablet = document.getElementById('downBtnTablet')
const leftBtn = document.getElementById('leftBtn')
const leftBtnTablet = document.getElementById('leftBtnTablet')
const rightBtn = document.getElementById('rightBtn')
const rightBtnTablet = document.getElementById('rightBtnTablet')
const overlay = document.getElementById('overlay')

//grid and snake arrays
const squares = []
let currentSnake = [2, 1, 0]

//unchanging variables
const width = 10

//changing variables
let direction = 1
let emojiIndex = 0
let timerId = 0
let score = 0
let snakeSpeed = 500
let speedIncrease = 0.9

// create 100 <div>'s/insert in grid/push into squares array
function createGrid() {
    for (let i = 0; i < width * width; i++) {
        const square = document.createElement('div')
        square.classList.add('square')
        squares.push(square)
        grid.appendChild(square)
    }
}
createGrid()

//add snake styling to squares indexs that are in snake array
currentSnake.forEach(index => {
    squares[index].classList.add('snake')

})
// start/restart game
function startGame() {
    clearInterval(timerId)
    // brings rainbow background back to half opacity
    overlay.classList.add('half-opacity')
    overlay.classList.remove('no-opacity')
    // resets score to default
    direction = 1
    score = 0
    currentScore.textContent = score
    scoreBoard.textContent = "Score: "
    // removes current snake
    currentSnake.forEach(index => {
        squares[index].classList.remove('snake')
    })
    // adds default snake
    currentSnake = [2, 1, 0]
    currentSnake.forEach(index => {
        squares[index].classList.add('snake')
    })
    // removes currently placed emoji/adds randomly placed emoji
    squares[emojiIndex].classList.remove('emoji')
    squares[emojiIndex].textContent = ''
    generateEmoji()
    // resets snake speed to default/activates timer
    snakeSpeed = 500
    timerId = setInterval(move, snakeSpeed)
}
// event listener to start/restart game
startBtn.addEventListener('click', startGame)

// renders a randomly placed, crying emoji
generateEmoji()


//MOVE SNAKE
function move() {
    const head = currentSnake[0]
    // stop snake if snake hits wall or overlaps self
    if ((head - width < 0 && direction === -width) ||
        (head % width === width - 1 && direction === 1) ||
        (head + width >= width * width && direction === width) ||
        (head % width === 0 && direction === -1) ||
        (squares[head + direction].classList.contains('snake'))

    ) {
        // displays encouraging message at non-winning score
        if (score < 4) {
            scoreBoard.style.fontStyle = "italic"
            scoreBoard.textContent = "Good try.   Score: "
        } else {
            scoreBoard.textContent = "You made it all the way to "
            currentScore.textContent = `${score}!`
        }
        return clearInterval(timerId)
    }

    //remove from tail/add to head
    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    squares[head + direction].classList.add('snake')
    currentSnake.unshift(head + direction)

    //if snake eats emoji
    if (squares[head + direction].classList.contains('emoji')) {
        //increase score/display new score    
        score++
        currentScore.textContent = score
        // remove 'eaten' emoji
        squares[emojiIndex].classList.remove('emoji')
        squares[emojiIndex].textContent = ' '
        generateEmoji()
        // add to tail
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        // increase snake speed
        clearInterval(timerId)
        snakeSpeed = snakeSpeed * speedIncrease
        timerId = setInterval(move, snakeSpeed)
    }
    // result of winning game
    if (score === 11) {
        clearInterval(timerId)
        scoreBoard.textContent = ""
        currentScore.textContent = "YOU WON!!!"
        startBtn.textContent = "Go again!"
        overlay.classList.remove('half-opacity')
        overlay.classList.add('no-opacity')
    }

}
move()

//control snake direction with keyboard
document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            direction = -width
            break
        case 'ArrowRight':
            direction = 1
            break
        case 'ArrowDown':
            direction = width
            break
        case 'ArrowLeft':
            direction = -1
            break
    }
})
// control snake direction with buttons - desktop
upBtn.addEventListener('click', () => {
    direction = -width
})
rightBtn.addEventListener('click', () => {
    direction = 1
})
downBtn.addEventListener('click', () => {
    direction = width
})
leftBtn.addEventListener('click', () => {
    direction = -1
})

// control snake direction with buttons - mobile
upBtnTablet.addEventListener('click', () => {
    direction = -width
})
rightBtnTablet.addEventListener('click', () => {
    direction = 1
})
downBtnTablet.addEventListener('click', () => {
    direction = width
})
leftBtnTablet.addEventListener('click', () => {
    direction = -1
})



//generate increasingly happy emojis in random locations
function generateEmoji() {
    switch (score) {
        case 0:
            emoji = '😢'
            break
        case 1:
            emoji = '😕'
            break
        case 2:
            emoji = '🙂'
            break
        case 3:
            emoji = '😊'
            break
        case 4:
            emoji = '😀'
            break
        case 5:
            emoji = '😃'
            break
        case 6:
            emoji = '😄'
            break
        case 7:
            emoji = '😁'
            break
        case 8:
            emoji = '😅'
            break
        case 9:
            emoji = '😂'
            break
        case 10:
            emoji = '🤣'
            break
        case 11:
            emoji = '🤩'
    }

    do {
        emojiIndex = Math.floor(Math.random() * squares.length)
    }
    while (squares[emojiIndex].classList.contains('snake'))
    squares[emojiIndex].classList.add('emoji')
    squares[emojiIndex].textContent = emoji
}

