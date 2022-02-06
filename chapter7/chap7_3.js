//7.3 기본형을 객체로 바꾸기

orders.filter((o) => "high" === o.priority || "rush" === o.priority);

//refactored ( ++ 더 가다듬기  )
orders.filter((o) => o.priority.higherThan(new Priority("normal")));

// ==============================================================//

class Order {
  constructor(data) {
    this.priority = data.priority;
    //나머지 생략
  }
}
//다음과 같이 사용한다
const highPriortyCount = orders.filter(
  (o) => "high" === o.priority || "rush" === o.priority
).length;

//변수 캡슐화 진행
class Order {
  //...//
  get priority() {
    return this.priority;
  }
  set priority(aString) {
    this.priority = aString;
  }
}

//우선순위 속성을 표현하는 값 클래스 Priority를 만든다.
class Priority {
  constructor(value) {
    this._value = value;
  }
  toString() {
    return this._value;
  } //클라이언트 입장에서 보면 속성 자체를 받은게 아니라 해당 속성을 문자열로 표현한 값을 요청한게 되기 때문이다.
}
//Priority를 사용하도록 접근자들을 수정함.
class Order {
  //...//
  get priorityString() {
    return this.priority.toString();
  }
  set priority(aString) {
    this.priority = new Priority(aString);
  }
}
const highPriortyCount = orders.filter(
  (o) => "high" === o.priorityString || "rush" === o.priorityString
).length;
