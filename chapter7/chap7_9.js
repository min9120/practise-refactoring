//7.9 알고리즘 교체하기

function foundPerson(people) {
  for (let i = 0; i < people.length; i++) {
    if (people[i] === "Don") {
      return "Don";
    }
    if (people[i] === "John") {
      return "John";
    }
    if (people[i] === "Amma") {
      return "Amma";
    }
  }
  return "";
}
//refactored
function foundPerson(people) {
  const candinates = ["Don", "John", "Amma"];
  return people.find((p) => candinates.includes(p) || "");
}

//리팩터링하면 복잡한 대상을 단순한 단위로 나눌 수 있지만, 때로는 알고리즘 전체를 걷어내고 훨씬 간결한 알고리즘으로 바꿔야 할 때가 있다.
//문제를 더 확실히 이해하고 훨씬 쉽게 해결하는 방법을 발견했을 때 이렇게 한다. 내 코드와 똑같은 기능을 제공하는 라이브러리를 찾았을 때도 마찬가지다.

//이 작업에 착수하려면 반드시 메서드를 가능한 한 잘게 나눴는지 확인해야 한다. 알고리즘을 간소화하는 작업부터 해야 교체가 쉬워진다.
