let firstNumber;
let secondNumber;
let operator;

const roundedToFixed = function(input, digits){
  var rounder = Math.pow(10, digits);
  return +(Math.round(input * rounder) / rounder).toFixed(digits);
}

const add = function(a, b) {
  return a + b;
}

const subtract = function(a, b) {
  return a - b;
}

const multiply = function(a, b) {
  return roundedToFixed(a * b, 10);
}

const divide = function(a, b) {
  return roundedToFixed(a / b, 10);
}

const operate = function(operator, firstNumber, secondNumber) {
  switch(operator) {
    case '+':
      return add(firstNumber, secondNumber);
      break;
    case '-':
      return subtract(firstNumber, secondNumber);
      break;
    case '*':
      return multiply(firstNumber, secondNumber);
      break;
    case '/':
      return divide(firstNumber, secondNumber);
      break;
    default:
      return  `Oops! Operator ${operator} not defined`;
  }
}
