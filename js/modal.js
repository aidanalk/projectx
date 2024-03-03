

const modal = document.querySelector('.modal')
const modalTriggerButton = document.querySelector('#btn-get')
const modalCloseButton = document.querySelector('.modal_close')

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
}
//
// setTimeout(() => {
//     openModal()
// },10000)

const closeModel = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''
    localStorage.setItem('modalShown', 'true');
}


modalTriggerButton.onclick = () => openModal()
modalCloseButton.onclick = () => closeModel()
modal.onclick = (event) => {
    if (event.target === modal) {
        closeModel()
    }
}

const scrollHandler = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        openModal()
        removeEventListener('scroll', scrollHandler)
    }
}

window.addEventListener('scroll', scrollHandler)

const formElement = document.querySelector('form')

const postData = (url, data) => {
    return fetch(url, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: data
    })
}

const bindPostData = (form) => {
    form.onsubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(form)
        const user = {}
        formData.forEach((item, index) => user[index] = item)
        const jsonUser = JSON.stringify(user)
        if (window.location.pathname === '/project/index/html') {
            postData('server.php', jsonUser)
        }else {
            postData('../server.php', jsonUser)
        }
    }
}

bindPostData(formElement)


const canvas = document.querySelector('.stars')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = document.body.offsetHeight

const stars = []

for (let i = 0; i < 800; i++) {
    stars.push({x: Math.random() * canvas.width, y: Math.random() * canvas.height, radius: Math.random() * 2.5, color: 'white'
    })
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (const star of stars) {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = star.color
        ctx.fill()
    }
}

function updateStars() {
    for (const star of stars) {star.x -= 0.1
        if (star.x < 0) {star.x = canvas.width}
    }
}

function animate() {
    drawStars()
    updateStars()
    requestAnimationFrame(animate)
}

animate()