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
    this._trackingInfo = new TrackingInformation();
  }
  get trackingInfo() {
    return this._trackingInfo.display;
  }
}
