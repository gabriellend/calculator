// ELEMENTS
const display = document.querySelector(".display");
const operatorButtons = document.querySelectorAll(".operator");
const decimalButton = document.querySelector(".decimal");
const numberButtons = document.querySelectorAll(".number");

const enterButton = document.querySelector(".enter");
const clearButton = document.querySelector(".clear");

// VARIABLES
const operators = ["+", "-", "x", "/"];
const regex =
  /^(?!.*\.\.)(?!.*\.\d+\.)(?!.*-[x\/+])(?!.*\.[-x\/+])(?!-{2})-?(\.?\d*|\d*\.?\d*)[-+x\/]?-?(\.?\d*|\d*\.?\d*)$/;
let currentValue = "";
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

const getOperatorIndex = () => {
  const operatorIndex = currentValue.split("").findIndex((char, i) => {
    // Skip the first index, it will either be "-", in which case we don't
    // want to include it, or a number.
    if (i !== 0) {
      return operators.includes(char);
    }
  });

  return operatorIndex;
};

const showResult = () => {
  display.innerText = displayValue;
};

const getDisplayValueParts = (operatorIndex) => {
  return {
    firstNum: displayValue.slice(0, operatorIndex),
    secondNum: displayValue.slice(operatorIndex + 1),
    operator: displayValue[operatorIndex],
  };
};

const handleOperator = (e) => {
  const incomingOperator = e.target.innerText;
  // currentValue tracks the potential displayValue while
  // we do some checks
  currentValue = displayValue + incomingOperator;

  // If displayValue is "", this is the first button pressed.
  // Only allow it to be "-", to handle negative numbers.
  if (displayValue === "") {
    if (incomingOperator === "-") {
      displayValue += incomingOperator;
    } else {
      clearDisplay();
      return;
    }
  } else if (displayValue !== "" && regex.test(currentValue)) {
    displayValue += incomingOperator;
  } else {
    // If we have an expression that can be evaluated i.e.
    // "2+1" and another operator is pressed, evaluate the
    // current expression and set up the next expression
    // with the result and incoming operator
    if (
      isNaN(currentValue[currentValue.length - 1]) &&
      !isNaN(currentValue[currentValue.length - 2])
    ) {
      clearDisplay();
      calculate();
      displayValue += incomingOperator;
    }
  }

  showResult();
};

const handleNumber = (e) => {
  const incomingNumber = e.target.innerText;
  displayValue += incomingNumber;
  showResult();
};

const handleDecimal = (e) => {
  const incomingDecimal = e.target.innerText;
  currentValue = displayValue + incomingDecimal;
  if (regex.test(currentValue)) {
    displayValue += incomingDecimal;
  }
  showResult();
};

const calculate = () => {
  // convert division symbol to /?
  const operatorIndex = getOperatorIndex();
  const displayValueParts = getDisplayValueParts(operatorIndex);
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
  currentValue = "";
};

const clearDisplay = () => {
  display.innerText = 0;
};

// EVENT LISTENERS
operatorButtons.forEach((button) => {
  button.addEventListener("click", handleOperator);
});
numberButtons.forEach((button) => {
  button.addEventListener("click", handleNumber);
});
decimalButton.addEventListener("click", handleDecimal);
enterButton.addEventListener("click", calculate);
clearButton.addEventListener("click", reset);
