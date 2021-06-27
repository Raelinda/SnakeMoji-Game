// "use strict"

const grid = document.querySelector('.grid')
const startBtn = document.getElementById('startBtn')
const score = document.getElementById('score')

let squares = []
let currentSnake = [2, 1, 0]
let direction = 1
let appleIndex = 0
let width = 10

function createGrid() {
    for (let i = 0; i < 100; i++) {
        const square = document.createElement('div')
        square.classList.add('square')
        grid.appendChild(square)
        squares.push(square)
    }
}
createGrid()
currentSnake.forEach(index => squares[index].classList.add('snake'))
// currentSnake.forEach(function(index){squares[index].classList.add('snake')})



function move() {

    if (
        (currentSnake[0] + width >= width*width && direction === width) || //if snake has hit bottom
        (currentSnake[0] % width === width-1 && direction === 1) || //if snake has hit right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
        (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
        squares[currentSnake[0] + direction].classList.contains('snake')
    )
    {return clearInterval(timerId)}


    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    currentSnake.unshift(currentSnake[0] + direction)
    squares[currentSnake[0]].classList.add('snake')
}
const timerID = setInterval(move, 500)
clearInterval(timerID)
move()



function control(e) {
    if (e.key === 'ArrowRight') {
        direction = 1
    } else if (e.key === 'ArrowLeft') {
        direction = -1
    } else if (e.key === 'ArrowUp') {
        direction = -10
    } else if (e.key === 'ArrowDown') {
        direction = 10
    }
}
document.addEventListener('keydown', control)

const generateApples = () => {
    do {
        appleIndex = Math.floor(Math.random() * squares.length) 
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}
generateApples()

// document.addEventListener('keydown', e => {
//     switch (e.key) {
//         case 'ArrowUp':
//             console.log('arrow up')
//         break
//         case 'ArrowDown':
//             console.log('arrow down')
//         break
//         case 'ArrowLeft':
//             console.log('arrow left')
//         break
//         case 'ArrowRight':
//             console.log('arrow right')
//         break
//     }
// })