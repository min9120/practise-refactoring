//7.7 위임 숨기기

manager = aPerson.department.manager

//refactored
manager = aPerson.manager

Class Person{
    get manager(){return this._department.manager}
}

//=================================================================//

//사람과 사람이 속한 부서에 대한 클래스들이다.
class Person{
    constructor(name){
        this._name = name;
    }
    get name(){return this._name}
    get department(){return this._department}
    set department(arg){this._department =arg}
} 

class Department{
    get chargeCode(){return this._chargeCode}
    set chargeCode(arg){this._chargeCode = arg}
    get manager(){return this._manager}
    set manager(arg){this._manager = arg}
}

manager = aPerson.department.manager //클라이언트가 manager에 대한 정보는 가져오려면 department 객체부터 가져와야함 

class Person{
    get manager(){return this._department.manager}

} 
