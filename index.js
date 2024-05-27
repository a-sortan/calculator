const RESET_VALUE = 'AC'
const DISPLAY_INITIAL_VALUE = 0;
let firstNumber = null;
let secondNumber = null;
let operator = null;
let currentNumber = null;

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

const resetCalculator = function() {
  firstNumber = null;
  secondNumber = null;
  currentNumber = null;
  operator = null;
}

let controlElem = document.querySelector('.control');

controlElem.addEventListener('click', function(e) {
  let typedValue = e.target.getAttribute('value');

  if(e.target.tagName !== 'BUTTON') return;

  if(typedValue === RESET_VALUE) {
    resetCalculator();
    updateDisplay(DISPLAY_INITIAL_VALUE);
    return;
  }

  let displayElem = document.querySelector('.display');
  let displayValue = currentNumber === null ? 0 : displayElem.textContent;

  if(displayValue.length === 10) {
    displayValue = Infinity;
    updateDisplay(displayValue);
    resetCalculator();
    return;
  }

  if(!Number.isNaN(+typedValue)) {
    displayValue = +displayValue;
    currentNumber = displayValue * 10 + +typedValue
    displayValue = currentNumber;
    updateDisplay(displayValue);
  }
});

function updateDisplay(value) {
  document.querySelector('.display').textContent = value;
}
