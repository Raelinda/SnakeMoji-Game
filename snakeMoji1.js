// store DOM-grabs in variables
const grid = document.querySelector('.grid')
const scoreDisplay = document.getElementById('score')
const startBtn = document.getElementById('startBtn')

//create arrays
const squares = []
let currentSnake = [2, 1, 0]

//unchanging variables
const width = 10

//changing variables
let direction = 1
let appleIndex = 0
let timerId = 0
let score = 0
let snakeSpeed = 800
let speedIncrease = 0.9

// create 100 divs/style/push into squares array
function createGrid() {
    for (let i = 0; i < width * width; i++) {
        const square = document.createElement('div')
        square.classList.add('square')
        squares.push(square)
        grid.appendChild(square)
    }
}
createGrid()

//'create' snake/style snake
currentSnake.forEach(index => {
    squares[index].classList.add('snake')
    //inserting emojis into snake
    // squares[index].textContent = '☹️'

})

function startGame() {
    clearInterval(timerId)
    direction = 1
    score = 0
    scoreDisplay.textContent = 0
    currentSnake.forEach(index => {
        squares[index].classList.remove('snake')
    })

    currentSnake = [2, 1, 0]
    currentSnake.forEach(index => {
        squares[index].classList.add('snake')
    })

    squares[appleIndex].classList.remove('apple')
    squares[appleIndex].textContent = ''
    generateApple()

    snakeSpeed = 1000
    timerId = setInterval(move, snakeSpeed)
}
startBtn.addEventListener('click', startGame)


generateApple()

// clearInterval(timerId)

//MOVE SNAKE
function move() {
    const head = currentSnake[0]
    // stop snake if it hits wall or overlaps
    if ((head - width <= 0 && direction === -width) ||
        (head % width === 9 && direction === 1) ||
        (head + width > width * width && direction === width) ||
        (head % width === 0 && direction === -1) ||
        (squares[head + direction].classList.contains('snake'))
    ) {
        return clearInterval(timerId)
    }
    //remove from tail/add to head
    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    squares[head + direction].classList.add('snake')
    currentSnake.unshift(head + direction)

    //if snake eats apple
    if (squares[head + direction].classList.contains('apple')) {
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        // currentSnake.push(tail)
        score++
        scoreDisplay.textContent = score
        squares[appleIndex].classList.remove('apple')
        squares[appleIndex].textContent = ''
        generateApple()
        clearInterval(timerId)
        snakeSpeed = snakeSpeed * speedIncrease
        timerId = setInterval(move, snakeSpeed)
    }
    if (score === 12){
        clearInterval(timerId)
        scoreDisplay.textContent = "YOU WON!!!!!"
    }

}
move()

//control snake direction
document.addEventListener('keyup', e => {
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

//generate random apples
function generateApple() {
    switch (score) {
        case 0:
            emoji = '🙁'
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
        appleIndex = Math.floor(Math.random() * squares.length)
    }
    while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
    squares[appleIndex].textContent = emoji
}