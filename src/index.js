const DOG_URL = "http://localhost:3000/pups"
let litter = new AllDogs

document.addEventListener("DOMContentLoaded", () => {
  fetchAllDogs()
  document.querySelector("#dog-bar").addEventListener('click',(e) =>{
    renderDog(e.target.innerText)
  })
  document.querySelector("#good-dog-filter").addEventListener("click", (e)=>{
    let toggle = e.target.innerText.split(" ").pop()
    if (toggle == "OFF") {
      populateDogBar(litter.goodDogs())
      e.target.innerText = "Filter good dogs: ON"
    }
    if (toggle == "ON") {
      populateDogBar(litter.all)
      e.target.innerText = "Filter good dogs: OFF"
    }
  })

})

//functions

function fetchAllDogs(){
  fetch(DOG_URL)
    .then((response) => {return response.json()})
    .then((data) => {
      data.forEach( dog => {
        litter.addDog(dog.id,dog.name,dog.isGoodDog,dog.image)
      })
      populateDogBar(litter.all)
    })
}

function populateDogBar(arrOfDogs){
  let dogBar = document.querySelector("#dog-bar")
  dogBar.innerHTML = ""
  arrOfDogs.forEach( (dog) => {
    let span = document.createElement('span')
    span.innerText = dog.name
    dogBar.append(span)
  })
}

function renderDog(name){
  let dogInfo = document.querySelector("#dog-info")
  dogInfo.innerHTML = ""
  let doggo = litter.all.find(dog => dog.name == name)
  let img = document.createElement('img')
  img.src = doggo.image
  let htag = document.createElement('h2')
  htag.innerText = doggo.name
  let button = document.createElement('button')
  button.innerText = doggo.isGoodDog ? "Good Dog!" : "Bad Dog"
  button.addEventListener('click', (e) => {
    let dogName = e.target.parentElement.children[1].innerText
    goodDogBadDog(dogName)
  })
  dogInfo.append(img,htag,button)
}

function goodDogBadDog(name){
  let dog = litter.all.find(dog => dog.name == name)
  editFetch(dog)
}

function editFetch(dog){
  fetch(`${DOG_URL}/${dog.id}`, {
    method:'PATCH',
    headers: {
      'Content-Type': 'application/json'
      },
    body: JSON.stringify({'isGoodDog' : `${!dog.isGoodDog}`})
  })
    .then((response) => {return response.json()})
    .then((data) => {
      let dog = litter.all.find(dog => dog.name == data.name)
      dog.isGoodDog = data.isGoodDog == "true" ? true : false
      renderDog(dog.name)
    })
}
