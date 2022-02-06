//7.4 임시 변수를 질의 함수로 바꾸기

const basePrice = this._quantity * this._itemPrice;
if (basePrice > 1000) return basePrice * 0.95;
else return basePrice * 0.98;

//refactored
// get basePrice(){this._quantity * this._itemPrice}
// if(this.basePrice > 1000) return this.basePrice *0.95
// else return this.basePrice *0.98

//=================================================================//

class Order {
  constructor(quantity, item) {
    this._quantity = quantity;
    this._item = item;
  }
  get price() {
    let basePrice = this._quantity * this._itemPrice;
    let discountFactor = 0.98;

    if (basePrice > 1000) discountFactor -= 0.03;
    return basePrice * discountFactor;
  }
}
//임시 변수인 basePrice 와 discountFactor를 메서드로 바꿔보자
class Order {
  constructor(quantity, item) {
    this._quantity = quantity;
    this._item = item;
  }
  get basePrice() {
    return this._quantity * this._itemPrice;
  }
  get discountFactor() {
    let discountFactor = 0.98;

    if (this.basePrice > 1000) discountFactor -= 0.03;
    return discountFactor;
  }
  get price() {
    //const basePrice = this.basePrice //읽기 전용으로 바꿈 -> 우변을 getter로 추출 -> 변수 인라인  discountFactor도 똑같이

    return this.basePrice * this.discountFactor;
  }
}
