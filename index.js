const RESET_VALUE = 'AC'
const DISPLAY_INITIAL_VALUE = 0;
const OPERATORS = ['+','-', '*','/', '='];
const MAX_DISPLAY_LENGTH = 10;
let firstNumber = null;
let secondNumber = null;
let operator = null;
let currentNumber = null;
let lastOperator = null;

const roundDecimal = function(input, digits) {
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
  return roundDecimal(a * b, 10);
}

const divide = function(a, b) {
  return roundDecimal(a / b, 10);
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
};

const resetCalculator = function(updateDispl) {
  firstNumber = null;
  secondNumber = null;
  currentNumber = null;
  operator = null;
  if(updateDispl) {
    updateDisplay(0);
    updateDisplayLast();
  }
};

const updateDisplay = function(value) {
  document.querySelector('.display').textContent = value;
};

const updateDisplayLast = function(firstNumber, secondNumber, operator, result) {
  if(firstNumber != null && secondNumber != null && operator != null && result != null) {
    document.querySelector('.display-last').textContent = `${firstNumber} ${operator} ${secondNumber} = ${result}`;
  } else {
    document.querySelector('.display-last').textContent = "";
  }
};

const isOperator = function(value) {
  return OPERATORS.includes(value);
};

const isNumber = function(value) {
  return !Number.isNaN(+value);
};

const isLastOperation = function(operator) {
  return operator === '=';
}

const canCalculateResult = function() {
  return firstNumber !== null && secondNumber !== null && operator !== null;
};

const handleOperator = function(typedValue) {
  if(firstNumber === null) {
    firstNumber = currentNumber;
  } else {
    secondNumber = currentNumber;
  }

  if(canCalculateResult()) {
    let result = operate(operator, firstNumber, secondNumber);
    if(result.toString().length > MAX_DISPLAY_LENGTH) {
      result = Infinity;
      updateDisplay(result);
      updateDisplayLast(firstNumber, secondNumber, operator, result);
      resetCalculator();
    } else {
      updateDisplay(result);
      updateDisplayLast(firstNumber, secondNumber, operator, result);
      firstNumber = result;
    }
  }

  currentNumber = null;
  lastOperator = typedValue;
  if(!isLastOperation(typedValue)) {
    operator = typedValue;
  }
}

const handleNumber = function(typedValue) { 
  let displayElem = document.querySelector('.display');
  let displayValue = currentNumber === null ? 0 : +displayElem.textContent;
  if(lastOperator === '=') {
    resetCalculator(true);
    lastOperator = null;
  }
  
  if(displayValue.toString().length >= MAX_DISPLAY_LENGTH) return;
  currentNumber = displayValue * 10 + +typedValue
  displayValue = currentNumber;
  updateDisplay(displayValue);
}

let controlElem = document.querySelector('.control');

controlElem.addEventListener('click', function(e) {
  let typedValue = e.target.getAttribute('value');

  if(e.target.tagName !== 'BUTTON') return;

  if(typedValue === RESET_VALUE) {
    resetCalculator(true);
    return;
  }

  if(isNumber(typedValue)) {
    handleNumber(typedValue);
    return;
  }

  if(isOperator(typedValue)) {
    handleOperator(typedValue);
    return;
  }
});


