class Dog {
  constructor(id,name,image,isGoodDog) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.isGoodDog = isGoodDog;
  }

  // helper function to render a dog
  render(divDogInfo) {
    if (divDogInfo.children.length == 0) {
      divDogInfo.appendChild(document.createElement("img"));
      divDogInfo.appendChild(document.createElement("h2"));
      divDogInfo.appendChild(document.createElement("button"));
    }

    let img = divDogInfo.querySelector("img");
    let h2 = divDogInfo.querySelector("h2");
    let button = divDogInfo.querySelector("button");
    img.src = this.image;
    h2.innerText = this.name;
    if(this.isGoodDog) {
      button.innerText = "Good Dog!"
    } else {
      button.innerText = "Bad Dog"
    }
  }

  // helper function to reverse "isGoodDog" property
  // updates both the dog and the database
  reverseIsGoodDog(URL) {
    this.isGoodDog = !this.isGoodDog
    fetch( `${URL}/${this.id}`, {
      method:"PATCH",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body: JSON.stringify( { isGoodDog: this.isGoodDog })
    })
  }
}

document.addEventListener("DOMContentLoaded", () => {

  const dogBar = document.querySelector("#dog-bar");
  const divDogInfo = document.querySelector("#dog-info");
  const pupsURL = "http://localhost:3000/pups";
  const dogs = [];
  const btnGoodDogFilter = document.querySelector("#good-dog-filter");
  let filterGoodDogs = false;


  // populate the dog bar on pageload
  fetch(pupsURL)
  .then( res => res.json() )
  .then( data => {
    data.forEach( dogData => {
      let dog = new Dog(dogData.id,dogData.name,dogData.image,dogData.isGoodDog);
      let span = document.createElement("span");
      span.innerText = dog.name;
      dogBar.append(span);
      dogs.push(dog);

      span.addEventListener( "click", function(e) {
        dog.render(divDogInfo);
      });
    });
  });

  // helper to find dog data by dog name
  function findDogByName(name) {
    for( let i = 0; i < dogs.length; i++) {
      let dog = dogs[i];
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
      let dog = findDogByName(child.innerText);
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

  divDogInfo.addEventListener("click",function(e) {
    if(e.target.tagName === "BUTTON") {
      let dog = findDogByName( e.target.parentElement.querySelector("h2").innerText );
      dog.reverseIsGoodDog(pupsURL);
      dog.render(divDogInfo);
      displayDogs();
    }
  });
});
