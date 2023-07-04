// ELEMENTS
const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".buttons button");
const enterButton = document.querySelector(".enter-button");
const clearButton = document.querySelector(".clear-button");

// VARIABLES
let displayValue = "";

// FUNCTIONS
// handle decimals better
const isDecimal = (num) => {
  return num % 1 !== 0;
};

const add = (x, y) => {
  if (!isDecimal(x) && !isDecimal(y)) {
    return x + y;
  } else {
    return parseFloat(x + y);
  }
};

const subtract = (x, y) => {
  if (!isDecimal(x) && !isDecimal(y)) {
    return x - y;
  } else {
    return parseFloat(x - y);
  }
};

const multiply = (x, y) => {
  if (!isDecimal(x) && !isDecimal(y)) {
    return x * y;
  } else {
    return parseFloat(x * y);
  }
};

const divide = (x, y) => {
  if (!isDecimal(x) && !isDecimal(y)) {
    return x / y;
  } else {
    return parseFloat(x / y);
  }
};

const setDisplay = (e) => {
  displayValue += e.target.innerText;
  showResult();
};

const showResult = () => {
  display.innerText = displayValue;
};

const calculate = () => {
  // convert division symbol to /?
  const operators = ["+", "-", "x", "/"];
  const operatorIndex = displayValue
    .split("")
    .findIndex((char) => operators.includes(char));

  const firstNum = +displayValue.slice(0, operatorIndex);
  const secondNum = +displayValue.slice(operatorIndex + 1);
  const operator = displayValue[operatorIndex];

  switch (operator) {
    case "+":
      displayValue = add(firstNum, secondNum);
      break;
    case "-":
      displayValue = subtract(firstNum, secondNum);
      break;
    case "x":
      displayValue = multiply(firstNum, secondNum);
      break;
    case "/":
      displayValue = divide(firstNum, secondNum);
      break;
  }

  showResult();
};

const clear = () => {
  displayValue = "";
  display.innerText = "";
};

// EVENT LISTENERS
buttons.forEach((button) => {
  button.addEventListener("click", setDisplay);
});
enterButton.addEventListener("click", calculate);
clearButton.addEventListener("click", clear);
