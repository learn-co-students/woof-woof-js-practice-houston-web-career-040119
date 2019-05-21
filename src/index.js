


document.addEventListener("DOMContentLoaded", () => {
const dogBar = document.getElementById('dog-bar')
const BASE_URL = "http://localhost:3000/pups"
const dogInfo = document.getElementById('dog-info')
const dogFilter = document.getElementById('good-dog-filter')


fetch(BASE_URL)
  .then(res => res.json())
  .then(obj => {
    obj.forEach(dog => {
      renderDogBar(dog)
    })
  })

function renderDogBar(dog) {
  let span = document.createElement('span')
  span.innerText = dog.name
  span.addEventListener('click', (e) => {
    renderDog(dog)
  })
  dogBar.append(span)
}

function renderDog(dog) {
  dogInfo.innerText = ""
  let img = document.createElement('img')
  img.src = dog.image
  let h2 = document.createElement('h2')
  h2.innerText = dog.name
  let button = document.createElement('button')

  if (dog.isGoodDog) {
    button.innerText = "Good Dog!"
  } else { button.innerText = "Bad Dog!"}
  button.addEventListener('click', (e) => {
    e.preventDefault()
    fetch(BASE_URL + `/${dog.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "isGoodDog": !dog.isGoodDog
      })
    })
    .then(res => res.json())
    .then(dogObj => {
      dog.isGoodDog = !dog.isGoodDog
      if (dogObj.isGoodDog == false) {
        e.target.innerText = "Bad Dog!"
      } else { e.target.innerText = "Good Dog!"}
    })
  })
  dogInfo.append(img, h2, button)
}

dogFilter.addEventListener('click', (e) => {
  dogBar.innerText = ""
  e.target.innerText
  if (dogFilter.innerText == "Filter good dogs: OFF"){
    e.target.innerText = "Filter good dogs: ON"
    fetch(BASE_URL)
      .then(res => res.json())
      .then(obj => {
        obj.forEach(dog => {
          if (dog.isGoodDog)
          renderDogBar(dog)
        })
      })
    } else { e.target.innerText = "Filter good dogs: OFF"
    fetch(BASE_URL)
      .then(res => res.json())
      .then(obj => {
        obj.forEach(dog => {
          renderDogBar(dog)
        })
      })
    }
  })


})
