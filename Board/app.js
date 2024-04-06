const board = document.querySelector('#board')
const colors = ['#542881', '#3A0470', '#9F69D6', 
                '#98B72E', '#7B9E00', '#DBF970',
                '#BF9F30', '#A68100', '#FFE073']
const SQUARES_NUMBER = 990

for (let i = 0; i < SQUARES_NUMBER; i++) {
    const square = document.createElement('div')
    square.classList.add('square')

    square.addEventListener('mouseover', setColor)

    square.addEventListener('mouseleave', removeColor)

    board.append(square)
}

function setColor(event) {
    const element = event.target
    const colorElement = getRandomColor()
    element.style.backgroundColor = colorElement
    element.style.boxShadow = `0 0 2px ${colorElement}, 0 0 10px ${colorElement}`
} 

function removeColor(event) {
    const element = event.target
    element.style.backgroundColor = '#1d1d1d'
    element.style.boxShadow = `0 0 2px #000`
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}