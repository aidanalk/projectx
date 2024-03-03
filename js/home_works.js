//homework 1

const gmailInput = document.querySelector('#gmail_input')
const gmailButton = document.querySelector('#gmail_button')
const gmailResult = document.querySelector('#gmail_result')

const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;


gmailButton.onclick = () => {
    if(gmailRegex.test(gmailInput.value)){
        gmailResult.innerHTML = "Ok"
        gmailResult.style.color = 'green'
    }else {
        gmailResult.innerHTML = "NOT Ok"
        gmailResult.style.color = 'red'
    }
}


//homework 2

// const childBlock = document.querySelector('.child_block')
// const moveChildBlock = 2
// const parentFreeWidth = 239
//
// let angle = 0
// const radius = parentFreeWidth / 2
//
// const moveBlock = () => {
//     const x = Math.cos(angle) * radius + parentFreeWidth / 2
//     const y = Math.sin(angle) * radius + parentFreeWidth / 2
//
//     childBlock.style.left = `${x}px`
//     childBlock.style.top = `${y}px`
//
//     angle += moveChildBlock * (Math.PI / 180)
//
//     setTimeout(moveBlock, 20)
// }

const seconds = document.querySelector('#secondsS')
const start = document.querySelector('#start')
const stop = document.querySelector('#stop')
const reset = document.querySelector('#reset')
const childBlock = document.querySelector('.child_block');
const moveChildBlock = 360
const parentFreeWidth = 239

let angle = 0
const radius = parentFreeWidth / 2

let interval
let second = 0

const moveBlock = () => {
    const x = Math.cos(angle) * radius + parentFreeWidth / 2
    const y = Math.sin(angle) * radius + parentFreeWidth / 2

    childBlock.style.left = `${x}px`
    childBlock.style.top = `${y}px`

    angle += (360 / moveChildBlock) * (Math.PI / 180)

    if (angle >= 2 * Math.PI) {
        angle = 0
    }

    setTimeout(moveBlock, 5)
}

const updateSecond = () => {
    clearInterval(interval)
    interval = setInterval(() => {
        second++
        seconds.innerHTML = second
    }, 1000)
    moveBlock()
}

// start.onclick = () => updateSecond()
// stop.onclick = () => clearInterval(interval)
// reset.onclick = () => {
//     clearInterval(interval)
//     second = 0
//     seconds.innerHTML = second
// }

start.onclick = () => {
    updateSecond();
    moveBlock(); // Запускаем вращение круга при старте таймера
};

stop.onclick = () => {
    clearInterval(interval);
};

reset.onclick = () => {
    clearInterval(interval);
    second = 0;
    seconds.innerHTML = second;
    angle = 0; // Возвращаем угол в начальное положение при сбросе таймера
    childBlock.style.left = `${parentFreeWidth / 2}px`;
    childBlock.style.top = `${parentFreeWidth / 2}px`;
};
