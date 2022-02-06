// 7.1 레코드 캡슐화하기

//###간단한 변수 캡슐화
//이 상수는 프로그램 곳곳에서 레코드 구조로 사용하는 js 객체로서, 다음과 같이 읽고 쓴다.
const organization = { name: "애크미 구스베리", country: "GB" };

let result = `<h1>${organization.name}</h1>`; //read
organization.name = newName; //write

//1. 상수 캡슐화 (변수 캡슐화하기)
//getter를 쉽게 찾을 수 있도록 의도적으로 이상한 이름을 붙였다. 임시로만 사용할 것이기 때문이다.
function getRawDataOfOrganization() {
  return organization;
}
let result = `<h1>${getRawDataOfOrganization().name}</h1>`; //read
getRawDataOfOrganization().name = newName; //write
//레코드를 캡슐화하는 목적은 변수 자체는 물론 그 내용을 조작하는 방식도 통제하기 위해서이다. -> 레코드를 클래스로 바구고, 새 클래스의 인스턴스를 반환하는 함수를 새로 만든다.

class Organization {
  constructor(data) {
    this._data = data;
  }
}
const organization = new Organization({
  name: "애크미 구스베리",
  country: "GB",
});
function getRawDataOfOrganization() {
  return organization._data;
}
function getOrganization() {
  return organization;
}

//객체로 만드는 작업을 끝냈으니 레코드를 사용하던 코드를 살펴 보자.
class Organization {
  constructor(data) {
    this._data = data;
  }
  //레코드를 갱신하는 코드는 모두 setter를 사용하도록 고친다. 그리고 읽는 코드는 모두 getter를 사용한다.
  set name(aString) {
    this._data.name = aString;
  }
  get name() {
    return this._data.name;
  }
}
getOrganization().name = newName; //write
let result = `<h1>${getOrganization().name}</h1>`; //read

//다 바꿨다면 이상한 이름의 임시함수를 제거한다.
//function getRawDataOfOrganization(){return organization._data}

//마지막으로 _data 필드들을 객체 안에 바로 펼쳐 놓으면 더 깔끔할 것 같다.
class Organization {
  constructor(data) {
    this._name = data.name;
    this._country = data.country;
  }
  get name() {
    return this._name;
  }
  set name(arg) {
    this._name = arg;
  }
  get country() {
    return this._country;
  }
  set country(arg) {
    this._country;
  }
}
//입력 데이터 레코드와의 연결을 끊어준다는 이점이 생긴다. 특히 이 레코드를 참조하여 캡슐화를 깰 우려가 있는 코드가 많을 때 좋다.
//데이터를 개별 필드로 펼치지 않았더라면 _data를 대입할 때 복제하는 식으로 처리했을 것이다.

//###중첩된 레코드 캡슐화하기
const data = {
  1920: {
    name: "마틴 파울러",
    id: "1920",
    usages: {
      2016: {
        1: 50,
        2: 55,
        "...": "...",
        12: 41,
      },
      2015: {
        1: 50,
        2: 55,
        "...": "...",
        12: 41,
      },
    },
  },
  38673: {
    name: "닐 포드",
    id: "38673",
    usages: {
      2016: {
        1: 50,
        2: 55,
        "...": "...",
        12: 41,
      },
      2015: {
        1: 50,
        2: 55,
        "...": "...",
        12: 41,
      },
    },
  },
};

data[customerID].usages[year][month] = amount; //write
//read
function compareUsage(customerID, lastYear, month) {
  const later = data[customerID].usages[lastYear][month];
  const earlier = data[customerID].usages[lastYear - 1][month];
  return { laterAmount: later, change: later - earlier };
}

//덩치 큰 데이터 구조를 다룰수록 쓰기 (write)부분에 집중한다. 캡슐화에서는 값을 수정하는 부분을 명확하게 드러내고 한 곳에 모아두는 일이 굉장히 중요하다.
//깊은 복사는 lodash 라이브러리가 제공하는 cloneDeep() 으로 처리한다.

class CustomerData {
  constructor(data) {
    this._data = data;
  }
  setUsage(customerID, year, month, amount) {
    this._data[customerID].usages[year][month] = amount;
  }
  usage(customerID, year, month) {
    return this._data[customerID].usages[year][month];
  }
  get rawData() {
    return _.cloneDeep(this._data);
  }
}

const customerData = new CustomerData(data);

function getCustomerData() {
  return customerData;
}
//read
//customerData의 모든 쓰임을 명시적인 API 로 제공한다는 것이다.
function compareUsage_FirstWay(customerID, lastYear, month) {
  const later = getCustomerData().usage(customerID, lastYear, month);
  const earlier = getCustomerData().usage(customerID, lastYear - 1, month);
  return { laterAmount: later, change: later - earlier };
}
//실제 데이터를 제공하는 경우 -> 모든 쓰기를 함수 안에서 처리한다 => 캡슐화의 핵심 원칙이 깨짐 ( 데이터를 직접 수정할 수 있게됨 )=> 내부 데이터를 복제해서 제공하면 해결 되긴 함
//복제 비용이 성능에 영향을 줄 수 있음, 클라이언트가 원본을 수정한다고 착각할 수 있음.
function compareUsage_SecondWay(customerID, lastYear, month) {
  const later = getCustomerData().rawData[customerID].usages[lastYear][month];
  const earlier =
    getCustomerData().rawData[customerID].usages[lastYear - 1][month];
  return { laterAmount: later, change: later - earlier };
}
