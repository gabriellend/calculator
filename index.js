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
const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

const showOnScreen = (e) => {
  // show the content of the button on the display
  displayValue += e.target.innerText;
  display.innerText = displayValue;
};

const calculate = (operator, firstNum, secondNum) => {
  switch (operator) {
    case "+":
      return add(firstNum, secondNum);
    case "-":
      return subtract(firstNum, secondNum);
    case "*":
      return multiply(firstNum, secondNum);
    case "/":
      return divide(firstNum, secondNum);
  }
};

const clear = () => {};

// EVENT LISTENERS
buttons.forEach((button) => {
  button.addEventListener("click", showOnScreen);
});
enterButton.addEventListener("click", calculate);
clearButton.addEventListener("click", clear);
