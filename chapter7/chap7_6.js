//7.6 클래스 인라인하기
class Person {
  get officeAreaCode() {
    return this._telephoneNumber._officeAreaCode;
  }
  get officeNumber() {
    return this._telephoneNumber._officeNumber;
  }
}
class TelephoneNumber {
  get areaCode() {
    return this._areaCode;
  }
  get number() {
    return this._number;
  }
}
//refactored
class Person {
  get officeAreaCode() {
    return this._officeAreaCode;
  }
  get officeNumber() {
    return this._officeNumber;
  }
}

//=================================================================//

//배송 추적 정보를 표현하는 클래스를 준비했다.
class TrackingInformation {
  get shippingCompany() {
    return this._shippingCompany;
  } //배송 회사
  set shippingCompany(arg) {
    this._shippingCompany = arg;
  }
  get trackingNumber() {
    return this._trackingNumber;
  } //추적 번호
  set trackingNumber(arg) {
    this._trackingNumber = arg;
  }
  get display() {
    return `${this.shippingCompany}:${this.trackingNumber}`;
  }
}
class Shipment {
  constructor() {
    this._trackingInformation = new TrackingInformation();
  }
  get trackingInfo() {
    return this._trackingInformation.display;
  }
  get trackingInformation(){return this._trackingInformation}
  set trackingInformation(arg){this._trackingInformation = arg}
}

//TrackingInformation의 메서드를 호출하는 코드를 찾는다. 
aShipment.trackingInformation.shippingCompany = request.vendor
//이처럼 외부에서 직접 호출하는 TrackingInformation의 메서드들을 모조리 Shipment로 옮긴다. 
class Shipment{
  set shippingCompany(arg){this._trackingInformation.shippingCompany = arg}
}
aShipment.shippingCompany = request.vendor

//클라이언트에서 사용하는 TrackingInformation의 모든 요소를 이런 식으로 처리한다. 다 고쳤다면 display()메서드를 인라인한다. 
class Shipment{
  get trackingInfo() {
    return `${this.shippingCompany} : ${this.trackingNumber}`
  }
  get shippingCompany(){return this._shippingCompany}
  set shippingCompany(arg){this._shippingCompany = arg}
  get trackingNumber() {return this._trackingNumber;} 
  set trackingNumber(arg) {this._trackingNumber = arg; }

} //다 옮겼으면 TrackingInformation 클래스 삭제 