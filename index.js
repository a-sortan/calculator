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
