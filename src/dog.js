class Dog{
  constructor(id,name,isGoodDog,image){
    this._id = id
    this._name = name
    this.isGoodDog = isGoodDog
    this._image = image
  }

  get id(){
    return this._id
  }

  get name(){
    return this._name
  }

  get image(){
    return this._image
  }

}
