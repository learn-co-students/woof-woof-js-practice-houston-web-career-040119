class AllDogs {
  constructor(){
    this.all = []
  }

  addDog(id,name,isGoodDog,image){
    let newDog = new Dog(id,name,isGoodDog,image)
    this.all.push(newDog)
  }

  goodDogs(){
    let all_dogs = this.all
    return all_dogs.filter( dog => dog.isGoodDog )
  }

}
