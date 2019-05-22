document.addEventListener("DOMContentLoaded", ()=>{
  const baseURL = "http://localhost:3000/pups"
  allpupData =[]
  const pupContainer = document.querySelector('#dog-bar')

  fetch(baseURL)
  .then((resp)=>resp.json())
  .then((pupJSONData)=>{
    allpupData = pupJSONData
    let div = document.querySelector('#dog-bar')
    //some function goes here
  allpupData.forEach(function(pup){
    renderPupBar(pup)
  })
    //
  })

  function renderPupBar(pup){
    let span = document.createElement('span')
    span.innerText = pup.name
    //let div = document.querySelector('#dog-bar')
    pupContainer.append(span)
    span.addEventListener('click',function(e){
      //some function to render individual dog
       let pupInfo = document.getElementById('dog-info')
      pupInfo.innerHTML = ''
      console.log(e.target)
      renderPup(pup)

    })



    }

    function renderPup(pup){
      let card = document.getElementById('dog-info')
      card.innerHTML = ""

      console.log(pup)
      let img =  document.createElement('img')
      img.src = pup.image

      let h2 = document.createElement('h2')
      h2.innerText = pup.name
      let btn = document.createElement('button')
      if (pup.isGoodDog == true){
        btn.innerText = "Good Dog"

      }
      else{
        btn.innerText = "Bad Dog"
      }

      console.log("we are also here")
      card.append(h2,img,btn)
      console.log(pup.isGoodDog)
      btn.addEventListener('click',function(e){
        console.log(pup.isGoodDog)
        //here goes code to change the status of the dog
        fetch(`${baseURL}/${pup.id}`,{
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({//whatever I want to change
            id: pup.id,
            name: pup.name,
            isGoodDog: !pup.isGoodDog,
            image: pup.img,
        })
      })
        .then((res)=>res.json())
        .then(obj => {
          pup = obj
          renderPup(pup)
        })



      console.log(card)




    })//listener
    // pupContainer.addEventListener('click',function(e){
    //   // debugger
    //   //put function here to display info about a puppy or something
    //   console.log(e.target.innerText)
    //
    // }
}
})//DOMContentLoaded
