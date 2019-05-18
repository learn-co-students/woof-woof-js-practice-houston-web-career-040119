document.addEventListener("DOMContentLoaded", () => {

  const dogBar = document.querySelector("#dog-bar");
  const divDogInfo = document.querySelector("#dog-info");
  const pupsURL = "http://localhost:3000/pups";
  const dogData = [];
  const btnGoodDogFilter = document.querySelector("#good-dog-filter");
  let filterGoodDogs = false;


  // populate the dog bar on pageload
  fetch(pupsURL)
  .then( res => res.json() )
  .then( data => {
    data.forEach( dog => {
      let span = document.createElement("span");
      span.innerText = dog.name;
      dogBar.append(span);
      dogData.push(dog);

      span.addEventListener( "click", function(e) {
        renderDog(findDogDataByName(e.target.innerText));
      });
    });
  });

  // helper function to reverse "isGoodDog" property
  // updates both the dog and the database
  function reverseIsGoodDog(dog) {
    fetch( `${pupsURL}/${dog.id}`, {
      method:"PATCH",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body: JSON.stringify( { isGoodDog: !dog.isGoodDog })
    }).then( res => res.json() )
    .then( function(data) {
      dog.isGoodDog = !dog.isGoodDog;
      renderDog(dog);
      displayDogs();
    });
  }

  // helper function to render a dog
  function renderDog(dog) {
    if (divDogInfo.children.length == 0) {
      divDogInfo.appendChild(document.createElement("img"));
      divDogInfo.appendChild(document.createElement("h2"));
      divDogInfo.appendChild(document.createElement("button"));
      divDogInfo.querySelector("button").addEventListener("click",function(e) {
        let dog = findDogDataByName( e.target.parentElement.querySelector("h2").innerText );
        reverseIsGoodDog(dog);
      });
    }

    let img = divDogInfo.querySelector("img");
    let h2 = divDogInfo.querySelector("h2");
    let button = divDogInfo.querySelector("button");
    img.src = dog.image;
    h2.innerText = dog.name;
    if(dog.isGoodDog) {
      button.innerText = "Good Dog!"
    } else {
      button.innerText = "Bad Dog"
    }
  }

  // helper to find dog data by dog name
  function findDogDataByName(name) {
    for( let i = 0; i < dogData.length; i++) {
      let dog = dogData[i];
      if(dog.name === name) {
        return dog;
      }
    }
    return false;
  }

  // helper function to display dogs in the dog bar
  function displayDogs() {
    for(let i = 0; i < dogBar.children.length; i++) {
      let child = dogBar.children[i];
      let dog = findDogDataByName(child.innerText);
      if((dog.isGoodDog===false) && filterGoodDogs) {
        child.style.display = "none";
      } else {
        child.style.display = "";
      }
    }
  }

  // event handler to filter good dogs
  btnGoodDogFilter.addEventListener( "click", function(e) {
    filterGoodDogs = !filterGoodDogs;
    displayDogs();
    if(filterGoodDogs) {
      e.target.innerText = "Filter good dogs: ON";
    } else {
      e.target.innerText = "Filter good dogs: OFF";
    }
  });  


});
