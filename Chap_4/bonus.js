// 헷갈리는 function 개념정리
function add(num1, num2){
  return num1 + num2;
}

function divide(num1, num2){
  return num1 / num2;
}

function surprise(operator) {
  const result = operator(10, 2); // operator라는 인자를 실행
  // operator(4, 5) = add(4, 5) 
  // console.log(result);
}

surprise(divide); // add라는 함수의 레퍼런스가 operator 인자에 전달

// 헷갈리는 boolean 개념정리
// false: 0, -0, 빈문자열, null, undefined, NaN
// true: -1, [](빈배열 자체는 오브젝트이기 때문)
let num = 10;
// let num; - 변수를 선언하고 값을 할당하지 않으면 undefined가 할당
if(num){
  // console.log("true");
}
// num && console.log(num); -> 위의 if문과 동일

// 클래스 & 콜백함수
class Counter {
  constructor(){
    this.counter = 0;
    // counter라는 변수는 class를 이용해서 obj를 만드는 순간 0으로 초기화
  }

  // 증가하는 함수 선언
  increase(){ // function과 동일
    this.counter++;
    console.log(this.counter);
    if(this.counter % 5 === 0){
      console.log()
    }
  }
}

// new라는 키워드를 이용해서 class를 만들게 되면 constructor가 실행
const coolCounter = new Counter();
coolCounter.increase();
coolCounter.increase();
coolCounter.increase();