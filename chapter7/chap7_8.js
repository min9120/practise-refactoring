//7.8 중개자 제거하기 

manager = aPerson.manager

class Person{
    get manager(){return this.department.manager}
}
//refactored
manager = aPerson.department.manager

class Person{
    get department(){return this._department}
}
