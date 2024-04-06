const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const currentAccount = document.querySelector('#current-account')
const colors = ['#00A383', '#006A55', '#34D1B2', 
                '#FFCB73', '#A66900', '#FFB840',
                '#B62E40', '#9E0016', '#F97083']
let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

// Делегирование событий
timeList.addEventListener('click', event => 
{
    if (event.target.classList.contains('time-btn')){
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if(event.target.classList.contains('circle')){
        score++
        currentAccount.innerHTML = score
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0){
        finishGame()
    } else {
        let current = --time
        if (current < 10){
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value){
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    currentAccount.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Результат: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect() 
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    const colorElement = getRandomColor()
    circle.style.background = colorElement
    circle.addEventListener('mouseover', () => {
        circle.style.backgroundColor = colorElement
        circle.style.boxShadow = `0 0 8px ${colorElement}, 0 0 20px ${colorElement}`
    })

    board.append(circle)
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

// Функция для автоматической игры
function winTheGame() {
    function kill() {
        const circle = document.querySelector('.cricle')
        if (circle) {
            circle.click()
        }
    }
    setInterval(kill, 50)
}