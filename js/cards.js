
const URL = 'https://jsonplaceholder.typicode.com/posts'

const asyncFetchData = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    return data
}

const displayData = async () => {
    const cardsElement = document.querySelector('.cardsElement')

    const cardsData = await asyncFetchData()
    cardsData.forEach((card) => {
        const { title, body } = card
        const elementCards = document.createElement('div')
        elementCards.setAttribute('class', 'elements')

        elementCards.innerHTML = `
            <img src="../img/9349817.png">
            <h2 class="cards_h2">${title}</h2>
            <p class="cards_p">${body}</p>
        `

        cardsElement.append(elementCards);
    })
}

displayData()
