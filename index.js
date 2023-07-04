// ELEMENTS
const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".buttons button");
const enterButton = document.querySelector(".enter-button");
const clearButton = document.querySelector(".clear-button");

// VARIABLES
let firstNum;
let secondNum;
let operator;
let displayValue = "";

// FUNCTIONS
// handle decimals better
const add = (x, y) => (x + y).toFixed(2);
const subtract = (x, y) => (x - y).toFixed(2);
const multiply = (x, y) => (x * y).toFixed(2);
const divide = (x, y) => (x / y).toFixed(2);

const setDisplay = (e) => {
  // show the content of the button on the display
  displayValue += e.target.innerText;
  showResult();
};

const showResult = () => {
  display.innerText = displayValue;
};

const calculate = () => {
  // convert division symbol to /
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
