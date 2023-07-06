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
  /^(?!.*\.\.)(?!.*\.\d+\.)(?!.*\-[+x\/])-?(\.?\d*|\d*\.?\d*)[-+x\/]?-?(\.?\d*|\d*\.?\d*)$/;
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
  const incomingValue = e.target.innerText;
  currentValue = displayValue + e.target.innerText;

  if (displayValue === "") {
    if (e.target.innerText === "-") {
      displayValue += incomingValue;
    } else {
      clearDisplay();
      return;
    }
  } else if (displayValue !== "" && regex.test(currentValue)) {
    displayValue += incomingValue;
  } else {
    for (char of operators) {
      if (currentValue[currentValue.length - 1] === char) {
        clearDisplay();
        calculate();
        displayValue += incomingValue;
      }
    }
  }

  showResult();
};

const handleNumber = (e) => {
  displayValue += e.target.innerText;
  showResult();
};

const handleDecimal = (e) => {
  currentValue = displayValue + e.target.innerText;
  if (regex.test(currentValue)) {
    displayValue += e.target.innerText;
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
