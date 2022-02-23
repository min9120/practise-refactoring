function getTitalOutstandingAndSendBill() {
  const result = customer.invoices.reduce(
    (total, each) => each.amount + total,
    0
  );
  sendBill();
  return result;
}
//after
function totalOutstanding() {
  return customer.invoices.reduce((total, each) => each.amount + total, 0);
}
function sendBill() {
  emailGeteway.send(formatBill(customer));
}
// ==================================================================================================

//겉보기에 side effect 가 있는 함수와 없는 함수는 명확히 구분하는 것이 좋다 .이를 위한 한 가지 방법은 '질의 함수(읽기 함수)는 모두 부수효과가 없어야 한다'는 규칙을 따르는 것이다. 이를 명령-질의 분리라 한다. 값을 반환하면서도 부수효과도 있는 함수를 발견하면 상태를 변경하는 부분과 질의하는 부분을 분리하려 시도한다! (무조건)
