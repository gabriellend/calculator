// ELEMENTS
const display = document.querySelector(".display");
const operatorButtons = document.querySelectorAll(".operator");
const decimalButton = document.querySelector(".decimal");
const numberButtons = document.querySelectorAll(".number");
const buttons = [...operatorButtons, decimalButton, ...numberButtons];

const enterButton = document.querySelector(".enter");
const clearButton = document.querySelector(".clear");

// VARIABLES
const operators = ["+", "-", "x", "/"];
let displayValue = "";

// FUNCTIONS
const isDecimal = (num) => {
  return num % 1 !== 0;
};

const add = (x, y) => {
  if (!isDecimal(x) && !isDecimal(y)) {
    return x + y;
  } else {
    return parseFloat((x + y).toFixed(2));
  }
};

const subtract = (x, y) => {
  if (!isDecimal(x) && !isDecimal(y)) {
    return x - y;
  } else {
    return parseFloat((x - y).toFixed(2));
  }
};

const multiply = (x, y) => {
  if (!isDecimal(x) && !isDecimal(y)) {
    return x * y;
  } else {
    return parseFloat((x * y).toFixed(2));
  }
};

const divide = (x, y) => {
  if (!isDecimal(x) && !isDecimal(y)) {
    return x / y;
  } else {
    return parseFloat((x / y).toFixed(2));
  }
};

const findOperatorIndex = () => {
  const operatorIndex = displayValue
    .split("")
    .findIndex((char) => operators.includes(char));

  return operatorIndex;
};

const setDisplay = (e) => {
  const operatorIndex = findOperatorIndex();
  if (operatorIndex === -1 || !e.target.className.includes("operator")) {
    displayValue += e.target.innerText;
  }

  const displayValueParts = extractDisplayValueParts(operatorIndex);
  const { firstNum, secondNum, operator } = displayValueParts;
  if (
    firstNum &&
    operator &&
    secondNum &&
    e.target.className.includes("operator")
  ) {
    clearDisplay();
    calculate();
    displayValue += e.target.innerText;
  }

  showResult();
};

const showResult = () => {
  display.innerText = displayValue;
};

const extractDisplayValueParts = (operatorIndex) => {
  return {
    firstNum: displayValue.slice(0, operatorIndex),
    secondNum: displayValue.slice(operatorIndex + 1),
    operator: displayValue[operatorIndex],
  };
};

const handleOperator = (e) => {
  const regex = /^-?\.?\d+\.?\d*[+\-x\/]?-?\.?\d*\.?\d*$/;
  const incomingValue = e.target.innerText;
  currentValue = displayValue + e.target.innerText;

  if (displayValue === "" && e.target.innerText === "-") {
    displayValue += incomingValue;
  } else if (displayValue !== "" && regex.test(currentValue)) {
    displayValue += incomingValue;
  }

  showResult();
};

const handleNumber = (e) => {
  displayValue += e.target.innerText;
  showResult();
  };

const handleDecimal = (e) => {
  displayValue += e.target.innerText;
  showResult();
};

const calculate = () => {
  // convert division symbol to /?
  const operatorIndex = findOperatorIndex();
  const displayValueParts = extractDisplayValueParts(operatorIndex);
  const { firstNum, secondNum, operator } = displayValueParts;

  switch (operator) {
    case "+":
      displayValue = add(+firstNum, +secondNum).toString();
      break;
    case "-":
      displayValue = subtract(+firstNum, +secondNum).toString();
      break;
    case "x":
      displayValue = multiply(+firstNum, +secondNum).toString();
      break;
    case "/":
      displayValue = divide(+firstNum, +secondNum).toString();
      break;
  }

  showResult();
};

const reset = () => {
  clearDisplay();
  displayValue = "";
};

const clearDisplay = () => {
  display.innerText = 0;
};

// EVENT LISTENERS
// buttons.forEach((button) => {
//   button.addEventListener("click", setDisplay);
// });

operatorButtons.forEach((button) => {
  button.addEventListener("click", handleOperator);
});
numberButtons.forEach((button) => {
  button.addEventListener("click", handleNumber);
});
decimalButton.addEventListener("click", handleDecimal);
enterButton.addEventListener("click", calculate);
clearButton.addEventListener("click", reset);
