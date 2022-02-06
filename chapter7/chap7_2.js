//7.2 컬렉션 캡슐화하기

//수업 목록을 필드로 지니고 있는 Person 클래스
class Person {
  get courses() {
    return this._courses;
  }
  set courses(aList) {
    this._courses = aList;
  }
}

class Refactored_Person {
  get courses() {
    return this._courses.slice();
  }
  addCourse(aCourse) {}
  removeCourse(aCourse) {}
}

// ==============================================================//
class Person {
  constructor(name) {
    this._name = name;
    this._courses = [];
  }
  get name() {
    return this._name;
  }
  get courses() {
    return this._courses;
  }
  //setter를 이용해 수업 컬렉션을 통째로 설정한 클라이언트는 누구든 이 컬렉션을 마음대로 수정할 수 있다.
  set courses(aList) {
    this._courses = aList;
  }
}
class Course {
  constructor(name, isAdvanced) {
    this._name = name;
    this._isAdvanced = isAdvanced;
  }
  get name() {
    return this._name;
  }
  get isAdvanced() {
    return this._isAdvanced;
  }
}

numAdvancedCourses = aPerson.courses.filter((c) => c.isAdvanced).length;

//이런식으로 수업 컬렉션을 수정할 수 있음 -> 이런식으로 목록을 갱신하면 Person 클래스가 더는 컬렉션을 제어할 수 없으니 캡슐화가 깨진다.
const basicCourseNames = readBasicCourseNames(filename);
aPerson.courses = basicCourseNames.map((name) => new Course(name, false));

//제대로 캡슐화하기 위해 먼저 클라이언트가 수업을 하나씩 추가하고 제거하는 메서드를 Person에 추가해 보자.
class Person {
  constructor(name) {
    this._name = name;
    this._courses = [];
  }
  addCourse(aCourse) {
    this._courses.push(aCourse);
  }
  removeCourse(
    aCourse,
    fnIfAbsent = () => {
      throw new RangeError();
    }
  ) {
    const index = this._courses.indexOf(aCourse);
    if (index === -1) fnIfAbsent();
    else this._courses.splice(index, 1);
  } //클라이언트가 컬렉션에 없는 원소를 제거하려 할 때의 대응 방식을 정해야 한다.
  set courses(aList) {
    this._courses = aList.slice();
  } //만약 setter를 제공해야할 특별한 이유가 있다면 인수로 받은 컬렉션의 복제본을 필드에 저장하게 된다
  get courses() {
    return this._courses.splice();
  } //하지만 이렇게 아무도 목록을 변경할 수 없도록 다음과 같이 복제본을 제공하면 된다.
}

//사용 예시
for (const name of readBasicCourseNames(filename)) {
  aPerson.addCourse(new Course(name, false));
}
//이렇게 개별 원소를 추가하고 제거하는 메서드를 제공하기 때문에 setCourse()는 제거한다.
