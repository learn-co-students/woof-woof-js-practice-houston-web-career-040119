document.addEventListener('DOMContentLoaded', () => {
    const dogsURL = 'http://localhost:3000/pups'
    const dogBar = document.querySelector('#dog-bar')
    const dogInfo = document.querySelector('#dog-info')
    let filterBtn = document.querySelector('#good-dog-filter')
    let allDogs = []
    let filteredDogs = []
    fetch(dogsURL)
        .then(response => response.json())
        .then(dogs => {
            allDogs = dogs
            dogs.forEach(dog => {
                renderDog(dog)
            })
        })

    function renderDog(dog) {
        let span = document.createElement('span')
        span.innerText = dog.name
        dogBar.append(span)
        span.addEventListener('click', (e) => {
            e.preventDefault()
            let dog = allDogs.filter(dog => dog.name === e.target.innerText)[0]
            renderTheDog(dog)
        })
    }

    function renderTheDog(dog) {
        let img = document.createElement('img')
        img.src = dog.image
        let h2 = document.createElement('h2')
        h2.innerText = dog.name
        let btn = document.createElement('button')
        btn.id = dog.id
        if (dog.isGoodDog == true) {
            btn.innerText = 'Bad Dog!'
        } else {
            btn.innerText = 'Good Dog!'
        }

        btn.addEventListener('click', (e) => {
            e.preventDefault()
            switch (dog.isGoodDog) {
                case true:
                    dog.isGoodDog = false
                    btn.innerText = 'Good Dog!'
                    break
                case false:
                    dog.isGoodDog = true
                    btn.innerText = 'Bad Dog!'
                    break
            }
        })
        dogInfo.innerHTML = ''
        dogInfo.append(img, h2, btn)
    }

    filterBtn.addEventListener('click', (e) => {
        e.preventDefault()
        switch (e.target.innerText) {
            case 'Filter good dogs: ON':
                dogBar.innerHTML = ''
                filteredDogs = allDogs
                e.target.innerText = 'Filter good dogs: OFF'
                filteredDogs.forEach(dog => renderDog(dog))
                break
            case 'Filter good dogs: OFF':
                dogBar.innerHTML = ''
                filteredDogs = allDogs.filter(dog => dog.isGoodDog == true)
                e.target.innerText = 'Filter good dogs: ON'
                filteredDogs.forEach(dog => renderDog(dog))
                break
        }
    })
})