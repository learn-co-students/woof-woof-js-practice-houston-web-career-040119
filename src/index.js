const BASE_URL = "http://localhost:3000"
const DOGS_URL = `${BASE_URL}/pups`
const availableDogs = document.querySelector('#dog-bar')
//get all the dogs

    fetch(DOGS_URL)
    .then(res => res.json())
    .then((data) =>
    {
        data.forEach(dog => 
            { 
                renderDogs(dog)
            })
    })

//create form for a dog
function renderDogs(dog)
{
    let dogInfo = document.getElementById("dog-info")
    let allDogs = document.getElementById("dog-bar")
    let span = document.createElement('span')
    span.innerText = dog.name
    span.dataset.id = dog.id
    span.addEventListener("click", (e) => 
    {
        e.preventDefault()
        dogInfo.innerHTML = ''
        let id = e.target.dataset.id
        fetch(`http://localhost:3000/pups/${id}`)
        .then(res => res.json())
        .then(dog =>
        {
            let img = document.createElement('img')
            img.src = dog.image
            let h2 = document.createElement('h2')
            h2.innerText = dog.name
            let button = document.createElement('button')
            button.id = dog.id
                if (dog.isGoodDog === true)
                {
                    button.innerText = "Good Dog!"
                }
                else
                {
                    button.innerText = "Bad Dog!"
                }
            button.addEventListener('click', (event) => { 
                event.preventDefault()
                let changeGood = !dog.isGoodDog
                let id= event.target.id
                fetch(`http://localhost:3000/pups/${id}`, 
                {
                        method: "PATCH",
                        headers:
                    {
                        "Content-Type": "application/json", 
                        Accept: "application/json"
                    },
                    body: JSON.stringify(
                    {
                        "isGoodDog": changeGood
                    })
                })
                .then(res => res.json())
                .then(obj => 
                    {
                        dog.isGoodDog = obj.isGoodDog
                        if (dog.isGoodDog === true)
                        {
                            button.innerText = "Good Dog!"
                        }
                        else
                        {
                            button.innerText = "Bad Dog!"
                        }
                    })
            })
            dogInfo.append(img,h2,button)
        })
    })
    allDogs.append(span)
}

// function toggleFilter(dog)
// {
//     const filterBtn = document.querySelector("#good-dog-filter")
//     if (filterBtn.innerText.includes("OFF"))
//     {
//         filterBtn.innerText = "Filter good dogs: ON"
//         renderDogs(dogs)
//         console.log()
//     }
//     else
//     {
//         filterBtn.innerText = "Filter good dogs: ON"
//     }
// }

    

