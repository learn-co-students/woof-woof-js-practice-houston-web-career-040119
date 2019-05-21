document.addEventListener("DOMContentLoaded", () => {

    const baseURL = "http://localhost:3000/pups"
    const dogBar = document.querySelector("#dog-bar")
    const dogInfo = document.querySelector('#dog-info')

    const dogFilter = document.querySelector("#good-dog-filter")

    fetch(baseURL)
        .then(res => res.json())
        .then(obj => {
            obj.forEach(dog => {
                renderDogBar(dog)
            })
        })

    function renderDogBar(dog) {
        let span = document.createElement('span')
       // span.id = dog.id
        span.innerText = dog.name
        span.addEventListener("click", (e) => {

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
        let button = document.createElement("button")
        // button.id = dog.id
        if (dog.isGoodDog) {
            button.innerText = "Good Dog!"
        } else {
            button.innerText = "Bad Dog!"
        }
        button.addEventListener("click", (e) => {
            e.preventDefault()

            fetch(baseURL + `/${dog.id}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "isGoodDog": !dog.isGoodDog
                    })
                }) //end fetch
                .then(res => res.json())
                .then(dogObj => {
                    dog.isGoodDog = !dog.isGoodDog
                    if (dogObj.isGoodDog == false) {
                        e.target.innerText = "Bad Dog!"
                        // dog.isGoodDog = false 
                    } else {
                        e.target.innerText = "Good Dog!"
                        // dog.isGoodDog = true
                    }

                })

        }) //end event listener
        dogInfo.append(img, h2, button)


    }

    dogFilter.addEventListener('click', (e) => {
        dogBar.innerText = ""
        e.target.innerText
        if (dogFilter.innerText == "Filter good dogs: OFF") {
            e.target.innerText = "Filter good dogs: ON"
            fetch(baseURL)
                .then(res => res.json())
                .then(obj => {
                    obj.forEach(dog => {
                        if (dog.isGoodDog) {
                            renderDogBar(dog)
                        }

                    })
                })
        } else {
            e.target.innerText = "Filter good dogs: OFF"
            fetch(baseURL)
                .then(res => res.json())
                .then(obj => {
                    obj.forEach(dog => {
                        renderDogBar(dog)
                    })
                })

        }



    })


})