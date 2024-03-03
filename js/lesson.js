
const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if(regExp.test(phoneInput.value)){
        phoneResult.innerHTML = "Ok"
        phoneResult.style.color = 'green'
    }else {
        phoneResult.innerHTML = "NOT Ok"
        phoneResult.style.color = 'red'
    }
}

//

const tabContentBlocks = document.querySelectorAll('.tab_content_block')
const tabItems = document.querySelectorAll('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items')
let currentTab = 0

const hideTabContent = () => {
    tabContentBlocks.forEach(tabContentBlock => {
        tabContentBlock.style.display = 'none'
    })
    tabItems.forEach((tabitem) => {
        tabitem.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (index = 0) => {
    tabContentBlocks[index].style.display = 'block'
    tabItems[index].classList.add('tab_content_item_active')
}

const autoSwitchTab = (tabIndex) => {
    hideTabContent()
    currentTab = (currentTab + 1) % tabItems.length
    showTabContent(currentTab)
}

hideTabContent()
showTabContent()
setInterval(autoSwitchTab, 3000)

tabsParent.onclick = (event) => {
    if(event.target.classList.contains('tab_content_item')) {
        tabItems.forEach((tabItem, tabIndex) => {
            if (event.target === tabItem) {
                hideTabContent()
                currentTab = tabIndex
                showTabContent(currentTab)
            }
        })
    }
}


//converter

// somInput.addEventListener('input', () => {
//     const request = new XMLHttpRequest()
//     request.open('GET', '../data/convertor.json')
//     request.setRequestHeader('Content-type', 'application/json')
//     request.send()
//
//     request.addEventListener("load", () => {
//         const data = JSON.parse(request.response)
//         usdInput.value = (somInput.value / data.usd).toFixed(2)
//     })
// })


//converter

// const somInput = document.querySelector('#som')
// const usdInput = document.querySelector('#usd')
// const eurInput = document.querySelector('#eur')
//
// const converter = (element, targetElement, targetElement2, currentValue) => {
//     element.oninput = () => {
//         const request = new XMLHttpRequest()
//         request.open('GET', '../data/converter.json')
//         request.setRequestHeader('Content-type', 'application/json')
//         request.send()
//
//         request.onload = () => {
//             const data = JSON.parse(request.response)
//
//             switch (currentValue) {
//                 case 'som':
//                     targetElement.value = (element.value / data.usd).toFixed(2)
//                     targetElement2.value = (element.value / data.eur).toFixed(2)
//                     break
//                 case 'usd':
//                     targetElement.value = (element.value * data.usd).toFixed(2)
//                     targetElement2.value = (element.value * data.eur2).toFixed(2)
//                     break
//                 case 'eur':
//                     targetElement.value = (element.value * data.usd2).toFixed(2)
//                     targetElement2.value = (element.value * data.eur).toFixed(2)
//                     break
//
//                 default:
//                     break
//             }
//             element.value === '' && (targetElement.value = '')
//         }
//     }
// }
// converter(somInput, eurInput, usdInput, 'som')
// converter(usdInput, somInput, eurInput, 'usd')
// converter(eurInput, usdInput, somInput, 'eur')
//

//
// som.addEventListener('input', () => {
//     const xhr = new XMLHttpRequest()
//     xhr.open('GET', '../data/converter.json')
//     xhr.setRequestHeader('Content-type', 'application/json')
//     xhr.send()
//
//     xhr.addEventListener('load', () => {
//         const data = JSON.parse (xhr.response)
//         usd.value = (som.value / data.usd).toFixed(2)
//     })
// })

const somInput = document.querySelector('#som')
const usdInput = document.querySelector('#usd')
const eurInput = document.querySelector('#eur')

const fetchData = async () => {
    try {
        const response = await fetch('../data/converter.json')
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching data:', error)
        throw error
    }
};

const converter = async (element, targetElement, targetElement2, currentValue) => {
    element.oninput = async () => {
        try {
            const data = await fetchData()

            switch (currentValue) {
                case 'som':
                    targetElement.value = (element.value / data.usd).toFixed(2)
                    targetElement2.value = (element.value / data.eur).toFixed(2)
                    break
                case 'usd':
                    targetElement.value = (element.value * data.usd).toFixed(2)
                    targetElement2.value = (element.value * data.eur2).toFixed(2)
                    break
                case 'eur':
                    targetElement.value = (element.value * data.usd2).toFixed(2)
                    targetElement2.value = (element.value * data.eur).toFixed(2)
                    break
                default:
                    break
            }

            element.value === '' && (targetElement.value = '')
        } catch (error) {
            console.error('Error in converter:', error)
        }
    }
}

converter(somInput, eurInput, usdInput, 'som');
converter(usdInput, somInput, eurInput, 'usd');
converter(eurInput, usdInput, somInput, 'eur');


//Card switcher
const card = document.querySelector('.card')
const btnPrev = document.querySelector('#btn-prev')
const btnNext = document.querySelector('#btn-next')

let count = 1

const cardFetcher = async (id) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        const data = await response.json()

        card.innerHTML = `
            <p>${data.title}</p>
            <p style="color: ${data.completed ? 'green' : 'red'}">
                ${data.completed}
            </p>
            <span>${data.id}</span>
        `
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

cardFetcher(count)

const handleButtonClick = async (direction) => {
    try {
        if (direction === 'next') {
            count = count < 200 ? count + 1 : 1
        } else if (direction === 'prev') {
            count = count > 1 ? count - 1 : 200
        }
        await cardFetcher(count)
    } catch (error) {
        console.error('Error handling button click:', error)
    }
}

btnNext.onclick = () => handleButtonClick('next')
btnPrev.onclick = () => handleButtonClick('prev')





const cityNameButton = document.querySelector('.cityName')
const city = document.querySelector('.city')
const temp = document.querySelector('.temp')

const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'e417df62e04d3b1b111abeab19cea714'

cityNameButton.addEventListener('input', async (event) => {
    try{
        const response = await fetch(`${BASE_URL}?q=${event.target.value}&appid=${API_KEY}`)
        const data = await response.json()
        city.innerHTML = data.name ? data.name: 'none'
        temp.innerHTML = data?.main?.temp ? Math.round(data?.main?.temp - 273.15) + 'C' : '...'
    } catch (e) {
        
    }
})


